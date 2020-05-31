var React         = require('react'),
    PropTypes     = require('prop-types'),
    Component     = React.Component,
    Tile          = require('../../Tile/index.jsx'),

    CONSTANTS     = require('common-constants'),
    PAGE_TYPES    = CONSTANTS.PAGE_TYPES,
    PROJECTS      = PAGE_TYPES.PROJECTS;

require('./PageProjects.css')

class PageProjects extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var me          = this,
            context     = me && me.context,
            setPageType = context && context.setPageType;

        if (typeof setPageType === 'function') {
            setPageType(PROJECTS);
        }
    }

    render() {
        var me       = this,
            props    = me && me.props,
            appState = props && props.state,
            content  = appState && appState.content,
            data     = content && content.data;

        return (
            <div className="PageProjects page page--contact">
                <div className="PageProjects__container">
                    {
                        data.map((project, idx) => {
                            var image    = project && project.image,
                                url      = project && project.url,
                                title    = project && project.title,
                                subtitle = project && project.subtitle;

                            return <Tile key={idx} image={image} url={url} title={title} subtitle={subtitle} />;
                        })
                    }
                </div>
            </div>
        )
    }
}

PageProjects.displayName = 'PageProjects';

PageProjects.contextTypes = {
    setPageType : PropTypes.func
}

module.exports = PageProjects;