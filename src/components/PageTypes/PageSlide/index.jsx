var React      = require('react'),
    PropTypes  = require('prop-types'),
    Component  = React.Component,
    Link       = require('react-router-dom').Link,
    Parallax   = require('parallax-js'),
    Helmet     = require('react-helmet').Helmet,

    CONSTANTS  = require('common-constants'),
    PAGE_TYPES = CONSTANTS.PAGE_TYPES,
    SLIDE      = PAGE_TYPES.SLIDE,

    pInstance,
    touchPositionY = 0;

require('./PageSlide.css');

function recordTouchStart(e) {
    var touches = e && e.touches || [],
        clientY = touches[0] && touches[0].clientY;

    if (clientY) {
        touchPositionY = clientY;
    } else {
        touchPositionY = 0;
    }
}

class PageSlide extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasHoveredInfo: false
        };

        this.scene = React.createRef();

        this.handleInfoClick       = this.handleInfoClick.bind(this);
        this.handleMouseOutInfo    = this.handleMouseOutInfo.bind(this);
        this.attachScrollListeners = this.attachScrollListeners.bind(this);
        this.detachScrollListeners = this.detachScrollListeners.bind(this);
        this.handleScroll          = this.handleScroll.bind(this);
    }

    componentDidMount() {
        var me           = this,
            props        = me && me.props,
            state        = props && props.state,
            content      = state && state.content,
            prev         = content && content.prev,
            next         = content && content.next,
            context      = me && me.context,
            setPageType  = context && context.setPageType,
            setSlideUrls = context && context.setSlideUrls;

        if (typeof setPageType === 'function') {
            setPageType(SLIDE);
        }

        if (typeof setSlideUrls === 'function') {
            setSlideUrls(prev, next);
        }

        me.attachScrollListeners();

        pInstance = new Parallax(me.scene.current);
    }

    componentWillUnmount() {
        var me = this;

        me.detachScrollListeners();

        // Commenting out for now since it is messing up slide transition animation prev/next, and may not need?
        
        /* garbage collection */
        // if (pInstance && pInstance.element) {
        //     pInstance.destroy();
        // }
    }

    attachScrollListeners() {
        var me = this;

        window.addEventListener('wheel', me.handleScroll, { passive: true });
        window.addEventListener('touchstart', recordTouchStart);
        window.addEventListener('touchmove', me.handleScroll);
    }

    detachScrollListeners() {
        var me = this;

        window.removeEventListener('wheel', me.handleScroll);
        window.addEventListener('touchstart', recordTouchStart);
        window.removeEventListener('touchmove', me.handleScroll);
    }

    /* On scroll up/down or swipe up/down navigate to next or prev slide */
    handleScroll(e) {
        var me                  = this,
            context             = me && me.context,
            handleSlideNavClick = context && context.handleSlideNavClick,
            eventType           = e && e.type,
            props               = me && me.props,
            state               = props && props.state,
            content             = state && state.content,
            deltaY,
            touches,
            clientY,
            direction,
            url;

        if (eventType === 'wheel') {
            deltaY = e && e.deltaY;
            direction = deltaY < -5 ? 'prev' : deltaY > 5 ? 'next' : undefined;
        } else if (eventType === 'touchmove') {
            touches = e && e.touches || [];
            clientY = touches[0] && touches[0].clientY;

            deltaY = clientY - touchPositionY;
            direction = deltaY < -50 ? 'next' : deltaY > 50 ? 'prev' : undefined;
        }

        url = direction && content && content[direction];

        if (typeof handleSlideNavClick === 'function' && url && direction) {
            handleSlideNavClick(url, direction);
        }
    }

    handleInfoClick(url, e) {
        e && e.preventDefault();

        var me                  = this,
            context             = me && me.context,
            resetSlideDirection = context && context.resetSlideDirection;
        
        if (resetSlideDirection && typeof resetSlideDirection === 'function') {
            resetSlideDirection(url);
        }
    }

    handleMouseOutInfo() {
        var me = this;

        me.setState({ hasHoveredInfo: true });
    }

    render() {
        var me                  = this,
            state               = me && me.state,
            hasHoveredInfo      = state && state.hasHoveredInfo,
            props               = me && me.props,
            location            = props && props.location,
            pathname            = location && location.pathname,
            appState            = props && props.state,
            isIndex             = pathname === '/',

            content             = appState && appState.content,
            title               = content && content.title,
            background          = content && content.background,
            backgroundColor     = content && content.backgroundColor,
            backgroundPosition  = content && content.backgroundPosition || 'center',
            overlayColor        = content && content.overlayColor,
            info                = content && content.info,

            infoColor           = info && info.color,
            primary             = infoColor && infoColor.primary,
            secondary           = infoColor && infoColor.secondary,
            infoTitle           = info && info.title,
            infoSub             = info && info.subtitle,
            infoLocation        = info && info.location,
            infoUrl             = info && info.url,
            desc                = info && info.description,

            direction           = appState && appState.direction,
            navSlideClass       = direction ? `page--${direction}` : '',

            backgroundStyle     = {
                backgroundImage    : `url(${background})`,
                backgroundPosition : backgroundPosition
            },
            overlayStyle        = {
                backgroundColor: overlayColor
            },
            primaryColorStyle   = {
                color: primary
            },
            secondaryColorStyle = {
                color: secondary
            };

        return (
            <React.Fragment>
                <Helmet>
                    <style>
                        {`
                            body {
                                background-color: ${backgroundColor};
                            }
                        `}
                    </style>
                </Helmet>
                <div className={`PageSlide page page--slide ${navSlideClass}`} ref={this.scene}>
                    <div className="PageSlide__background" style={backgroundStyle} data-depth="0.1"></div>
                    <div className="PageSlide__overlay" data-depth="0">
                        <div className="PageSlide__overlay--background" style={overlayStyle}>
                            <div className="PageSlide__overlay--contents">
                                <div className="PageSlide__name" style={primaryColorStyle}>{title}</div>
                                <div className="PageSlide__info">
                                    <div className="PageSlide__title" style={primaryColorStyle}>{infoTitle}</div>
                                    <div className="PageSlide__subtitle" style={secondaryColorStyle}>{infoSub}</div>
                                    {
                                        infoLocation ?
                                            <div className="PageSlide__location" style={primaryColorStyle}>
                                                <i className="fas fa-map-pin"></i>{infoLocation}
                                            </div>
                                            : null
                                    }
                                    <Link className={`Link__info--button ${isIndex && !hasHoveredInfo && 'Link__info--home'}`} to={infoUrl} aria-label='See More' onMouseOut={me.handleMouseOutInfo} onClick={me.handleInfoClick.bind(me, infoUrl)}>
                                        <div className="Threedots">
                                            <div className="Threedots__dot" />
                                            <div className="Threedots__dot" />
                                            <div className="Threedots__dot" />
                                        </div>
                                    </Link>
                                    <div className="Link__info--text">
                                        See more
                                    </div>
                                    <div className="PageSlide__description" style={primaryColorStyle} dangerouslySetInnerHTML={{__html: desc}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    } 
}

PageSlide.displayName = 'PageSlide';

PageSlide.contextTypes = {
    handleSlideNavClick : PropTypes.func,
    setPageType         : PropTypes.func,
    setSlideUrls        : PropTypes.func,
    resetSlideDirection : PropTypes.func
};

module.exports = PageSlide;
