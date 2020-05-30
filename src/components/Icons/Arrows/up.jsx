var React = require('react');

function SvgComponent(props) {
  return (
    <svg width={24} height={15} viewBox="0 0 24 15" {...props}>
      <path
        d="M23.295 11.947l-.799.815L12.353 2.646 12 2.294l-.353.352L1.504 12.762l-.8-.815L12 .705l11.295 11.242z"
      />
    </svg>
  )
}

module.exports = SvgComponent;
