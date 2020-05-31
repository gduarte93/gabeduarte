var React          = require('react'),
    Cloudinary     = require('cloudinary-react'),
    Image          = Cloudinary.Image,
    Transformation = Cloudinary.Transformation;

require('./Tile.css');

function renderImage(publicId, src, alt) {
    if (publicId) {
        return (
            <Image
                publicId={publicId}
                loading="lazy"
                alt={alt}
                className="Tile__image"
            >
                <Transformation width="500" crop="limit" dpr="auto" fetchFormat="auto"/>
            </Image>
        );
    } else {
        return <img src={src} alt={alt} className="Tile__image"/>;
    }
}

function Tile(_props) {
    var props        = _props || {},
        image        = props.image || {},
        publicId     = image.publicId,
        src          = image.src,
        imageAlt     = image.alt,
        projectImage = renderImage(publicId, src, imageAlt),
        url          = props.url || '#',
        title        = props.title || '[missing title]';
        subtitle     = props.subtitle,
        style        = {
            backgroundImage: `url(${src})`
        };
    
    return (
        <a className="Tile" href={url} style={style} target="_blank">
            { projectImage }
            <div className="Tile__overlay">
                <div className="Tile__overlay--title">{title}</div>
                { subtitle ? <div className="Tile__overlay--subtitle">{subtitle}</div> : null }
            </div>
        </a>
    );
}

Tile.displayName = 'Tile';

module.exports = Tile;