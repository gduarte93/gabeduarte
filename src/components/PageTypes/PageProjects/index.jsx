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
        return (
            <div className="PageProjects page page--contact">
                <div className="PageProjects__container">
                    <Tile image="https://membershipdrive.com/wp-content/uploads/2014/06/placeholder.png" url="https://gduarte93.github.io/checkers/" title="Checkers" subtitle="Sep 10, 2019"></Tile>
                    <Tile image="" url="" title="Project2"></Tile>
                    <Tile image="" url="" title="Project3"></Tile>
                    <Tile image="https://membershipdrive.com/wp-content/uploads/2014/06/placeholder.png" url="" title="Project4"></Tile>
                    <Tile image="" url="" title="Project5"></Tile>
                    <Tile image="" url="" title="Project5"></Tile>
                    <Tile image="" url="" title=""></Tile>
                    <Tile image="" url="" title=""></Tile>
                    <Tile image="https://membershipdrive.com/wp-content/uploads/2014/06/placeholder.png" url="" title=""></Tile>
                    <Tile image="" url="" title=""></Tile>
                    <Tile image="" url="" title=""></Tile>
                    <Tile image="" url="" title=""></Tile>
                    <Tile image="" url="" title=""></Tile>
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