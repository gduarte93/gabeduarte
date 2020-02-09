var React         = require('react'),
    PropTypes     = require('prop-types'),
    Component     = React.Component,

    CONSTANTS     = require('common-constants'),
    PAGE_TYPES    = CONSTANTS.PAGE_TYPES,
    CONTACT       = PAGE_TYPES.CONTACT;

require('./PageContact.css')

class PageContact extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var me          = this,
            context     = me && me.context,
            setPageType = context && context.setPageType;

        if (typeof setPageType === 'function') {
            setPageType(CONTACT);
        }
    }

    render() {
        return (
            <div className="PageContact page page--contact">
                <div className="PageContact__container">
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSf46yybT7-TPYqbbh1yy__B2-pyIyqr1A_6vD791xX4QEQ14g/viewform?embedded=true" width="100%" height="1000px" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                </div>
            </div>
        )
    }
}

PageContact.displayName = 'PageContact';

PageContact.contextTypes = {
    setPageType : PropTypes.func
}

module.exports = PageContact;