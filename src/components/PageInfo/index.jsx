var React         = require('react'),
    PropTypes     = require('prop-types'),
    Component     = React.Component,
    Header        = require('../Header/index.jsx'),
    Showcase      = require('../Showcase/index.jsx'),
    List          = require('../List/index.jsx'),

    showcaseMock1 = require('../Showcase/mockData.json'),
    showcaseMock2 = require('../Showcase/mockData2.json'),

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
            setPageType = context && context.setPageType;

        if (typeof setPageType === 'function') {
            setPageType(INFO);
        }
    }

    componentWillUnmount() {
        var me          = this,
            context     = me && me.context,
            setPageType = context && context.setPageType;

        if (typeof setPageType === 'function') {
            setPageType();
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <Showcase imgPos="left" data={showcaseMock2} />
                <Showcase imgPos="right" data={showcaseMock1} />
                <List />
                {/* // TODO: Bulletedlist Component */}
            </React.Fragment>
        )
    }
}

PageInfo.displayName = 'PageInfo';

PageInfo.contextTypes = {
    setPageType: PropTypes.func
}

module.exports = PageInfo;
