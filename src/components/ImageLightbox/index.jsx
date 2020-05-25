var React          = require('react'),
    Component      = React.Component,
    Cloudinary     = require('cloudinary-react'),
    Image          = Cloudinary.Image,
    Transformation = Cloudinary.Transformation,

    CONSTANTS      = require('common-constants'),
    SLIDE_NAV      = CONSTANTS.SLIDE_NAV,
    PREV           = SLIDE_NAV.PREV,
    NEXT           = SLIDE_NAV.NEXT;
    

require('./ImageLightbox.css');

class ImageLightbox extends Component {
    constructor(props) {
        super(props);

        var images = props && props.images,
            idx    = props && props.idx || 0;

        this.state = {
            images,
            currentIdx: idx
        }

        this.handleNavigate = this.handleNavigate.bind(this);
    }

    handleNavigate(direction) {
        var me         = this,
            state      = me && me.state,
            currentIdx = state && state.currentIdx;

        if (direction === NEXT) {
            currentIdx += 1;
        } else if (direction === PREV) {
            currentIdx -= 1;
        }

        me.setState({ currentIdx })
    }

    render() {
        var me            = this,
            props         = me && me.props,
            closeLightbox = props && props.closeLightbox || (() => { console.error("ERROR: Close function not provided") }),
            state         = me && me.state,
            images        = state && state.images,
            currentIdx    = state && state.currentIdx,
            currentImage  = images[currentIdx],
            publicId      = currentImage.publicId,
            title         = currentImage.alt,
            src           = typeof currentImage === "string" ? currentImage : currentImage.src,
            isFirstImage  = currentIdx === 0,
            isLastImage   = currentIdx === images.length - 1,
            image;

        if (publicId) {
            image = (
                <Image publicId={publicId} alt={title} className="ImageLightbox__image">
                    <Transformation width="1280" crop="scale" dpr="auto" fetchFormat="auto"/>
                </Image>
            );
        } else {
            image = <img src={src} alt={title} className="ImageLightbox__image" />
        }

        return (
            <div className="ImageLightbox">
                <div className="ImageLightbox__background" onClick={closeLightbox.bind(this)}>
                    <div className="ImageLightbox__nav ImageLightbox__nav--close" onClick={closeLightbox.bind(this)}>{"x"}</div>
                    <div
                        className={`ImageLightbox__nav ImageLightbox__nav--prev ${ isFirstImage ? 'ImageLightbox__nav--hide' : '' }`}
                        onClick={me.handleNavigate.bind(me, !isFirstImage && PREV)}
                    >
                        {"<"}
                    </div>
                    <div className="ImageLightbox__imageWrapper">
                        { image }
                        { title ? <div className="ImageLightbox__title">{ title }</div> : null }
                    </div>
                    <div
                        className={`ImageLightbox__nav ImageLightbox__nav--next ${ isLastImage ? 'ImageLightbox__nav--hide' : '' }`}
                        onClick={me.handleNavigate.bind(me, !isLastImage && NEXT)}
                    >
                        {">"}
                    </div>
                </div>
            </div>
        )
    }
}

ImageLightbox.displayName = 'ImageLightbox';

module.exports = ImageLightbox;