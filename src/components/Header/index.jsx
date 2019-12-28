var React = require('react'),
    data  = require('./mockData.json'),
    Link  = require('react-router-dom').Link;

require('./Header.css');

function Header() {
    var title               = data && data.title,
        subtitle            = data && data.subtitle,
        background          = data && data.background,
        backgroundColor     = data && data.backgroundColor,
        overlayColor        = data && data.overlayColor,
        info                = data && data.info,
        infoDesc            = info && info.description,
        infoColor           = info && info.color,
        primary             = infoColor && infoColor.primary,
        secondary           = infoColor && infoColor.secondary,
        tertiary            = infoColor && infoColor.tertiary,
        infoTitle           = info && info.title,
        infoStory           = info && info.story,
        col1                = infoStory.column1,
        col2                = infoStory.column2,
        blurbs              = data && data.blurbs,
        backgroundStyle     = {
            backgroundImage: `url(${background})`
        },
        backgroundColorStyle = {
            backgroundColor: backgroundColor
        },
        overlayStyle        = {
            backgroundColor: overlayColor
        },
        primaryColorStyle   = {
            color: primary
        },
        secondaryColorStyle = {
            color: secondary
        },
        tertiaryColorStyle  = {
            color: tertiary
        },
        gradientStyle = {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.0) 70%, ${backgroundColor} 100%)`
        },
        primaryColorBackground = {
            backgroundColor: primary
        };

    return (
        <div className="Header" style={backgroundColorStyle}>
            <div className="Header__background" style={backgroundStyle}>
                <div className="Header__background--gradient" style={gradientStyle}/>
            </div>
            <div className="Header__container">
                <div className="Header__info">
                    <div className="Header__info--container" style={overlayStyle}>
                        <div className="Header__info--top">
                            <div className="Header__title--container">
                                <div className="Header__title" style={primaryColorStyle}>{title}</div>
                                <div className="Header__subtitle" style={secondaryColorStyle}>{subtitle}</div>
                            </div>
                        </div>
                        <div className="Header__info--middle">
                            <div className="Header__description" style={tertiaryColorStyle}>{infoDesc}</div>
                        </div>
                        <div className="Header__info--bottom">
                            <div className="Header__story" style={primaryColorStyle}>
                                <div className="Header__story--title">{infoTitle}</div>
                                <div className="Header__story--container">
                                    <div className="Header__story--col1" dangerouslySetInnerHTML={{__html: col1}} />
                                    <div className="Header__story--col2" dangerouslySetInnerHTML={{__html: col2}} />
                                </div>
                            </div>
                            <div className="Header__blurbs">
                                {
                                    blurbs.map(item => {
                                        var title = item && item.title,
                                            desc  = item && item.description;

                                        return (
                                            <React.Fragment>
                                                <div className="Header__blurbs--title" style={primaryColorStyle}>{title}</div>
                                                <div className="Header__blurbs--description" style={primaryColorStyle}>{desc}</div>
                                                <div className="Header__blurbs--border" style={primaryColorBackground} />
                                            </React.Fragment>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>      
            </div>
        </div>
    )
}

module.exports = Header;
