var React = require('react'),

    LEFT  = 'left';

require('./Showcase.css');

function Showcase(props) {
    var imagePosition       = props && props.imgPos,
        data                = props && props.data,
        images              = data && data.images,
        description         = data && data.description,
        leftImage           = imagePosition === LEFT,
        imageComp           = images.map(src => <img src={src} className="Showcase__image"/>),
        descComp            = <div className="Showcase__description" dangerouslySetInnerHTML={{__html: description}}/>,
        imageContainerClass = 'Showcase__image--container';

    return (
        <div className="Showcase">
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

module.exports = Showcase;
