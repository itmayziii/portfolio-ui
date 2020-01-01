import PropTypes from 'prop-types'

/**
 * Helps us to have consistency for this annoyingly verbose `children` prop type.
 */
export const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node
])
