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
            setPageType = context && context.setPageType;

        if (typeof setPageType === 'function') {
            setPageType(MENU);
        }
    }

    render() {
        return (
            <div className='PageMenu page page--menu'>
                <div className="Menu__triangle Menu__triangle--left" />
                <div className="Menu__triangle Menu__triangle--right" />

                <div className="Right__panel">
                    <ul>
                        <li>Contact</li>
                        <li>Projects</li>
                        <li>Other</li>
                    </ul>
                </div>
                <div className="Contact">
                    <div className="Contact__left">
                        <div className="Contact__picture">
                            <img src="https://media-exp1.licdn.com/dms/image/C4E03AQHzI-lGsnlaag/profile-displayphoto-shrink_200_200/0?e=1586390400&v=beta&t=aKPE5jBuBqutKDk5R3nvkPh0OAzEW408BNjGgbu4pow"></img>
                        </div>
                    </div>
                    <div className="Contact__right">
                        <div className="Contact__name">Gabriel Duarte</div>
                        <div className="Contact__linkedin Contact__link">
                            <a href="https://www.linkedin.com/in/gabeduarte" target="_blank"><i class="fab fa-linkedin"></i><span>linkedin.com/in/gabeduarte</span></a>
                        </div>
                        <div className="Contact__github Contact__link">
                            <a href="https://github.com/gduarte93" target="_blank"><i class="fab fa-github"></i><span>github.com/gduarte93</span></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

PageMenu.displayName = 'PageMenu';

PageMenu.contextTypes = {
    setPageType : PropTypes.func
}

module.exports = PageMenu;
