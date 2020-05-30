var React = require('react');

function SvgComponent(props) {
  return (
    <svg width={15} height={24} viewBox="0 0 15 24" {...props}>
      <path
        d="M3.053 23.295l-.815-.799 10.116-10.143.352-.353-.352-.353L2.238 1.504l.815-.8L14.295 12 3.053 23.295z"
      />
    </svg>
  )
}

module.exports = SvgComponent;
