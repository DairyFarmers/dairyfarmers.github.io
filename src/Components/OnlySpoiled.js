import { useNavigate } from "react-router-dom";
import "./OnlySpoiled.css";
import { useCallback, useEffect, useState } from "react";
import PortalPopup from "./PortalPopup";
import EcoLog from "./EcoLog";
import axios from "axios";

const OnlySpoiled = ({ onClose, id }) => {

  const navigate = useNavigate();
  
  const [isEcoLogOpen, setEcoLogOpen] = useState(false);
  const [select, setSelect] = useState(false)

  const [value, setvalue] = useState("no");

  const handleYes = () => {
    setvalue("yes")
    setSelect(true)
  }

  const handleNo = () =>{
    setvalue("no")
    setSelect(false)
  }

  const openEcoLog = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/update-level', {
        id: id,
        value: value,
        expiredatetime: new Date().toISOString(),
      });
      window.alert("spolid add successfully")
      console.log(response.data); 
      setEcoLogOpen(true);
    } catch (error) {
      console.error('Error updating table:', error);
    }

  };

  const closeEcoLog = useCallback(() => {
    setEcoLogOpen(false);
  }, []);

  const [items, setItem] = useState(null);


  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/items/${id}`);
      const data = response.data;
      setItem(data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(id)

  const nowdate = new Date();
  const startdate = items && items.datetime ? new Date(items.datetime.split(' ')[0]) : null;
  var ShelfLife = items && items.ShelfLife.split('-');
  const avragedate =items &&  (parseInt(ShelfLife[0].split("(")[1]) + parseInt(ShelfLife[1].split(")")[0])) / 2;
  const enddate = items && startdate ? new Date(startdate.setDate(startdate.getDate() + avragedate)) : null;
  const diffTime = items && enddate ? enddate - nowdate : null;
  const date = parseInt(diffTime / (1000 * 3600 * 24));

  return (
     <>
        <div className="only-spoiled">
          <img
            className="mingcuteclose-line-icon5"
            alt=""
            src="/mingcutecloseline.svg"
            onClick={onClose}
          />
          <div className="hey-did-you-use-this-before-i-parent">
            <div className="hey-did-you">
              Hey! did you use this before it became a spoiler?
            </div>
            <div className="frame-parent4">
              <div className="mdiradiobox-blank-parent">
                <input className="yes" onClick={handleYes} type="radio" checked={select}/>Yes
              </div>
              <div className="mdiradiobox-marked-parent">
                <input className="yes" onClick={handleNo} type="radio"checked={!select}/>No
              </div>
            </div>
          </div>
              {items ? (
                <>
                <img className="only-spoiled-child" alt="" src={"/" + items.image}/>
              <div className="days-left-only">{date} days left</div>
              <div className="fresh-only-spoil">{items.level}</div>
            </>
          ) : (
            <div>Loading...</div>
          )}
          <div className="rectangle-parent29">
            <div className="group-child56" />
            <div className="save1" onClick={openEcoLog}>Save</div>
          </div>
          <div className="apple13">Apple</div>
          <div className="spoiled-container">
            <div className="freshness-level2">Freshness Level</div>
          </div>
          <div className="time-left-parent">
            <div className="freshness-level2">{`Remaining Shelf-Life `}</div>
          </div>
        </div>

        {isEcoLogOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeEcoLog}
          ecoleft={-600}
        >
          <EcoLog 
            onCloseMenu={closeEcoLog}
           />
        </PortalPopup>
      )}
      </>
  );
};

export default OnlySpoiled;
