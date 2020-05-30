var React = require('react');

require('./Divider.css');

function Divider(props) {
    var data      = props && props.data,
        text      = data && data.text,
        link      = data && data.link,
        // using <a /> instead of <Link /> for no transition animation
        Comp      = link ? (
                <a href={link}>{text}</a>
            ) : (
                <div>{text}</div>
            );

    return (
        <div className="Divider">
            { Comp }
        </div>
    );
}

Divider.displayName = "Divider";

module.exports = Divider;
