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
    CSSTransition        = ReactTransitionGroup.CSSTransition,
    routingData          = require('./routingData.json');

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
                                <Route exact path='/' render={(props) => <PageSlide {...props} state={Object.assign({}, state, { content: routingData[0] })}/>}/>
                                <Route path='/info' render={(props) => <PageInfo {...props} state={state}/>}/>

                                <Route exact path='/uf' render={(props) => <PageSlide {...props} state={Object.assign({}, state, { content: routingData[1] })}/>}/>
                                <Route path='/uf/info' render={(props) => <PageInfo {...props} state={state}/>}/>

                                <Route exact path='/pixelsupply' render={(props) => <PageSlide {...props} state={Object.assign({}, state, { content: routingData[2] })}/>}/>
                                <Route path='/pixelsupply/info' render={(props) => <PageInfo {...props} state={state}/>}/>
                                
                                <Route exact path='/espn' render={(props) => <PageSlide {...props} state={Object.assign({}, state, { content: routingData[3] })}/>}/>
                                <Route path='/espn/info' render={(props) => <PageInfo {...props} state={state}/>}/>

                                <Route exact path='/disney' render={(props) => <PageSlide {...props} state={Object.assign({}, state, { content: routingData[4] })}/>}/>
                                <Route path='/disney/info' render={(props) => <PageInfo {...props} state={state}/>}/>
                               
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
