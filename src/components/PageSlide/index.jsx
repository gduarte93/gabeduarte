var React            = require('react'),
    Component        = React.Component,
    data             = require('./mockData.json'),
    Link             = require('react-router-dom').Link,
    Parallax         = require('parallax-js'),
    pInstance;

require('./PageSlide.css');

class PageSlide extends Component {
    constructor(props) {
        super(props);

        this.scene = React.createRef();
    }

    componentDidMount() {
        pInstance = new Parallax(this.scene.current);
    }

    componentWillUnmount() {
        if (pInstance) {
            // garbage collection
            pInstance.destroy();
        }
    }

    render() {
        var title               = data && data.title,
            background          = data && data.background,
            overlayColor        = data && data.overlayColor,
            info                = data && data.info,
            infoColor           = info && info.color,
            primary             = infoColor && infoColor.primary,
            secondary           = infoColor && infoColor.secondary,
            infoTitle           = info && info.title,
            infoSub             = info && info.subtitle,
            desc                = info && info.description,
            backgroundStyle     = {
                backgroundImage: `url(${background})`
            },
            overlayStyle        = {
                backgroundColor: overlayColor
            },
            primaryColorStyle   = {
                color: primary
            },
            secondaryColorStyle = {
                color: secondary
            };

        return (
            <div className="PageSlide" ref={this.scene}>
                <div className="PageSlide__background" style={backgroundStyle} data-depth="0.1"></div>
                <div className="PageSlide__overlay" data-depth="0">
                    <div className="PageSlide__overlay--background" style={overlayStyle}>
                        <div className="PageSlide__overlay--contents">
                            <div className="PageSlide__name" style={primaryColorStyle}>{title}</div>
                            <div className="PageSlide__info">
                                <div className="PageSlide__title" style={primaryColorStyle}>{infoTitle}</div>
                                <div className="PageSlide__subtitle" style={secondaryColorStyle}>{infoSub}</div>
                                <Link className="Link__info--button" to="/info">
                                    <div className="Threedots">
                                        <div className="Threedots__dot" />
                                        <div className="Threedots__dot" />
                                        <div className="Threedots__dot" />
                                    </div>
                                </Link>
                                <div className="Link__info--text">
                                    See more
                                </div>
                                <div className="PageSlide__description" style={primaryColorStyle}>{desc}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } 
}

module.exports = PageSlide;
