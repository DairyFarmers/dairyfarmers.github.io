import { useCallback, useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Frame.css";
import PortalPopup from "./PortalPopup";
import PurchasedItem from "./PurchasedItem";
import axios from "axios";

const Frame = ({ onCloseMenu, id}) => {
  const navigate = useNavigate();
  const [homes, setHomes] = useState({});

  const onCloseClick = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const [isPurchasedItemOpen, setPurchasedItemOpen] = useState(false);

  const closePurchasedItem = useCallback(() => {
    setPurchasedItemOpen(false);
  }, []);

  const [unitPrice, setUnitPrice] = useState("");

  const handleUnitPriceChange = (event) => {
    setUnitPrice(event.target.value);
  };


  const openPurchased = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/update', {
        id:homes.id,
        unitPrice : unitPrice
      });
      window.alert("ünitprice add successfully")
      console.log(response.data); 
      setPurchasedItemOpen(true);
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
    <>
        <div className="mingcuteclose-line-parent-frame">
          <img
            className="mingcuteclose-line-icon1"
            alt=""
            src="/mingcutecloseline.svg"
            onClick={ onCloseMenu}
          />
          <img className="rectangle-icon" alt="" src={"/"+homes.image} />
          <img className="phplus-thin-icon1" alt="" src="/phplusthin.svg" />
          <div className="frame-child6" />
          <div className="red1">{String(homes.colour)}</div>
          <div className="apple-group">
            <div className="apple1">{String(homes.type)} {String(homes.id)}</div>
            <img
              className="iconamoonedit-light1"
              alt=""
              src="/iconamooneditlight.svg"
            />
          </div>
          <div className="frame-wrapper3">
            <div className="add-now-wrapper" onClick={openPurchased}>
              <div className="add-now">Check Items Brought</div>
            </div>
          </div>
          <div className="earnings-parent">
            <div className="earnings" >Unit Price (Rs)</div>
            <input className="group-item" onChange={handleUnitPriceChange} placeholder="Enter the unit price"/>
          </div>
        </div>
        {isPurchasedItemOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePurchasedItem}
          Cenleft="-0%"
        >
          <PurchasedItem onCloseMenu={closePurchasedItem} />
        </PortalPopup>
      )} 
    </>
  );
};

export default Frame;
