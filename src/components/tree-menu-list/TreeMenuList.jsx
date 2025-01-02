import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SingleSelectItem from './SingleSelectItem';
import optionShape from './optionTypes';;

optionShape.subOptions = PropTypes.arrayOf(PropTypes.shape(optionShape));

function findOptionsContaining(options, particularOption) {
  return options.reduce((acc, option) => {
    if (option?.index === particularOption?.index) {
      return [option]; // Stop searching children
    }
    if (option.subOptions) {
      const result = findOptionsContaining(option.subOptions, particularOption);
      if (result.length > 0) {
        return [option, ...result];
      }
    }
    return acc;
  }, []);
}

/** The TreeMenuList component provides a hierarchical list of options for selection. 
  * Each option may include a nested list of sub-options, 
  * allowing for flexible, multi-level structures. */
export const TreeMenuList = ({ options, selectedOption, onChange }) => {
  const [expandedOptions, setExpandedOptions] = useState([]);

  const toggleExpandCollapseHandler = (toggleCollapseExpandOption) => {
    if (expandedOptions.find((opt) => opt.index === toggleCollapseExpandOption.index)) {
      const newExpandedOptions = expandedOptions.filter((opt) => opt.index !== toggleCollapseExpandOption.index);
      setExpandedOptions(newExpandedOptions);
    } else {
      const newExpandedOptions = [...expandedOptions, toggleCollapseExpandOption];
      setExpandedOptions(newExpandedOptions);
    }
  };

  useEffect(() => {
    const calculatedExpOptions = findOptionsContaining(options, selectedOption);
    setExpandedOptions(calculatedExpOptions);
    // options and selectedOptions are not referenced: useEffect to be executed on initialization
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 return (
    <div className="tree-menu-list">
      {options.map((option) => (
        <SingleSelectItem
          key={option.index}
          option={option}
          selectedOption={selectedOption}
          expandedOptions={expandedOptions}
          clickHandler={onChange}
          toggleExpandCollapseHandler={toggleExpandCollapseHandler}
          level={0}
        />
      ))}
    </div>
  );
};

TreeMenuList.propTypes = {
  /** List of available options */
  options: PropTypes.arrayOf(PropTypes.shape(optionShape)),
  selectedOption: PropTypes.shape(optionShape),
  onChange: PropTypes.func,
};

TreeMenuList.defaultProps = {
  options: [],
  selectedOption: {},
  onChange: () => {},
};
