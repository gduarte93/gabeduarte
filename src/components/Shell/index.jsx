var React             = require('react'),
    PropTypes         = require('prop-types'),
    Component         = React.Component,
    Routing           = require('../Routing/index.jsx'),
    reactRouter       = require('react-router-dom'),
    Link              = reactRouter.Link,
    withRouter        = reactRouter.withRouter,
    Breadcrumbs       = require('../Breadcrumbs/index.jsx'),
    slidesData        = require('../../data/slide/slides.json'),
    Cloudinary        = require('cloudinary-react'),
    CloudinaryContext = Cloudinary.CloudinaryContext,
    ImageLightbox     = require('../ImageLightbox/index.jsx'),

    CONSTANTS         = require('common-constants'),
    PAGE_TYPES        = CONSTANTS.PAGE_TYPES,
    MENU              = PAGE_TYPES.MENU,
    INFO              = PAGE_TYPES.INFO,
    SLIDE             = PAGE_TYPES.SLIDE,

    SLIDE_NAV         = CONSTANTS.SLIDE_NAV,
    PREV              = SLIDE_NAV.PREV,
    NEXT              = SLIDE_NAV.NEXT,

    CLOUD_NAME        = CONSTANTS.CLOUDINARY_CLOUD_NAME;

require('./Shell.css');

class Shell extends Component {
    constructor(props) {
        super(props);

        var breadCrumbs = slidesData.map((slide, idx) => {
            var title = slide && slide.title,
                path  = slide && slide.path;

            return {
                id: idx,
                title,
                path,
                active: false
            }
        });

        this.state = {
            pageType      : '',
            menuUrl       : '',
            backUrl       : '',
            prevUrl       : '',
            nextUrl       : '',
            toMenu        : false,
            transitioning : false,
            direction     : undefined,
            breadCrumbs   : breadCrumbs,
            lightbox      : undefined
        };

        this.connectToServer     = this.connectToServer.bind(this);
        this.setBackUrl          = this.setBackUrl.bind(this);
        this.setSlideUrls        = this.setSlideUrls.bind(this);
        this.setPageType         = this.setPageType.bind(this);
        this.onRouteChange       = this.onRouteChange.bind(this);
        this.setTransitioning    = this.setTransitioning.bind(this);
        this.handleMenuClick     = this.handleMenuClick.bind(this);
        this.handleSlideNavClick = this.handleSlideNavClick.bind(this);
        this.redirect            = this.redirect.bind(this);
        this.handleBackClick     = this.handleBackClick.bind(this);
        this.resetSlideDirection = this.resetSlideDirection.bind(this);
        this.updateBreadCrumbs   = this.updateBreadCrumbs.bind(this);
        this.openLightbox        = this.openLightbox.bind(this);
        this.closeLightbox       = this.closeLightbox.bind(this);
    }

    connectToServer() {
        fetch('/');
    }

    componentDidMount() {
        this.connectToServer();

        var me       = this,
            hasIcons = document.querySelector('#icons'),
            script;

        me.updateBreadCrumbs();

        if (!hasIcons) {
            script = document.createElement('script');    
            script.src = 'https://kit.fontawesome.com/b7936aa9f4.js';
            script.async = true;
            script.id = 'icons';

            document.body.appendChild(script);
        }
    }

    setPageType(pageType) {
        var me = this;

        me.setState({ pageType });
    }

    setBackUrl(url, pageType) {
        var me = this;

        if (pageType === MENU) {
            me.setState({ menuUrl: url });    
        } else {
            me.setState({ backUrl: url });
        }
    }

    setSlideUrls(prev, next) {
        var me = this;

        me.setState({ prevUrl: prev, nextUrl: next });
    }

    getChildContext() {
        var me = this;

        return {
            setPageType         : me.setPageType,
            setBackUrl          : me.setBackUrl,
            setSlideUrls        : me.setSlideUrls,
            resetSlideDirection : me.resetSlideDirection,
            openLightbox        : me.openLightbox
        }
    }

    componentDidUpdate(prevProps) {
        var me           = this,
            props        = me && me.props,
            location     = props && props.location,
            prevLocation = prevProps && prevProps.location,
            locState     = location && location.state,
            direction    = locState && locState.direction;

        if (location !== prevLocation) {
            me.setState({ toMenu: false, direction: direction }, me.onRouteChange.bind(me, prevLocation));
        }
    }

    onRouteChange(prevLocation) {
        var me      = this,
            backUrl = prevLocation && prevLocation.pathname || '/';

        me.setTransitioning(true);
        me.setBackUrl(backUrl, MENU);
        me.updateBreadCrumbs();

        setTimeout(() => me.setTransitioning(false), 600);
    }

    setTransitioning(option) {
        var me = this;

        me.setState({transitioning: option});
    }

    handleMenuClick(menuLink, e) {
        e.preventDefault();

        var me            = this,
            state         = me && me.state,
            transitioning = state && state.transitioning,
            link          = {},
            toMenu;

        // prevent clicking menu while page is transitioning
        if (transitioning) {
            return;
        }

        if (menuLink === '/menu') {
            toMenu = true;
        } else {
            toMenu = false;
        }

        link = {
            pathname : menuLink,
            state    : {
                fromMenu: !toMenu
            }
        };

        me.setState({ toMenu, direction: undefined }, me.redirect.bind(me, link))
    }

    handleBackClick(url, e) {
        e.preventDefault();

        var me       = this,
            state    = me && me.state,
            pageType = state && state.pageType,
            isInfo   = pageType === INFO;

        isInfo && me.redirect(url);
    }

    handleSlideNavClick(url, direction, e) {
        e.preventDefault();

        var me            = this,
            state         = me && me.state,
            transitioning = state && state.transitioning,
            link          = {};

        // prevent clicking while page is transitioning
        if (transitioning) {
            return;
        }

        link = {
            pathname : url,
            state    : {
                direction
            }
        };

        me.setState({ direction }, direction && me.redirect.bind(me, link))
    }

    redirect(url) {
        var me = this;

        me.props.history.push(url);
    }

    resetSlideDirection(url) {
        var me = this;

        if (url) {
            me.setState({ direction: undefined }, me.redirect.bind(me, url));
        } else {
            me.setState({ direction: undefined });
        }
    }

    updateBreadCrumbs() {
        var me                = this,
            state             = me && me.state,
            breadCrumbs       = state && state.breadCrumbs,
            props             = me && me.props,
            location          = props && props.location,
            pathname          = location && location.pathname,
            parsedPath        = pathname.replace(/\//g, '');

        breadCrumbs.map(crumb => {
            var newCrumb        = crumb,
                path            = crumb && crumb.path,
                parsedCrumbPath = path.replace(/\//g, ''),
                id              = crumb && crumb.id;

            if (parsedCrumbPath === parsedPath) {
                newCrumb.active = true;

                me.setState({ currentSlide:  id });
            } else {
                newCrumb.active = false;
            }
            
            
            return newCrumb;
        });
    }

    openLightbox(data, idx) {
        var me = this;

        me.setState({ lightbox: { images: data, idx } });
    }

    closeLightbox(e) {
        var me = this;

        if (e.target === e.currentTarget) {
            me.setState({ lightbox: undefined });
        }
    }

    render() {
        var me                = this,
            props             = me && me.props,
            location          = props && props.location,
            state             = me && me.state,
            pageType          = state && state.pageType,
            isMenu            = pageType === MENU,
            isInfo            = pageType === INFO,
            isSlide           = pageType === SLIDE,
            isMenuButtonClass = isMenu ? 'Link__menu--isMenu' : '',
            showBack          = isInfo,
            backUrl           = state && state.backUrl,
            menuUrl           = state && state.menuUrl,
            prevUrl           = state && state.prevUrl,
            nextUrl           = state && state.nextUrl,
            toggleBack        = showBack && backUrl ? 'Link__button--show' : 'Link__button--hide',
            menuLink          = isMenu ? menuUrl || '/' : '/menu',
            breadCrumbs       = state && state.breadCrumbs,
            currentSlide      = state && state.currentSlide,
            lightbox          = state && state.lightbox,
            breadCrumbData    = {
                breadCrumbs,
                currentSlide
            };

        return (
            <CloudinaryContext cloudName={CLOUD_NAME}>
                <div id='shell' className={pageType}>
                    <Link className={`Link__menu--button ${isMenuButtonClass}`} to={menuLink} onClick={me.handleMenuClick.bind(me, menuLink)}>
                        {
                            isMenu ?
                                <div className="Menu__close"><span>+</span></div>
                                :
                                <div className="Threelines">
                                    <div className="Threelines__line" />
                                    <div className="Threelines__line" />
                                    <div className="Threelines__line" />
                                </div>
                        }
                    </Link>
                    {
                        !isMenu ?
                            <div className="Link__menu--text">
                                Menu
                            </div>
                            :
                            null
                    }
                    <Link className={`Link__button Link__button--back ${toggleBack}`} to={backUrl} onClick={me.handleBackClick.bind(me, backUrl)}>
                        <div className="Arrow Arrow--left">
                            <div className="Arrow__line" />
                        </div>
                    </Link>
                    {
                        isSlide ?
                            <React.Fragment>
                                <Breadcrumbs data={breadCrumbData} handleCrumbClick={me.handleSlideNavClick} />
                                <Link className={`Link__button Link__button--prev`} to={prevUrl} onClick={me.handleSlideNavClick.bind(me, prevUrl, PREV)}>
                                    <div className="Arrow Arrow--up">
                                        <div className="Arrow__line" />
                                    </div>
                                </Link>
                                <Link className={`Link__button Link__button--next`} to={nextUrl} onClick={me.handleSlideNavClick.bind(me, nextUrl, NEXT)}>
                                    <div className="Arrow Arrow--down">
                                        <div className="Arrow__line" />
                                    </div>
                                </Link>
                            </React.Fragment>
                            : null
                    }

                    { lightbox ? <ImageLightbox {...lightbox} closeLightbox={me.closeLightbox} /> : null }

                    <Routing location={location} state={state} />
                </div>
            </CloudinaryContext>
        );
    }
}

Shell.displayName = 'Shell';

Shell.childContextTypes = {
    setPageType         : PropTypes.func,
    setBackUrl          : PropTypes.func,
    setSlideUrls        : PropTypes.func,
    resetSlideDirection : PropTypes.func,
    openLightbox        : PropTypes.func
}

module.exports = withRouter(Shell);
