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
    INFO         = PAGE_TYPES.INFO;

require('./Shell.css');

class Shell extends Component {
    constructor(props) {
        super(props);

        this.connectToServer  = this.connectToServer.bind(this);
        this.setBackUrl       = this.setBackUrl.bind(this);
        this.setPageType      = this.setPageType.bind(this);
        this.onRouteChange    = this.onRouteChange.bind(this);
        this.setTransitioning = this.setTransitioning.bind(this);
        this.handleMenuClick  = this.handleMenuClick.bind(this);
        this.redirect         = this.redirect.bind(this);
        this.handleBackClick  = this.handleBackClick.bind(this);
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

    getChildContext() {
        var me = this;

        return {
            setPageType   : me.setPageType,
            setBackUrl    : me.setBackUrl
        }
    }

    componentDidUpdate(prevProps) {
        var me           = this,
            props        = me && me.props,
            location     = props && props.location,
            prevLocation = prevProps && prevProps.location;

        if (location !== prevLocation) {
            me.setState({toMenu: false});
            me.onRouteChange(prevLocation);
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

        me.setState({toMenu}, me.redirect.bind(me, link))
    }

    handleBackClick(url, e) {
        e.preventDefault();

        var me       = this,
            state    = me && me.state,
            pageType = state && state.pageType,
            isInfo   = pageType === INFO;

        isInfo && me.redirect(url);
    }

    redirect(url) {
        var me = this;

        me.props.history.push(url);
    }

    render() {
        var me                = this,
            props             = me && me.props,
            location          = props && props.location,
            state             = me && me.state,
            pageType          = state && state.pageType,
            isMenu            = pageType === MENU,
            isInfo            = pageType === INFO,
            isMenuButtonClass = isMenu ? 'Link__menu--isMenu' : '',
            showBack          = isInfo,
            backUrl           = state && state.backUrl,
            menuUrl           = state && state.menuUrl,
            toggleBack        = showBack && backUrl ? 'Link__back--show' : 'Link__back--hide',
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
                <Link className={`Link__back--button ${toggleBack}`} to={backUrl} onClick={me.handleBackClick.bind(me, backUrl)}>
                    <div className="Arrow--left">
                        <div className="Arrow__line" />
                    </div>
                </Link>
                <Routing location={location} state={state} />
            </div>
        );
    }
}

Shell.displayName = 'Shell';

Shell.childContextTypes = {
    setPageType   : PropTypes.func,
    setBackUrl    : PropTypes.func
}

module.exports = withRouter(Shell);
