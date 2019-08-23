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
                        <div className="PageSlide__info">
                            <div className="PageSlide__title">Title</div>
                            <div className="PageSlide__subtitle">Subtitle</div>
                            <div className="PageSlide__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

module.exports = PageSlide;
