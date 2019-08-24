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
                background: overlayColor
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
                                <Link to="/info">Test</Link>
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
