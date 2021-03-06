var React          = require('react'),
    Component      = React.Component,
    Cloudinary     = require('cloudinary-react'),
    Image          = Cloudinary.Image,
    Transformation = Cloudinary.Transformation,
    LeftArrow      = require('../Icons/Arrows/left.jsx'),
    RightArrow     = require('../Icons/Arrows/right.jsx'),
    CloseIcon      = require('../Icons/Close/close.jsx'),

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

    componentDidMount() {
        document.body.classList.add('lightbox--open');
    }

    componentWillUnmount() {
        document.body.classList.remove('lightbox--open');
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
            windowWidth   = window && window.innerWidth,
            image;

        if (publicId) {
            image = (
                <Image publicId={publicId} alt={title} className="ImageLightbox__image">
                    {
                        windowWidth <= 768 ?
                            <Transformation width="600" crop="limit" dpr="auto" fetchFormat="auto"/> :
                            <Transformation width="1280" crop="limit" dpr="auto" fetchFormat="auto"/>
                    }
                </Image>
            );
        } else {
            image = <img src={src} alt={title} className="ImageLightbox__image" />
        }

        return (
            <div className="ImageLightbox">
                <div className="ImageLightbox__background" onClick={closeLightbox.bind(this)}>
                    <CloseIcon className="ImageLightbox__button ImageLightbox__button--close" onClick={closeLightbox.bind(this)} />

                    <button
                        className={`ImageLightbox__button ImageLightbox__button--prev ${ isFirstImage ? 'ImageLightbox__button--hide' : '' }`}
                        onClick={me.handleNavigate.bind(me, !isFirstImage && PREV)}
                    >
                        <LeftArrow className="Lightbox___Arrow Lightbox___Arrow--left" />
                    </button>

                    <div className="ImageLightbox__imageWrapper" onClick={closeLightbox.bind(this)}>
                        { image }
                        { title ? <div className="ImageLightbox__title">{ title }</div> : null }
                    </div>

                    <button
                        className={`ImageLightbox__button ImageLightbox__button--next ${ isLastImage ? 'ImageLightbox__button--hide' : '' }`}
                        onClick={me.handleNavigate.bind(me, !isLastImage && NEXT)}
                    >
                        <RightArrow className="Lightbox___Arrow Lightbox___Arrow--right" />
                    </button>

                </div>
            </div>
        )
    }
}

ImageLightbox.displayName = 'ImageLightbox';

module.exports = ImageLightbox;