import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OnlySpoiled1.css";
import axios from "axios";

const OnlySpoiled1 = ({onClose, id}) => {
  const navigate = useNavigate();

  const [value, setvalue] = useState("");

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
      navigate("/ecolog")
    } catch (error) {
      console.error('Error updating table:', error);
    }

  };

  const [items, setItem] = useState(null);
  const [select, setSelect] = useState(false)

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
    <div className="only-spoiled1">
      <div className="rectangle-parent89">
        <div className="group-child147" />
        <div className="apple34">Apple</div>
        <img
          className="mingcuteclose-line-icon9"
          alt=""
          src="/mingcutecloseline1.svg"
          onClick={onClose}
        />
      </div>
      <div className="rectangle-parent90" onClick={openEcoLog}>
        <div className="group-child148" />
        <div className="save4" >Save</div>
      </div>
      <div className="freshness-level-parent1">
        <div className="freshness-level6">Freshness Level</div>
      </div>
      <div className="remaining-shelf-life-parent1">
        <div className="remaining-shelf-life6">{`Remaining Shelf-Life `}</div>
      </div>
      {items ? (
                <>
              <div className="time-left3">{date} days left</div>
              <div className="fresh28">{items.level}</div>
            </>
          ) : (
            <div>Loading...</div>
          )}
      <div className="frame-parent36">
        <div className="frame-parent37">
          <div className="mdiradiobox-blank-group">
            <input className="yes" onClick={handleYes} type="radio" checked={select}/>Yes
            
          </div>
          <div className="mdiradiobox-marked-group">
          <input className="yes" onClick={handleNo} type="radio"checked={!select}/>No
          </div>
        </div>
        <div className="hey-did-you1">
          Hey! did you use this before it became a spoiler?
        </div>
      </div>
    </div>
  );
};

export default OnlySpoiled1;
