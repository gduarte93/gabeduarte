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

    slidesData           = require('../../data/slide/slides.json'),
    infoDataMap          = require('../../data/info/data.js'),
    projectData          = require('../../data/projects/projects.json');

require('./Routing.css');

function Routes(props) {
    var location = props && props.location,
        state    = props && props.state;

    return (
        <Route
            render={() => {
                var pathname    = location && location.pathname,
                    slideRoutes = slidesData.map((slide, idx) => {
                        var path = slide && slide.path;
    
                        return (
                            <Route key={idx} exact path={path} render={(props) => <PageSlide {...props} state={Object.assign({}, state, { content: slide })}/>}/>
                        )
                    }),
                    infoRoutes = slidesData.map((slide, idx) => {
                        var path     = slide && slide.path
                            info     = slide && slide.info,
                            infoPath = info && info.url,
                            id       = slide && slide.id,
                            infoData = infoDataMap[id];
    
                        return (
                            <Route key={idx} path={infoPath} render={(props) => <PageInfo {...props} state={Object.assign({}, state, { content: infoData, backUrl: path })}/>}/>
                        )
                    });

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
                                { slideRoutes }

                                {/* { infoRoutes } */}

                                {/* TODO: Figure out why infoRoutes map doesn't work (it always has infoData of last obj (disney)) */}
                                <Route path={'/info'} render={(props) => <PageInfo {...props} state={Object.assign({}, state, { content: infoDataMap['index'], backUrl: '/' })}/>}/>
                                <Route path={'/uf/info'} render={(props) => <PageInfo {...props} state={Object.assign({}, state, { content: infoDataMap['uf'], backUrl: '/uf' })}/>}/>
                                <Route path={'/pixelsupply/info'} render={(props) => <PageInfo {...props} state={Object.assign({}, state, { content: infoDataMap['pixelsupply'], backUrl: '/pixelsupply' })}/>}/>
                                <Route path={'/espn/info'} render={(props) => <PageInfo {...props} state={Object.assign({}, state, { content: infoDataMap['espn'], backUrl: '/espn' })}/>}/>
                                <Route path={'/disney/info'} render={(props) => <PageInfo {...props} state={Object.assign({}, state, { content: infoDataMap['disney'], backUrl: '/disney' })}/>}/>
                               
                                <Route path='/menu' render={(props) => <PageMenu {...props} state={state}/>}/>
                               
                                <Route path='/contact' render={(props) => <PageContact {...props} state={state}/>}/>
                               
                                <Route path='/projects' render={(props) => <PageProjects {...props} state={Object.assign({}, state, { content: projectData })}/>}/>
                               
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
