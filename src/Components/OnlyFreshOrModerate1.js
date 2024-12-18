import axios from "axios";
import "./OnlyFreshOrModerate1.css";
import { useEffect, useState } from "react";

const OnlyFreshOrModerate1 = ({onClose, id}) => {

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

  const nowdate = new Date();
  const startdate = items && items.datetime ? new Date(items.datetime.split(' ')[0]) : null;
  var ShelfLife = items && items.ShelfLife.split('-');
  const avragedate =items &&  (parseInt(ShelfLife[0].split("(")[1]) + parseInt(ShelfLife[1].split(")")[0])) / 2;
  const enddate = items && startdate ? new Date(startdate.setDate(startdate.getDate() + avragedate)) : null;
  const diffTime = items && enddate ? enddate - nowdate : null;
  const date = parseInt(diffTime / (1000 * 3600 * 24));
  

  console.log(date)

  return (
    <div className="only-fresh-or-moderate1">
      <div className="rectangle-parent86">
        <div className="group-child132" />
      </div>
      {items ? (
        <>
        <div className="apple33">{items.type}</div>
        <img
          className="mingcuteclose-line-icon7"
          alt=""
          src={"/" +items.image}
        />
          <div className="days-left26">{date} days left</div>
          <div className="fresh27">{items.level}</div>
        </>
      ) : (
        <div>Loading...</div>
      )}
      <div className="only-fresh-or-moderate-inner">
        <div className="mdiradiobox-blank-wrapper">
          <div className="mdiradiobox-blank" />
        </div>
      </div>
      <div className="only-fresh-or-moderate-item" />
      <div className="freshness-level-container">
        <div className="freshness-level5">Freshness Level</div>
        
      </div>
      <div className="remaining-shelf-life-container">
        <div className="remaining-shelf-life5">{`Remaining Shelf-Life `}</div>
        
      </div>
      <div className="only-fresh-or-moderate-child1" />
    </div>
  );
};

export default OnlyFreshOrModerate1;
