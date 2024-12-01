import { useState, useMemo, useCallback, useEffect } from "react";
import OnlyFreshOrModerate from "./OnlyFreshOrModerate";
import PortalPopup from "./PortalPopup";
import "./FreshAppleContainer.css";

const FreshAppleContainer = ({
  productCondition,
  propTop,
  propLeft,
  propColor,
}) => {
  const [isOnlyFreshOrModerateOpen, setOnlyFreshOrModerateOpen] =
    useState(false);
  

  const openOnlyFreshOrModerate = useCallback(() => {
    setOnlyFreshOrModerateOpen(true);
  }, []);

  const closeOnlyFreshOrModerate = useCallback(() => {
    setOnlyFreshOrModerateOpen(false);
  }, []);



  return (
    <>

      {isOnlyFreshOrModerateOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeOnlyFreshOrModerate}
        >
          <OnlyFreshOrModerate onClose={closeOnlyFreshOrModerate} />
        </PortalPopup>
      )}
    </>
  );
};

export default FreshAppleContainer;
