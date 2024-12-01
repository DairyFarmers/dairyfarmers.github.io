import { useState, useCallback, useEffect } from "react";
import OnlyFreshOrModerate from "./OnlyFreshOrModerate";
import PortalPopup from "./PortalPopup";
import OnlySpoiled from "./OnlySpoiled";
import "./EcoLog.css";
import { useNavigate } from "react-router-dom";
import MyCalendar from "./Calender";

const EcoLog = ({ onCloseMenu }) => {

  const navigate = useNavigate();

  const [isOnlyFreshOrModerateOpen, setOnlyFreshOrModerateOpen] =
    useState(false);
  const [isOnlyFreshOrModerate1Open, setOnlyFreshOrModerate1Open] =
    useState(false);
  const [isOnlyFreshOrModerate2Open, setOnlyFreshOrModerate2Open] =
    useState(false);
  const [isOnlySpoiledOpen, setOnlySpoiledOpen] = useState(false);
  const [isOnlySpoiled1Open, setOnlySpoiled1Open] = useState("");

  const openOnlyFreshOrModerate = useCallback(() => {
    setOnlyFreshOrModerateOpen(true);
  }, []);

  const closeOnlyFreshOrModerate = useCallback(() => {
    setOnlyFreshOrModerateOpen(false);
  }, []);

  const openOnlyFreshOrModerate1 = useCallback(() => {
    setOnlyFreshOrModerate1Open(true);
  }, []);

  const closeOnlyFreshOrModerate1 = useCallback(() => {
    setOnlyFreshOrModerate1Open(false);
  }, []);

  const openOnlyFreshOrModerate2 = useCallback(() => {
    setOnlyFreshOrModerate2Open(true);
  }, []);

  const closeOnlyFreshOrModerate2 = useCallback(() => {
    setOnlyFreshOrModerate2Open(false);
  }, []);

  const openOnlySpoiled = useCallback(() => {
    setOnlySpoiledOpen(true);
  }, []);

  const closeOnlySpoiled = useCallback(() => {
    setOnlySpoiledOpen(false);
  }, []);

  const openOnlySpoiled1 = useCallback(() => {
    setOnlySpoiled1Open(true);
  }, []);

  const closeOnlySpoiled1 = useCallback(() => {
    setOnlySpoiled1Open(false);
  }, []);

  const onClose = useCallback(() => {
    navigate("/wasted-item-mobile")
  }, []);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDatePickerToggle = () => {
    setShowDatePicker(!showDatePicker);

  };

  const [homes, setHomes] = useState([]);

  const get_homes_data = (data) => {


    var newdata = [];
    for (let i = 0; i < data.length; i++) {
      const nowdate = new Date();
      const startdate = data[i].datetime ? new Date(data[i].datetime.split(' ')[0]) : null;
      var ShelfLife = data[i].ShelfLife.split('-');
      const avragedate = (parseInt(ShelfLife[0].split("(")[1]) + parseInt(ShelfLife[1].split(")")[0])) / 2;
      const enddate = startdate ? new Date(startdate.setDate(startdate.getDate() + avragedate)) : null;
      const diffTime = enddate ? enddate - nowdate : null;
      const remeberdate = parseInt(diffTime / (1000 * 3600 * 24));
      const displayDate = remeberdate < 0 ? 0 : remeberdate;
      newdata.push({ ...data[i], remeberdate: displayDate })
    }
    // console.log(newdata)
    setHomes(newdata)

  }

  useEffect(() => {
    fetch('http://localhost:5000/homes') // Replace with your backend URL
      .then(response => response.json())
      .then(data => get_homes_data(data))
      .catch(error => console.error('Error fetching homes:', error));
  }, []);

  const serach_products = (event) => {
    const data = {
      nodes: homes.filter((item) =>
        item.type.toLowerCase().includes(event.target.value.toLowerCase())
      ),
    };

    console.log(data);

    if (event.target.value.toLowerCase() == "") {
      fetch('http://localhost:5000/homes') // Replace with your backend URL
      .then(response => response.json())
      .then(data => get_homes_data(data))
      .catch(error => console.error('Error fetching homes:', error));
    } else if (data.nodes.length == 0) {
      fetch('http://localhost:5000/homes') // Replace with your backend URL
      .then(response => response.json())
      .then(data => get_homes_data(data))
      .catch(error => console.error('Error fetching homes:', error));
    } else {
      setHomes(data.nodes);
    }
  };

  const handleDatePick = (date) => {
    console.log(date);
    console.log(handleDatePick)
  }

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
    console.log(date)
    var newhomes = [];
    for (let i = 0; i < homes.length; i++) {
      console.log(new Date(homes[i].datetime)
      .toLocaleDateString('en-GB',{year:"numeric",month:'2-digit',day:"2-digit"}) ,
      new Date(date)
      .toLocaleDateString('en-GB',{year:"numeric",month:'2-digit',day:"2-digit"}))
      if(homes[i].datetime != null && new Date(homes[i].datetime)
      .toLocaleDateString('en-GB',{year:"numeric",month:'2-digit',day:"2-digit"}) == 
      new Date(date)
      .toLocaleDateString('en-GB',{year:"numeric",month:'2-digit',day:"2-digit"})){
        newhomes.push(homes[i])
      }
    }
    if( newhomes.length == 0){
      alert("No data found");
      fetch('http://localhost:5000/homes') // Replace with your backend URL
      .then(response => response.json())
      .then(data => get_homes_data(data))
      .catch(error => console.error('Error fetching homes:', error));
    }else{
      setHomes(newhomes);
    }
   
  };

  return (
    <>
      <div className="eco-log1">
        <img
          className="mingcuteclose-line-icon4"
          alt=""
          src="/mingcutecloseline.svg"
          onClick={onCloseMenu || onClose}
        />
        <div className="eco-log2">Eco-Log</div>
        <div className="table-eco">
          <table>
            <thead>
              <tr>
                <td className="">Image</td>
                <td className="">Name</td>
                <td className="date">Purchased Date</td>
                <td className="">Unit Price</td>
                <td className="">Time Left</td>
                <td className="">Level</td>
              </tr>
            </thead>
            <tbody>
              {homes.map((productCondition) => (

                <tr>
                  {productCondition.spoil != null && (
                    <>
                      <td>
                        <img
                          className="component-11-child8"
                          alt=""
                          src={"/" + productCondition.image}
                        />
                      </td>
                      <td className="">{productCondition.type}</td>
                      <td className="">{productCondition && productCondition.datetime ? productCondition.datetime.split(' ')[0] : ''}</td>
                      <td className="">Rs.{productCondition.price}</td>
                      <td className="">{productCondition.remeberdate} days left</td>
                      <td>
                        {productCondition.spoil==="yes" &&(
                            <>Consumed</>
                        )}
                        {productCondition.spoil === "no" &&(
                            <>Spoiled</>
                        )}
                        
                      </td>
                    </>
                  )}
                </tr>

              ))}
            </tbody>
          </table>
        </div>
        <div className="rectangle-parent-search-eco">
          <input className="group-item-search-eco" placeholder="search" onChange={serach_products}/>
          <img className="iconamoonsearch-eco" alt="" src="/iconamoonsearch.svg" />
        </div>
        <img
          className="material-symbols-lightdate-ra-icon2"
          alt=""
          src="/materialsymbolslightdaterange.svg"
          onClick={handleDatePickerToggle}
        />

        {showDatePicker && (
           <MyCalendar
            calLeft={50}
            calTop={-510}
            date={handleDatePick}
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
        )}
      </div>

      {isOnlyFreshOrModerateOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeOnlyFreshOrModerate}
        >
          <OnlyFreshOrModerate onClose={closeOnlyFreshOrModerate} />
        </PortalPopup>
      )}
      {isOnlyFreshOrModerate1Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeOnlyFreshOrModerate1}
        >
          <OnlyFreshOrModerate onClose={closeOnlyFreshOrModerate1} />
        </PortalPopup>
      )}
      {isOnlyFreshOrModerate2Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeOnlyFreshOrModerate2}
        >
          <OnlyFreshOrModerate onClose={closeOnlyFreshOrModerate2} />
        </PortalPopup>
      )}
      {isOnlySpoiledOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeOnlySpoiled}
        >
          <OnlySpoiled onClose={closeOnlySpoiled} />
        </PortalPopup>
      )}
      {isOnlySpoiled1Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeOnlySpoiled1}
        >
          <OnlySpoiled onClose={closeOnlySpoiled1} />
        </PortalPopup>
      )}
    </>
  );
};

export default EcoLog;
