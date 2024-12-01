import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./GroupIcon.css"

const GroupIcon = () => {
  const navigate = useNavigate();

  const onGroupClick = useCallback(() => {
    navigate("/navbar");
  }, [navigate]);

  return (
    <img
      className="frame-child15"
      loading="lazy"
      alt=""
      src="/group-904.svg"
      onClick={onGroupClick}
    />
  );
};

export default GroupIcon;
