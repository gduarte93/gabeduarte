var React         = require('react'),
    PropTypes     = require('prop-types'),
    Component     = React.Component,
    Header        = require('../../Header/index.jsx'),
    Showcase      = require('../../Showcase/index.jsx'),
    List          = require('../../List/index.jsx'),

    showcaseMock1 = require('../../Showcase/mockData.json'),
    showcaseMock2 = require('../../Showcase/mockData2.json'),

    CONSTANTS     = require('common-constants'),
    PAGE_TYPES    = CONSTANTS.PAGE_TYPES,
    INFO          = PAGE_TYPES.INFO;

require('./PageInfo.css')

class PageInfo extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var me          = this,
            context     = me && me.context,
            setBackUrl  = context && context.setBackUrl,
            setPageType = context && context.setPageType;

        if (typeof setBackUrl === 'function') {
            setBackUrl('/');
        }

        if (typeof setPageType === 'function') {
            setPageType(INFO);
        }
    }

    render() {
        var me           = this,
            props        = me && me.props,
            appState     = props && props.state,
            toMenu       = appState && appState.toMenu,
            location     = props && props.location,
            locState     = location && location.state,
            fromMenu     = locState && locState.fromMenu,
            navMenuClass = toMenu ? 'page--toMenu' 
                            : fromMenu ? 'page--fromMenu' 
                            : '';

        return (
            <div className={`PageInfo page page--info ${navMenuClass}`}>
                <Header />
                <Showcase imgPos="left" data={showcaseMock2} />
                <Showcase imgPos="right" data={showcaseMock1} />
                <List />
                {/* // TODO: Bulletedlist Component */}
            </div>
        )
    }
}

PageInfo.displayName = 'PageInfo';

PageInfo.contextTypes = {
    setBackUrl  : PropTypes.func,
    setPageType : PropTypes.func
}

module.exports = PageInfo;
