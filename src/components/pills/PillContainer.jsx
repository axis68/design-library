import React, {
    useRef,
    useState,
    useEffect,
  } from 'react';
import PropTypes from 'prop-types';
import Pill from './Pill';

export const PillContainer= ({ allPillTexts }) => {
  const [maxDisplayedPills, setMaxDisplayedPills] = useState(allPillTexts.length);
  const [pillsPositions, setPillsPositions] = useState({});
  const [windowWidth, setWindowWidth] = useState(0);
  
  const containerRef = useRef();
  
  const onPillBoundingChange = (id, rect) => {
    // Update the dictionary of pills's positions
    setPillsPositions((prevAllPillsRightPosition) => ({ ...prevAllPillsRightPosition, [id]: { left: rect.left, right: rect.right } }));
  };
  
  // On initialization: setup an observer to watch the container's width
  useEffect(() => {
    const onResize = () => {
      setWindowWidth(containerRef.current.offsetWidth); // Usable width of the component in px
    };
    onResize();
    window.addEventListener('resize', onResize);
  
    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  
  // On pills change (i.e. pill added/removed)
  useEffect(() => {
    setMaxDisplayedPills(allPillTexts.length);
  }, [allPillTexts]);
  
  // On size change: calculate the amount of pills that can be displayed
  useEffect(() => {
    const offsetFirstPill = (pillsPositions.length > 0) ? pillsPositions['(Pill 1)'].left : 0;
  
    const amountDisplayablePills = Object.values(pillsPositions).filter((value) => value.right - offsetFirstPill < windowWidth).length;
    console.log('Show pillCount', amountDisplayablePills, 'windowWidth', windowWidth, pillsPositions, offsetFirstPill);
    setMaxDisplayedPills(amountDisplayablePills);
  }, [pillsPositions, windowWidth]);
  
  return (
    <div ref={containerRef} className="flex flex-row">
      {allPillTexts.slice(0, maxDisplayedPills).map((pillText) => (
        <Pill key={pillText} onBoundingChange={onPillBoundingChange} text={pillText} />
      ))}
      { allPillTexts.length > maxDisplayedPills && <Pill key="more" text={`(+${allPillTexts.length - maxDisplayedPills})`} onBoundingChange={() => {}} />}
    </div>
  );
}
   
PillContainer.propTypes = {
  allPillTexts: PropTypes.arrayOf(PropTypes.string).isRequired,
};
