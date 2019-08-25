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
        }

    return (
        <div className="Header" style={backgroundColorStyle}>
            <div className="Header__background" style={backgroundStyle}/>
            <div className="Header__container">
                <div>
                    <div>Nav</div>
                    <Link to="/">Home</Link>
                </div>
                <div className="Header__info">
                    <div className="Header__info--container" style={overlayStyle}>
                        <div className="Header__info--top">
                            <div className="Header__title" style={primaryColorStyle}>{title}</div>
                            <div className="Header__subtitle" style={secondaryColorStyle}>{subtitle}</div>
                        </div>
                        <div className="Header__info--middle">
                            <div className="Header__description" style={tertiaryColorStyle}>{infoDesc}</div>
                        </div>
                        <div className="Header__info--bottom">
                            <div className="Header__story" style={primaryColorStyle}>
                                <div className="Header__story--title">{infoTitle}</div>
                                <div className="Header__story--story" dangerouslySetInnerHTML={{__html: infoStory}} />
                            </div>
                            <div className="Header__facts">
                                {/* add this to mockData as an array to loop over */}
                                <div className="Header__facts--title">Project</div>
                                <div className="Header__facts--description">Did this and that for this project.</div>
                            </div>
                        </div>
                    </div>
                </div>      
            </div>
        </div>
    )
}

module.exports = Header;
