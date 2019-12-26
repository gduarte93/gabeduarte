var React     = require('react'),
    Component = React.Component,
    Routing   = require('../Routing/index.jsx'),
    Link      = require('react-router-dom').Link;

require('./Shell.css')

class Shell extends Component {
    constructor(props) {
        super(props);

        this.connectToServer = this.connectToServer.bind(this);
    }

    connectToServer() {
        fetch('/');
    }

    componentDidMount() {
        this.connectToServer();
    }

    render() {
        return (
            <div id='shell'>
                <Link className="Link__menu--button" to="/menu">
                    <div className="Threelines">
                        <div className="Threelines__line" />
                        <div className="Threelines__line" />
                        <div className="Threelines__line" />
                    </div>
                </Link>
                <Routing />
            </div>
        );
    }
}

module.exports = Shell;
