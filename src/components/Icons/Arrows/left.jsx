var React = require('react');

function SvgComponent(props) {
    return (
        <svg width={15} height={24} viewBox="0 0 15 24" {...props}>
            <path
                d="M11.947.705l.815.799L2.646 11.647 2.294 12l.352.353 10.116 10.143-.815.8L.705 12 11.947.705z"
            />
        </svg>
    )
}

module.exports = SvgComponent;
