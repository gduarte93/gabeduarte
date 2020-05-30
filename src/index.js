var React         = require('react'),
    ReactDOM      = require('react-dom'),
    Shell         = require('./components/Shell/index.jsx'),
    BrowserRouter = require('react-router-dom').BrowserRouter,
    ScrollToTop   = require('./components/ScrollToTop/index.jsx');

ReactDOM.render((
    <BrowserRouter>
        <ScrollToTop />
        <Shell />
    </BrowserRouter>
    ), document.getElementById('root')
);
