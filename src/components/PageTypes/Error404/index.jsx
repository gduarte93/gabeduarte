var React = require('react');

require('./Error404.css');

function Error404() {
    return(
        <div className="Error404">
            <div className="Error404--text">404 Page Not Found</div>
            <div className="Error404--subText">
                <a href="/">Go back home</a>
            </div>
        </div>
    );
}
module.exports = Error404;
