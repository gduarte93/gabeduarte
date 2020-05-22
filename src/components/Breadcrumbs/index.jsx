var React = require('react');

require('./Breadcrumbs.css');

function Breadcrumbs(props) {
    return (
        <div className="Breadcrumbs">
            <div className="Breadcrumbs__crumb">
                <div className="Breadcrumbs__dot Breadcrumbs__dot--active" />
                <div className="Breadcrumbs__text Breadcrumbs__text--highlighted">1st link</div>
            </div>

            <div className="Breadcrumbs__crumb">
                <div className="Breadcrumbs__dot" />
                <div className="Breadcrumbs__text">2nd link</div>
            </div>

            <div className="Breadcrumbs__crumb">
                <div className="Breadcrumbs__dot" />
                <div className="Breadcrumbs__text">3rd link</div>
            </div>
        </div>
    );
}

Breadcrumbs.displayName = 'Breadcrumbs';

module.exports = Breadcrumbs;
