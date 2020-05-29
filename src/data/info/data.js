var meData          = require('./me.json'),
    ufData          = require('./uf.json'),
    pixelsupplyData = require('./pixelsupply.json'),
    espnData        = require('./espn.json'),
    disneyData      = require('./disney.json'),

    infoDataMap     = [
        meData,
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
