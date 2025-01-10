import React, {
    useLayoutEffect,
    useRef,
  } from 'react';
import PropTypes from 'prop-types';

function Pill({ onBoundingChange, text }) {
    const myRef = useRef();

    useLayoutEffect(() => {
        onBoundingChange(text, myRef.current.getBoundingClientRect());
    }, []);

    return <div className="font-mono whitespace-nowrap" ref={myRef}>{text}</div>;
}

Pill.propTypes = {
    onBoundingChange: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};

export default Pill;