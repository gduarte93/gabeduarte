var React        = require('react'),
    reactRouter  = require('react-router-dom'),
    Link         = reactRouter.Link,

    CONSTANTS    = require('common-constants'),
    SLIDE_NAV    = CONSTANTS.SLIDE_NAV,
    PREV         = SLIDE_NAV.PREV,
    NEXT         = SLIDE_NAV.NEXT;

require('./Breadcrumbs.css');

function Breadcrumbs(props) {
    var data             = props && props.data,
        breadCrumbs      = data && data.breadCrumbs,
        currentSlide     = data && data.currentSlide,
        handleCrumbClick = props && props.handleCrumbClick;

    return (
        <div className="Breadcrumbs">
            {
                breadCrumbs.map((crumb, idx) => {
                    var id     = crumb && crumb.id,
                        title  = crumb && crumb.title,
                        path   = crumb && crumb.path,
                        active = crumb && crumb.active,
                        direction;

                    if (id > currentSlide) {
                        direction = NEXT;
                    } else if (id < currentSlide) {
                        direction = PREV;
                    }

                    // todo display non -> block opacity transition
                    return (
                        <Link key={idx} className="Breadcrumbs__crumb" to={path} onClick={(e) => handleCrumbClick(path, direction, e)}>
                            <div className={`Breadcrumbs__dot ${ active && 'Breadcrumbs__dot--active' }`} />
                            <div className="Breadcrumbs__text">{title}</div>
                        </Link>
                    );
                })
            }
        </div>
    );
}

Breadcrumbs.displayName = 'Breadcrumbs';

module.exports = Breadcrumbs;
