var React      = require('react'),
    PropTypes  = require('prop-types'),
    Component  = React.Component,
    Link       = require('react-router-dom').Link,
    Parallax   = require('parallax-js'),

    CONSTANTS  = require('common-constants'),
    PAGE_TYPES = CONSTANTS.PAGE_TYPES,
    SLIDE      = PAGE_TYPES.SLIDE,

    pInstance;

require('./PageSlide.css');

class PageSlide extends Component {
    constructor(props) {
        super(props);

        this.scene = React.createRef();
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
        // TODO: Remove? Maybe don't need and it messes up Slide Transition
        if (pInstance && pInstance.element) {
            // garbage collection
            pInstance.destroy();
        }
    }

    render() {
        var me                  = this,
            props               = me && me.props,
            state               = props && props.state,
            content             = state && state.content,
            title               = content && content.title,
            background          = content && content.background,
            overlayColor        = content && content.overlayColor,
            info                = content && content.info,
            infoColor           = info && info.color,
            primary             = infoColor && infoColor.primary,
            secondary           = infoColor && infoColor.secondary,
            infoTitle           = info && info.title,
            infoSub             = info && info.subtitle,
            infoUrl             = info && info.url,
            desc                = info && info.description,
            backgroundStyle     = {
                backgroundImage: `url(${background})`
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
            <div className="PageSlide page page--slide" ref={this.scene}>
                <div className="PageSlide__background" style={backgroundStyle} data-depth="0.1"></div>
                <div className="PageSlide__overlay" data-depth="0">
                    <div className="PageSlide__overlay--background" style={overlayStyle}>
                        <div className="PageSlide__overlay--contents">
                            <div className="PageSlide__name" style={primaryColorStyle}>{title}</div>
                            <div className="PageSlide__info">
                                <div className="PageSlide__title" style={primaryColorStyle}>{infoTitle}</div>
                                <div className="PageSlide__subtitle" style={secondaryColorStyle}>{infoSub}</div>
                                <Link className="Link__info--button" to={infoUrl}>
                                    <div className="Threedots">
                                        <div className="Threedots__dot" />
                                        <div className="Threedots__dot" />
                                        <div className="Threedots__dot" />
                                    </div>
                                </Link>
                                <div className="Link__info--text">
                                    See more
                                </div>
                                <div className="PageSlide__description" style={primaryColorStyle}>{desc}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } 
}

PageSlide.displayName = 'PageSlide';

PageSlide.contextTypes = {
    setPageType  : PropTypes.func,
    setSlideUrls : PropTypes.func
};

module.exports = PageSlide;
