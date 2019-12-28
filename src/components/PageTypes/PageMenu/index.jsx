var React         = require('react'),
    PropTypes     = require('prop-types'),
    Component     = React.Component,

    CONSTANTS     = require('common-constants'),
    PAGE_TYPES    = CONSTANTS.PAGE_TYPES,
    MENU          = PAGE_TYPES.MENU;

require('./PageMenu.css')

class PageMenu extends Component {
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
            setPageType(MENU);
        }
    }

    render() {
        return (
            <div className='PageMenu page page--menu'>
                <div>Menu Page</div>
            </div>
        )
    }
}

PageMenu.displayName = 'PageMenu';

PageMenu.contextTypes = {
    setBackUrl  : PropTypes.func,
    setPageType : PropTypes.func
}

module.exports = PageMenu;
