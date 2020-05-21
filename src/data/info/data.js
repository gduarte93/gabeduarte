var indexData       = require('./index.json'),
    ufData          = require('./uf.json'),
    pixelsupplyData = require('./pixelsupply.json'),
    espnData        = require('./espn.json'),
    disneyData      = require('./disney.json'),

    infoDataMap     = [
        indexData,
        ufData,
        pixelsupplyData,
        espnData,
        disneyData
    ].reduce((map, data) => {
        var id = data && data.id;

        if (id) {
            map[id] = data;
        }

        return map;
    }, {});

module.exports = infoDataMap;
