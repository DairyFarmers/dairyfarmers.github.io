import { useState, useCallback, useEffect, useMemo } from "react";
import OnlyFreshOrModerate from "../../Components/OnlyFreshOrModerate";
import PortalPopup from "../../Components/PortalPopup";
import PurchasedItem from "../../Components/PurchasedItem";
import EcoLog from "../../Components/EcoLog";
import FreshAppleContainer from "../../Components/FreshAppleContainer";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import SimpleLineChart from "../../Components/LineChart";
import Calendar from 'react-calendar';
import axios from "axios";
import MyCalendar from "../../Components/Calender";
import Frame from "../../Components/Frame1";
import Frame1 from "../../Components/Frame1";

const Home = ({ user }) => {
  const [isOnlyFreshOrModerateOpen, setOnlyFreshOrModerateOpen] =
    useState(false);
  const [isPurchasedItemOpen, setPurchasedItemOpen] = useState(false);
  const [isEcoLogOpen, setEcoLogOpen] = useState(false);
  const [isFrame, setFrame] = useState(false);
  const [selectId, setSelectId] = useState(false);
  const navigate = useNavigate();

  const openOnlyFreshOrModerate = async (itemId) => {
    setOnlyFreshOrModerateOpen(true);
    setSelectId(itemId);
  };

  const closeOnlyFreshOrModerate = useCallback(() => {
    setOnlyFreshOrModerateOpen(false);
  }, []);

  const openPurchasedItem = useCallback(() => {
    setPurchasedItemOpen(true);
  }, []);

  const closePurchasedItem = useCallback(() => {
    setPurchasedItemOpen(false);
  }, []);

  const openEcoLog = useCallback(() => {
    setEcoLogOpen(true);
  }, []);

  const closeEcoLog = useCallback(() => {
    setEcoLogOpen(false);
  }, []);

  const closeFrame = useCallback(() => {
    setFrame(false);
  }, []);

  const onFa6SolidchartLineIconClick = useCallback(() => {
    navigate("/wasted-item-mobile");
  }, [navigate]);

  const onUilsettingIconClick = useCallback(() => {
    navigate("/account-setting");
  }, [navigate]);

  const onGroupIcon2Click = useCallback(() => {
    navigate("/notigication");
  }, [navigate]);


  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (event) => {
    const selectedFile = (event.target.files[0]);

    if (selectedFile) {
      setImage(selectedFile)
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const [id, setId] = useState(1);
  useEffect(() => {
    const storedId = localStorage.getItem('uploadedImageId');
    if (storedId) {
      setId(parseInt(storedId));
    }
  }, []);
  const handleUpload = async () => {
    try {
      if (image != null) {

        const formData = new FormData();
        formData.append('image', image);
        formData.append('id', id.toString());
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        setId(id + 1);
        localStorage.setItem('uploadedImageId', (id + 1).toString());
        const response2 = await axios.post('http://localhost:5001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response2.data);
        window.alert('Image uploaded successfully');
        setFrame(true);
      }
      else {
        window.alert('Please Select Image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      window.alert('Error uploading image');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      if (file.size <= 1024 * 1024 * 10) {
        setImage(file);
      } else {
        alert('File size exceeds 10MB limit');
      }
    } else {
      alert('Please upload a JPG or PNG file');
    }
  };

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDatePickerToggle = () => {
    setShowDatePicker(!showDatePicker);
  };

  const [homes, setHomes] = useState([]);
  
  const get_homes_data = (data) => {

    console.log(data)
    setHomes(data)
  }

  useEffect(() => {
    fetch('http://localhost:5000/homes') // Replace with your backend URL
      .then(response => response.json())
      .then(data => get_homes_data(data))
      .catch(error => console.error('Error fetching homes:', error));
  }, []);

  const [item, setItem] = useState();
  const [spoil, setSpoil] = useState();
  const [spoilNo, setSpoilNo] = useState();
  const [purchase, setPurchase] = useState();

  useEffect(() => {
    const fetchDataDevice = async () => {
      try {
        const totalresponses = await axios.get("http://localhost:5000/item/total");
        const spoilCount = await axios.get("http://localhost:5000/spoil/total");
        const spoilNoCount = await axios.get("http://localhost:5000/spoil/no/total");
        const purchaseCount = await axios.get("http://localhost:5000/purchase/total");
        setItem(totalresponses.data)
        setSpoil(spoilCount.data)
        setSpoilNo(spoilNoCount.data)
        setPurchase(purchaseCount.data)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataDevice();
  }, [])

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
      <div className="home">
        <div className="home-item" />
        <div className="home-inner" />
        <div className="rectangle-div" />
        <div className="home-child1" />
        <div className="home-child2" />
        <div className="home-child3" />
        <div className="freshsight-parent">
          <b className="freshsight">DAIRY FARMER CO.</b>
          <img className="image-5-icon" alt="" src="./Images/logo.png" />
          {/* <div className="nourishing-lives-reducing">
            Nourishing Lives, Reducing Waste
          </div> */}
        </div>
        <div className="purchased-list">Items Brought Home</div>
        <div className="statistics">Wastage Tracker</div>
        <div className="overview">Overview</div>
        {user && <div className="username">{user.lastname}</div>}
        <div className="group-parent">
          <table >
            <thead >
              <tr >
                  <td className="">Image</td>
                  <td className="">Name</td>
                  <td className="date">Purchased Date</td>
                  <td className="">Unit Price</td>
                  <td className="">Shelf-Life</td>
                  <td className="">Level</td>
              </tr>
            </thead>
            <tbody>
              {homes.map((productCondition, i) => (
              <tr key={i} onClick={(e) => openOnlyFreshOrModerate(productCondition.id)} >
                            <td>
                              <img
                                className="component-11-child8"  
                                alt=""
                                src={"/"+productCondition.image}
                              />
                            </td>
                            <td className="">{productCondition.type}</td>
                            <td className="">{productCondition && productCondition.datetime ? productCondition.datetime.split(' ')[0] : ''}</td>
                            <td className="">Rs.{productCondition.price}</td>
                            <td className="">{productCondition.ShelfLife}</td>
                            <td>{productCondition.level}</td>

              </tr>
                      ))}
            </tbody>
            </table>
           
        </div>
        <img className="uiluser-icon" alt="" src="./Images/user.svg" />
        <img
          className="mingcutedown-fill-icon"
          alt=""
          src="./Images/downfill.svg"
          onClick={onUilsettingIconClick}
        />
        <div className="rectangle-parent-search">
          <input className="group-item-search" placeholder="search" 
            type="text" onChange={serach_products}
          />
          <img className="iconamoonsearch" alt="" src="./Images/search.svg"/>
        </div>
        <div className="group-container">
          <div className="rectangle-group">
            <div className="frame-wrapper">

 
              <div className="upload" onClick={handleUpload}>Upload</div>

            </div>
            <div className="please-upload-your-image-parent">
              <div className="please-upload-your">Please upload your image</div>
              <div className="use-mobile-responsiveness">
                Use a mobile device for a better experience
              </div>
            </div>


            <label htmlFor="fileInput" className="icround-upload-parent" type="file">

              <div className="featherupload-cloud-parent zindez1">
                <img
                  className="featherupload-cloud-icon"
                  alt=""
                  src="/featheruploadcloud.svg"
                />
                <div className="bottom-content" onDrop={handleDrop}>
                  <div className="description">


                    <div className="please-upload-your">
                      <input
                        type="file"
                        id="fileInput"
                        className="butt zindez"
                        onChange={handleImageChange}
                        hidden
                      />
                      {image ? (
                        <img src={previewImage} alt="Uploaded" className="image-home" />
                      ) : (
                        <>
                          <p>Select an image or drag and drop here</p>
                          <div className="jpg-or-png">
                            JPG or PNG, file size no more than 10MB
                          </div>


                          <div className="button" >
                            SELECT FILE
                          </div>

                        </>
                      )}
                    </div>


                  </div>
                </div>
              </div>

            </label>


          </div>
          <div className="upload-field zindez2" />
        </div>
        <div className="total-items">Total Items</div>
        <div className="purchased">Brought Home</div>
        <div className="eco-log">Eco-Log</div>
        <div className="chart-1">
          <div className="rectangle-container" onClick={onFa6SolidchartLineIconClick}>
            <div className="group-inner" />
            <SimpleLineChart
              top={30}
              color="white"
              Radius={10}
              width={455}
              height={220}
            />
            <div className="earnings-waste">Wastage Trends</div>
          </div>
        </div>
        <img
          className="group-icon"
          alt=""
          src="/group-883.svg"
          onClick={openPurchasedItem}
        />
        <img
          className="home-child6"
          alt=""
          src="/group-883.svg"
          onClick={openEcoLog}
        />
        <img className="image-2-icon" alt="" src="/image-2@2x.png" />
        <b className="b">{item}</b>
        <b className="b1">{purchase}</b>
        <b className="b2">{spoil+spoilNo}</b>
        <img className="image-3-icon" alt="" src="/image-3@2x.png" />
        <img className="image-4-icon" alt="" src="/image-4@2x.png" />
        <div className="octiconhome-16-parent">
          <img
            className="fa6-solidchart-line-icon"
            alt=""
            src="./Images/home.svg"
          />
          <img
            className="fa6-solidchart-line-icon"
            alt=""
            src="./Images/chartline.svg"
            onClick={onFa6SolidchartLineIconClick}
          />
          <img
            className="fa6-solidchart-line-icon"
            alt=""
            src="./Images/setting.svg"
            onClick={onUilsettingIconClick}
          />
        </div>
        <img
          className="home-child7"
          alt=""
          src="/group-902.svg"
          onClick={onGroupIcon2Click}
        />
        <div className="items">Items</div>
        <div className="items1">Items</div>
        <img
          className="material-symbols-lightdate-ra-icon"
          alt=""
          src="/materialsymbolslightdaterange.svg"
          onClick={handleDatePickerToggle}
        />

        {showDatePicker && (
          <MyCalendar
            calLeft={250}
            calTop={550}
            date={handleDatePick}
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
          
        )}
        <div className="group-div">
          <div className="component-child" />
          <img className="image-5-icon1" alt="" src="./Images/logo.png" />
        </div>
      </div>
      {isOnlyFreshOrModerateOpen && selectId && (
          <PortalPopup
            overlayColor="rgba(113, 113, 113, 0.3)"
            placement="Centered"
            onOutsideClick={closeOnlyFreshOrModerate}
          >
            <OnlyFreshOrModerate 
              onClose={closeOnlyFreshOrModerate} 
               id={selectId}
            />
          </PortalPopup>
      )}
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
      {isFrame && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeFrame}
          ecoleft={-600}
        >
          <Frame1
            onCloseClick={closeFrame}
            id={id}
          />
        </PortalPopup>
      )}
    </>
  );
};

export default Home;
