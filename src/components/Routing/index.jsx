var React       = require('react'),
    reactRouter = require('react-router-dom'),
    Switch      = reactRouter.Switch,
    Route       = reactRouter.Route,
    PageSlide   = require('../PageSlide/index.jsx'),
    PageInfo    = require('../PageInfo/index.jsx');

function Routes() {
    return (
        <Switch>
            <Route exact path='/' component={PageSlide}/>
            <Route path='/info' component={PageInfo}/>
        </Switch>
    );
}

module.exports = Routes;
