var React                = require('react'),
    reactRouter          = require('react-router-dom'),
    Switch               = reactRouter.Switch,
    Route                = reactRouter.Route,
    PageSlide            = require('../PageTypes/PageSlide/index.jsx'),
    PageInfo             = require('../PageTypes/PageInfo/index.jsx'),
    PageMenu             = require('../PageTypes/PageMenu/index.jsx'),
    PageContact          = require('../PageTypes/PageContact/index.jsx'),
    PageProjects         = require('../PageTypes/PageProjects/index.jsx'),
    Error404             = require('../PageTypes/Error404/index.jsx'),
    ReactTransitionGroup = require('react-transition-group'),
    TransitionGroup      = ReactTransitionGroup.TransitionGroup,
    CSSTransition        = ReactTransitionGroup.CSSTransition;

require('./Routing.css');

function Routes(props) {
    var location = props && props.location,
        state    = props && props.state;

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
                                exit: 500
                            }}
                        >
                            <Switch>
                                <Route exact path='/' render={(props) => <PageSlide {...props} state={state}/>}/>
                                <Route path='/info' render={(props) => <PageInfo {...props} state={state}/>}/>
                                <Route path='/menu' render={(props) => <PageMenu {...props} state={state}/>}/>
                                <Route path='/contact' render={(props) => <PageContact {...props} state={state}/>}/>
                                <Route path='/projects' render={(props) => <PageProjects {...props} state={state}/>}/>
                                <Route render={(props) => <Error404 {...props} state={state}/>}/>
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                );
            }}
        />
    );
}

Routes.displayName = 'Routes';

module.exports = Routes;
