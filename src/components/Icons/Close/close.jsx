var React = require('react');

function SvgComponent(props) {
    var onClick = props && props.onClick;

    return (
        <svg
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 24 24"
            {...props}
        >
            <path onClick={onClick} d="M12 11.293L22.293 1l.707.707L12.707 12 23 22.293l-.707.707L12 12.707 1.707 23 1 22.293 11.293 12 1 1.707 1.707 1 12 11.293z" />
        </svg>
    )
}

module.exports = SvgComponent;
