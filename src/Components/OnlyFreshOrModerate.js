import { useEffect, useState } from "react";
import "./OnlyFreshOrModerate.css";
import axios from "axios";


const OnlyFreshOrModerate = ({ onClose, id }) => {

  console.log(id)
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
    <div className="only-fresh-or-moderate">
      <img
        className="mingcuteclose-line-icon1-close"
        alt=""
        src="/mingcutecloseline.svg"
        onClick={onClose}
      />
      {items ? (
        <>
        <img
          className="only-fresh-or-moderate-child"
          alt=""
          src={"/" +items.image}
        />
          <div className="days-left-only">{date} days left</div>
          <div className="fresh-only-only">{items.level}</div>
        </>
      ) : (
        <div>Loading...</div>
      )}
      <div className="apple-only2">Apple</div>
      <div className="spoiled-group">
        <div className="freshness-level1">Freshness Level</div>
      </div>
      <div className="days-left-group-only">
        <div className="freshness-level1">{`Remaining Shelf-Life `}</div>
      </div>
    </div>
  );
};

export default OnlyFreshOrModerate;
