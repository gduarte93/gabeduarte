var React         = require('react'),
    Header        = require('../Header/index.jsx'),
    Showcase      = require('../Showcase/index.jsx'),
    showcaseMock1 = require('../Showcase/mockData.json'),
    showcaseMock2 = require('../Showcase/mockData2.json');

require('./PageInfo.css')

function PageInfo() {
    return (
        <React.Fragment>
            <Header />
            <Showcase imgPos="left" data={showcaseMock2} />
            <Showcase imgPos="right" data={showcaseMock1} />
            {/* // TODO: Bulletedlist Component */}
        </React.Fragment>
    )
}

module.exports = PageInfo;
