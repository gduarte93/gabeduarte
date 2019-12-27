var React       = require('react'),
    Component   = React.Component,
    Routing     = require('../Routing/index.jsx'),
    reactRouter = require('react-router-dom'),
    Link        = reactRouter.Link,
    withRouter  = reactRouter.withRouter;

require('./Shell.css')

class Shell extends Component {
    constructor(props) {
        super(props);

        this.connectToServer = this.connectToServer.bind(this);
        this.goBack          = this.goBack.bind(this);
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

    render() {
        var me = this;

        return (
            <div id='shell'>
                <Link className="Link__menu--button" to="/menu">
                    <div className="Threelines">
                        <div className="Threelines__line" />
                        <div className="Threelines__line" />
                        <div className="Threelines__line" />
                    </div>
                </Link>
                <Link onClick={me.goBack}>TEST BACK</Link>
                {/* TODO: add class, arrow, css, and hide/show css logic for back button */}
                {/* <Link className="Link__menu--button" onClick={({ history }) => history.goBack()}>
                    <div className="Threelines">
                        <div className="Threelines__line" />
                        <div className="Threelines__line" />
                        <div className="Threelines__line" />
                    </div>
                </Link> */}
                <Routing />
            </div>
        );
    }
}

module.exports = withRouter(Shell);
