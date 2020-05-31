var React      = require('react'),
    PropTypes  = require('prop-types'),
    Component  = React.Component,
    Link       = require('react-router-dom').Link,
    Parallax   = require('parallax-js'),
    Helmet     = require('react-helmet').Helmet,

    CONSTANTS  = require('common-constants'),
    PAGE_TYPES = CONSTANTS.PAGE_TYPES,
    SLIDE      = PAGE_TYPES.SLIDE,

    pInstance;

require('./PageSlide.css');

class PageSlide extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasHoveredInfo: false
        };

        this.scene = React.createRef();

        this.handleInfoClick    = this.handleInfoClick.bind(this);
        this.handleMouseOutInfo = this.handleMouseOutInfo.bind(this);
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
        pInstance = new Parallax(me.scene.current);
    }

    componentWillUnmount() {
        // Commenting out for now since it is messing up slide transition animation prev/next, and may not need?
        
        /* garbage collection */
        // if (pInstance && pInstance.element) {
        //     pInstance.destroy();
        // }
    }

    handleInfoClick(url, e) {
        e.preventDefault();

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
                                    <Link className={`Link__info--button ${isIndex && !hasHoveredInfo && 'Link__info--home'}`} to={infoUrl} onMouseOut={me.handleMouseOutInfo} onClick={me.handleInfoClick.bind(me, infoUrl)}>
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
    setPageType         : PropTypes.func,
    setSlideUrls        : PropTypes.func,
    resetSlideDirection : PropTypes.func
};

module.exports = PageSlide;
