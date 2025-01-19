import React, {
    useLayoutEffect,
    useRef,
  } from 'react';
import PropTypes from 'prop-types';

function Pill({ pillKey, label, onBoundingChange}) {
    const myRef = useRef();

    useLayoutEffect(() => {
        onBoundingChange(pillKey, myRef.current.getBoundingClientRect());
    }, []);

    return (<div className="font-mono px-1 mx-0.5 border border-current 
                rounded-full whitespace-nowrap" ref={myRef}>
                {label}
            </div>);
}

Pill.propTypes = {
    pillKey: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onBoundingChange: PropTypes.func.isRequired,
};

export default Pill;