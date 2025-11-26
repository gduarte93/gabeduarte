var React          = require('react'),
    PropTypes      = require('prop-types'),
    Component      = React.Component,
    Link           = require('react-router-dom').Link,
    slidesData     = require('../../../data/slide/slides.json'),
    Cloudinary     = require('cloudinary-react'),
    Image          = Cloudinary.Image,
    Transformation = Cloudinary.Transformation,

    CONSTANTS      = require('common-constants'),
    PAGE_TYPES     = CONSTANTS.PAGE_TYPES,
    MENU           = PAGE_TYPES.MENU;

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
                        {
                            slidesData.map((slide, idx) => {
                                var path      = slide && slide.path,
                                    title     = slide && slide.title,
                                    subtitle  = slide && slide.subtitle;

                                if (path === '/') {
                                    title = 'Home';
                                }
                                
                                return (
                                    <React.Fragment key={idx}>
                                        { subtitle && <li className="Menu__item--subtitle"><span>{subtitle}</span></li> }
                                        <li><Link to={path}>{title}</Link></li>
                                    </React.Fragment>
                                );
                            })
                        }
                        <li className="Menu__item--subtitle"><span>personal</span></li>
                        <li><Link to="/projects">Projects</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="Contact">
                    <div className="Contact__left">
                        <div className="Contact__picture">
                            <Image publicId="me2_qqm5u3" alt="Profile Picture - Gabriel Duarte">
                                <Transformation width="620" crop="limit" dpr="auto" fetchFormat="auto"/>
                            </Image>
                        </div>
                    </div>
                    <div className="Contact__right">
                        <div className="Contact__name">Gabriel Duarte</div>
                        <div className="Contact__linkedin Contact__link">
                            <a href="https://www.linkedin.com/in/gabeduarte" target="_blank"><i className="fab fa-linkedin"></i><span>linkedin.com/in/gabeduarte</span></a>
                        </div>
                        <div className="Contact__github Contact__link">
                            <a href="https://github.com/gduarte93" target="_blank"><i className="fab fa-github"></i><span>github.com/gduarte93</span></a>
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
