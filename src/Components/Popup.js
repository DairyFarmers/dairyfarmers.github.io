import axios from "axios";
import "./Popup.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Popup = ({onClose, id}) => {
  console.log(id)

  const [homes, setHomes] = useState({});

  const [unitPrice, setUnitPrice] = useState("");

  const handleUnitPriceChange = (event) => {
    setUnitPrice(event.target.value);
  };
  const navigate= useNavigate();

  const openPurchased = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/update', {
        id:homes.id,
        unitPrice : unitPrice
      });
      window.alert("ünitprice add successfully")
      console.log(response.data); 
      navigate("/purchase1")
    } catch (error) {
      console.error('Error updating table:', error);
    }
  };

  const get_homes_data = (data) =>{

    console.log(data[data.length-1])
    setHomes(data[data.length-1])

  }

  useEffect(() => {
    fetch('http://localhost:5000/homes') // Replace with your backend URL
        .then(response => response.json())
        .then(data =>get_homes_data(data))
        .catch(error => console.error('Error fetching homes:', error));
}, []);


  return (
    <div className="popup">
      <div className="rectangle-parent91">
        <div className="group-child158" />
        <div className="earnings-parent30">
          <div className="earnings84">Unit Price (Rs)</div>
          <input className="group-child159"  onChange={handleUnitPriceChange} placeholder="Enter the unit price"/>
        </div>
        <img
          className="mingcuteclose-line-icon10"
          alt=""
          src="/mingcutecloseline1.svg"
          onClick={onClose}
        />
      </div>
      <div className="rectangle-parent92" onClick={openPurchased}>
        <div className="group-child160" />
        <div className="add-now1">Check Items Brought</div>
      </div>
    </div>
  );
};

export default Popup;
