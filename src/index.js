var React         = require('react'),
    ReactDOM      = require('react-dom'),
    Shell         = require('./components/Shell/index.jsx'),
    BrowserRouter = require('react-router-dom').BrowserRouter;

ReactDOM.render((
    <BrowserRouter>
        <Shell />
    </BrowserRouter>
    ), document.getElementById('root')
);
