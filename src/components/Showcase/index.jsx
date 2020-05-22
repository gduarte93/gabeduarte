var React = require('react'),

    LEFT  = 'left';

require('./Showcase.css');

function Showcase(props) {
    var data                 = props && props.data,
        imagePosition        = data && data.imgPos,
        images               = data && data.images,
        description          = data && data.description,
        leftImage            = imagePosition === LEFT,
        backgroundImage      = data && data.backgroundImage,
        backgroundColor      = data && data.backgroundColor,
        imageComp            = images.map((src, idx) => <img key={idx} src={src} className="Showcase__image"/>),
        descComp             = <div className="Showcase__description" dangerouslySetInnerHTML={{__html: description}}/>,
        imageContainerClass  = 'Showcase__image--container',
        backgroundImageStyle = backgroundImage && {
            backgroundImage: `url(${backgroundImage})`
        },
        backgroundColorStyle = backgroundColor && {
            backgroundColor: backgroundColor
        },
        backgroundStyle      = backgroundImageStyle || backgroundColorStyle || {};

    return (
        <div className="Showcase" style={backgroundStyle}>
            <div className={`Showcase__left ${leftImage && imageContainerClass}`}>
                {
                    leftImage ? imageComp : descComp
                }
            </div>
            <div className={`Showcase__right ${!leftImage && imageContainerClass}`}>
                {
                    leftImage ? descComp : imageComp
                }
            </div>
        </div>
    )
}

Showcase.displayName = 'Showcase';

module.exports = Showcase;
