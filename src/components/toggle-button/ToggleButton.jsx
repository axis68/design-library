import PropTypes from 'prop-types';
import './ToggleButton.css';

/** The ToggleButton component switches between a status 'collapsed' and 'expanded' */
export const ToggleButton = ({ isExpanded, onClick }) => {
    return (
      <span
        className="toggle-button"
        tabIndex={-1}
        role="button"
        onClick={onClick}
        onKeyDown={() => {}}
        onFocus={() => {}}
      >
        {isExpanded ? (
          'v'
        ) : (
          '>'
        )}
      </span>
    );
  }

  ToggleButton.propTypes = {
    isExpanded: PropTypes.bool,
    onClick: PropTypes.func,
  };

  ToggleButton.defaultProps = {
    isExpanded: false,
    onClick: () => {},
  };

  export default ToggleButton;