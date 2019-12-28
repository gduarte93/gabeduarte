var React                = require('react'),
    reactRouter          = require('react-router-dom'),
    Switch               = reactRouter.Switch,
    // Router               = reactRouter.BrowserRouter,
    Route                = reactRouter.Route,
    PageSlide            = require('../PageTypes/PageSlide/index.jsx'),
    PageInfo             = require('../PageTypes/PageInfo/index.jsx'),
    Error404             = require('../PageTypes/Error404/index.jsx'),
    ReactTransitionGroup = require('react-transition-group'),
    TransitionGroup      = ReactTransitionGroup.TransitionGroup,
    CSSTransition        = ReactTransitionGroup.CSSTransition;

require('./Routing.css');

function Routes(props) {
    var location = props && props.location;

    return (
        <Route
            render={() => {
                var pathname = location && location.pathname;

                return (
                    <TransitionGroup>
                        <CSSTransition
                            location={location}
                            key={pathname}
                            classNames="page"
                            timeout={{
                                enter: 500,
                                exit: 500,
                            }}
                        >
                            <Switch>
                                <Route exact path='/' component={PageSlide}/>
                                <Route path='/info' component={PageInfo}/>
                                <Route component={Error404}/>
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                );
            }}
        />
    );
}

module.exports = Routes;
