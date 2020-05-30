var React = require('react');

function SvgComponent(props) {
  return (
    <svg width={24} height={15} viewBox="0 0 24 15" {...props}>
      <path
        d="M.705 3.053l.799-.815 10.143 10.116.353.352.353-.352L22.496 2.238l.8.815L12 14.295.705 3.053z"
      />
    </svg>
  )
}

module.exports = SvgComponent;
