var React        = require('react'),
    PropTypes    = require('prop-types'),
    Component    = React.Component,
    Routing      = require('../Routing/index.jsx'),
    reactRouter  = require('react-router-dom'),
    Link         = reactRouter.Link,
    withRouter   = reactRouter.withRouter,

    CONSTANTS    = require('common-constants'),
    PAGE_TYPES   = CONSTANTS.PAGE_TYPES,
    SLIDE        = PAGE_TYPES.SLIDE;

require('./Shell.css')

class Shell extends Component {
    constructor(props) {
        super(props);

        this.connectToServer = this.connectToServer.bind(this);
        this.goBack          = this.goBack.bind(this);
        this.setPageType     = this.setPageType.bind(this);
    }

    connectToServer() {
        fetch('/');
    }

    componentDidMount() {
        this.connectToServer();
    }

    goBack() {
        var me      = this,
            props   = me && me.props,
            history = props && props.history,
            _goBack = history && history.goBack;

        if (typeof _goBack === 'function') {
            _goBack();
        }
    }

    setPageType(pageType) {
        var me = this;

        me.setState({ pageType });
    }

    getChildContext() {
        var me = this;

        return {
            setPageType: me.setPageType
        }
    }

    render() {
        var me       = this,
            state    = me && me.state,
            pageType = state && state.pageType,
            isSlide  = pageType === SLIDE,
            showBack = !isSlide;

        return (
            <div id='shell'>
                <Link className="Link__menu--button" to="/menu">
                    <div className="Threelines">
                        <div className="Threelines__line" />
                        <div className="Threelines__line" />
                        <div className="Threelines__line" />
                    </div>
                </Link>
                {
                    showBack ?
                        <Link className='Link__back--button' onClick={me.goBack}>
                            <div className="Arrow--left">
                                <div className="Arrow__line" />
                            </div>
                        </Link>
                        :
                        null
                }
                <Routing />
            </div>
        );
    }
}

Shell.displayName = 'Shell';

Shell.childContextTypes = {
    setPageType: PropTypes.func
}

module.exports = withRouter(Shell);
