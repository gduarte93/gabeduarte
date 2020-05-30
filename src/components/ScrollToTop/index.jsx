var React       = require('react'),
    Component   = React.Component,
    reactRouter = require('react-router-dom'),
    withRouter  = reactRouter.withRouter;

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return null;
    }
}

module.exports = withRouter(ScrollToTop);