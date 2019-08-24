var React     = require('react'),
    Component = React.Component,
    Routing   = require('../Routing/index.jsx');

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
            <div id="shell">
                <Routing />
            </div>
        );
    }
}

module.exports = Shell;
