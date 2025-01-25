import React, {
    useRef,
    useState,
    useEffect,
  } from 'react';
import PropTypes from 'prop-types';
import Pill from './Pill';

export const PillContainer= ({ pills }) => {
  const [maxDisplayedPills, setMaxDisplayedPills] = useState(pills.length);
  const [pillsPositions, setPillsPositions] = useState({});
  const [windowWidth, setWindowWidth] = useState(0);  
  const containerRef = useRef();
  
  const masterKey = `${pills.map(pill => pill.id).join("-")}-more`;

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
  
  // On pills change (i.e. pill added/removed): reset states
  useEffect(() => {
    setMaxDisplayedPills(pills.length);
    // setPillsPositions({});
  }, [pills]);
  
  // On size change: calculate the amount of pills that can be displayed
  useEffect(() => {
    const offsetFirstPill = (pillsPositions.length > 0) ? pillsPositions['(Pill 1)'].left : 0;
  
    const amountDisplayablePills = Object.values(pillsPositions).filter((value) => value.right - offsetFirstPill < windowWidth).length;
    // console.log('Show pillCount', amountDisplayablePills, 
    //  'windowWidth', windowWidth, pillsPositions, 
    //  'offset', offsetFirstPill);
    setMaxDisplayedPills(amountDisplayablePills);
  }, [pillsPositions, windowWidth]);
  
  return (
    <div ref={containerRef} className="flex flex-row">
      { pills.slice(0, maxDisplayedPills).map((pill) => (<Pill key={pill.id} pillKey={pill.id} label={pill.label} 
          onBoundingChange={onPillBoundingChange} />))
      }
      { pills.length > maxDisplayedPills && 
          <Pill pillKey={masterKey} label={`+${pills.length - maxDisplayedPills}`} onBoundingChange={() => {}} />}
    </div>
  );
}
   
PillContainer.propTypes = {
  pills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};
