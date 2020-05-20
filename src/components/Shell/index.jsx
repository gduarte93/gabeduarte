var React        = require('react'),
    PropTypes    = require('prop-types'),
    Component    = React.Component,
    Routing      = require('../Routing/index.jsx'),
    reactRouter  = require('react-router-dom'),
    Link         = reactRouter.Link,
    withRouter   = reactRouter.withRouter,

    CONSTANTS    = require('common-constants'),
    PAGE_TYPES   = CONSTANTS.PAGE_TYPES,
    MENU         = PAGE_TYPES.MENU,
    INFO         = PAGE_TYPES.INFO,
    SLIDE        = PAGE_TYPES.SLIDE,

    SLIDE_NAV    = CONSTANTS.SLIDE_NAV,
    PREV         = SLIDE_NAV.PREV,
    NEXT         = SLIDE_NAV.NEXT;

require('./Shell.css');

class Shell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageType      : '',
            menuUrl       : '',
            backUrl       : '',
            prevUrl       : '',
            nextUrl       : '',
            toMenu        : false,
            transitioning : false,
            direction     : undefined
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
    }

    connectToServer() {
        fetch('/');
    }

    componentDidMount() {
        this.connectToServer();

        var hasIcons = document.querySelector('#icons'),
            script;

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
            resetSlideDirection : me.resetSlideDirection
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

        // prevent clicking menu while page is transitioning
        if (transitioning) {
            return;
        }

        link = {
            pathname : url,
            state    : {
                direction
            }
        };

        me.setState({ direction }, me.redirect.bind(me, link))
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
            showSlideNav      = isSlide,
            backUrl           = state && state.backUrl,
            menuUrl           = state && state.menuUrl,
            prevUrl           = state && state.prevUrl,
            nextUrl           = state && state.nextUrl,
            toggleBack        = showBack && backUrl ? 'Link__button--show' : 'Link__button--hide',
            menuLink          = isMenu ? menuUrl || '/' : '/menu';

        return (
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
                    showSlideNav ?
                        <React.Fragment>
                            {/* TODO: handle slide nav clicks like menu (only if not transitioning) */}
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
                <Routing location={location} state={state} />
            </div>
        );
    }
}

Shell.displayName = 'Shell';

Shell.childContextTypes = {
    setPageType         : PropTypes.func,
    setBackUrl          : PropTypes.func,
    setSlideUrls        : PropTypes.func,
    resetSlideDirection : PropTypes.func
}

module.exports = withRouter(Shell);
