var React = require('react');

require('./PageSlide.css');

function PageSlide() {
    return (
        <div className="PageSlide">
            <div className="PageSlide__background"></div>
            <div className="PageSlide__overlay">
                <div className="PageSlide__overlay--background">
                    <div className="PageSlide__overlay--contents">
                        <div className="PageSlide__name">Gabriel Duarte</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

module.exports = PageSlide;
