import { useMemo } from "react";
import "./GroupComponent2.css";

const GroupComponent2 = ({ kamalTop, gunarathneBackgroundColor }) => {
  const groupDiv1Style = useMemo(() => {
    return {
      top: kamalTop,
    };
  }, [kamalTop]);

  const rectangleDivStyle = useMemo(() => {
    return {
      backgroundColor: gunarathneBackgroundColor,
    };
  }, [gunarathneBackgroundColor]);

  return (
    <div className="rectangle-parent31" style={groupDiv1Style}>
      <div className="instance-child3" style={rectangleDivStyle} />
      <div className="kamal-parent">
        <div className="kamal">Kamal</div>
        <div className="gunarathne">Gunarathne</div>
        <div className="samplemailgmailcom">samplemail@gmail.com</div>
        <div className="div26">0711234567</div>
        <div className="div27">38</div>
        <div className="no21-colombo">No,21, Colombo</div>
      </div>
    </div>
  );
};

export default GroupComponent2;
