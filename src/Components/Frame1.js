import { useCallback, useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "./Frame1.css";
import PortalPopup from "../Components/PortalPopup";
import Frame from "../Components/Frame"

const Frame1 = ({id, onCloseClick}) => {
  const navigate = useNavigate();

  const [homes, setHomes] = useState({});

  const [isFrames, setFrames] = useState(false);
  const onFrameContainerClick = useCallback(() => {
    setFrames(true);
  }, []);
  
  const closeFrame = useCallback(() => {
    setFrames(false);
  }, []);

  const get_homes_data = (data) =>{

    console.log(data.length-1)
    setHomes(data[data.length-1])

  }

  useEffect(() => {
    fetch('http://localhost:5000/homes') // Replace with your backend URL
        .then(response => response.json())
        .then(data =>get_homes_data(data))
        .catch(error => console.error('Error fetching homes:', error));
      console.log(homes)
}, []);

  const handleSound = () => {
    
    const text = String(homes.colour);
    const value = new SpeechSynthesisUtterance(text);

    window.speechSynthesis.speak(value);
  }

  return (
    <>
    <div className="mingcuteclose-line-parent">
      <img
        className="mingcuteclose-line-icon1"
        alt=""
        src="/mingcutecloseline.svg"
        onClick={onCloseClick}
      />
      <img className="rectangle-icon" alt="" src={"/"+homes.image} />
      <img className="phplus-thin-icon1" alt="" src="/phplusthin.svg" />
      <div className="frame-child6" />
      <div className="red1">{String(homes.colour)}</div>
      <div className="apple-group">
        <div className="apple1">{String(homes.type)} {String(homes.id)}</div>
      </div>
    <div className="sound-group">
        <img className="sound" src="/letsiconssoundmaxfill1.svg" onClick={handleSound}/>
        <img className="img" src="/group-31.svg"/>
    </div>
      <div className="frame-wrapper3-frame" onClick={onFrameContainerClick}>
        <div className="add-now-wrapper">
          <div className="add-now-frame">Take Home</div>
        </div>
      </div>
    <div className="earnings-parent-level">
        <div className="group-wrapper1">
          <div className="freshness-level-group">
            <div className="freshness-level4">Freshness Level</div>
            <div className="fresh15">{String(homes.level)}</div>
          </div>
        </div>
        <div className="group-wrapper2">
          <div className="remaining-shelf-life-parent-sam1">
            <div className="remaining-shelf-life4">{`Remaining Shelf-Life `}</div>
            <div className="days-left14">{String(homes.ShelfLife)} days left</div>
          </div>
        </div>
      </div>
    </div>
    {isFrames && (

        <Frame
          onCloseMenu={closeFrame}
          id={id}
         />
    )}
  
  </>
    
  );
};

export default Frame1;
