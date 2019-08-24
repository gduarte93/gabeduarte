var React = require('react'),
    data  = require('./mockData.json');

require('./PageSlide.css');

function PageSlide() {
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
        <div className="PageSlide">
            <div className="PageSlide__background" style={backgroundStyle}></div>
            <div className="PageSlide__overlay">
                <div className="PageSlide__overlay--background" style={overlayStyle}>
                    <div className="PageSlide__overlay--contents">
                        <div className="PageSlide__name" style={primaryColorStyle}>{title}</div>
                        <div className="PageSlide__info">
                            <div className="PageSlide__title" style={primaryColorStyle}>{infoTitle}</div>
                            <div className="PageSlide__subtitle" style={secondaryColorStyle}>{infoSub}</div>
                            <div className="PageSlide__description" style={primaryColorStyle}>{desc}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

module.exports = PageSlide;
