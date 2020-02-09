var React = require('react');

require('./Tile.css');

function Tile(_props) {
    var props    = _props || {},
        image    = props.image,
        url      = props.url || '#',
        title    = props.title || '[missing title]';
        subtitle = props.subtitle,
        style    = {
            backgroundImage: `url(${image})`
        };
    
    return (
        <a className="Tile" href={url} style={style} target="_blank">
            <div className="Tile__overlay">
                <div className="Tile__overlay--title">{title}</div>
                { subtitle ? <div className="Tile__overlay--subtitle">{subtitle}</div> : null }
            </div>
        </a>
    );
}

Tile.displayName = 'Tile';

module.exports = Tile;