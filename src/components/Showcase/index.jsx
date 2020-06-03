var React          = require('react'),
    Component      = React.Component,
    PropTypes      = require('prop-types'),
    Cloudinary     = require('cloudinary-react'),
    Image          = Cloudinary.Image,
    Transformation = Cloudinary.Transformation,

    LEFT           = 'left';

require('./Showcase.css');

class Showcase extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var me                   = this,
            context              = me && me.context,
            openLightbox         = context && context.openLightbox || (() => { console.error("ERROR: No open lightbox function provided") }),
            props                = me && me.props,
            data                 = props && props.data,
            imagePosition        = data && data.imgPos,
            images               = data && data.images || [],
            title                = data && data.title,
            description          = data && data.description,
            leftImage            = imagePosition === LEFT,
            backgroundImage      = data && data.backgroundImage,
            backgroundColor      = data && data.backgroundColor,
            windowWidth          = window && window.innerWidth,
            imageLength          = images.length,
            imgContainerSubClass = imageLength === 1 ? 'Showcase__imageContainer--solo'
                : imageLength > 1 && imageLength < 6 ? 'Showcase__imageContainer--duo'
                : 'Showcase__imageContainer--trio',
            imageComp            = images.map((image, idx) => {
                var src = "",
                    alt = "",
                    publicId;

                if (typeof image === "string") {
                    src = image;
                } else {
                    src = image && image.src;
                    alt = image && image.alt;
                    publicId = image && image.publicId;
                }

                if (publicId) {
                    return (
                        <Image
                            key={idx}
                            publicId={publicId}
                            loading="lazy"
                            alt={alt}
                            className="Showcase__image"
                            onClick={openLightbox.bind(this, images, idx)}
                        >
                            {
                                windowWidth <= 768 ?
                                    <Transformation width="300" crop="limit" dpr="auto" fetchFormat="auto"/> :
                                    <Transformation width="500" crop="limit" dpr="auto" fetchFormat="auto"/>
                            }
                        </Image>
                    );
                } else {
                    return <img key={idx} src={src} alt={alt} className="Showcase__image" onClick={openLightbox.bind(this, images, idx)}/>;
                }
            }),
            descComp             = <div className="Showcase__description" dangerouslySetInnerHTML={{__html: description}}/>,
            titleComp            = title ? <div className="Showcase__title">{title}</div> : null,
            titleAndDescComp     = <React.Fragment>{titleComp}{descComp}</React.Fragment>,
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
                <div className={`Showcase__left ${leftImage && imageContainerClass} ${leftImage && imgContainerSubClass}`}>
                    {
                        leftImage ? imageComp : titleAndDescComp
                    }
                </div>
                <div className={`Showcase__right ${!leftImage && imageContainerClass} ${!leftImage && imgContainerSubClass}`}>
                    {
                        leftImage ? titleAndDescComp : imageComp
                    }
                </div>
            </div>
        )
    }
}

Showcase.displayName = 'Showcase';

Showcase.contextTypes = {
    openLightbox : PropTypes.func
}

module.exports = Showcase;
