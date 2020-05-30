var React         = require('react'),
    PropTypes     = require('prop-types'),
    Component     = React.Component,
    Header        = require('../../Header/index.jsx'),

    CONSTANTS     = require('common-constants'),
    PAGE_TYPES    = CONSTANTS.PAGE_TYPES,
    INFO          = PAGE_TYPES.INFO,
    COMPONENTS    = CONSTANTS.COMPONENTS;

require('./PageInfo.css')

class PageInfo extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var me          = this,
            context     = me && me.context,
            setBackUrl  = context && context.setBackUrl,
            setPageType = context && context.setPageType,
            props       = me && me.props,
            appState    = props && props.state,
            backUrl     = appState && appState.backUrl || '/';

        if (typeof setBackUrl === 'function') {
            setBackUrl(backUrl);
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
                            : '',
            data         = appState && appState.content,
            headerData   = data && data.header,
            contentData  = data && data.content;

        return (
            <div className={`PageInfo page page--info ${navMenuClass}`}>
                <Header data={headerData} />
                {
                    contentData.map((comp, idx) => {
                        var type      = comp && comp.type,
                            data      = comp && comp.data,
                            Component = COMPONENTS[type];

                        if (Component) {
                            return <Component key={idx} data={data} />;
                        } else {
                            console.error(`No ${type} Component found`);
                        }
                    })
                }
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
