
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../Signin/SignIn.css";
import "./Verification.css";

const Verification = () => {
  const navigate = useNavigate();
  const isEmailVerified = useSelector((state) => state.user.is_verified);

  useEffect(() => {
    console.log('email:::', isEmailVerified)
    if (isEmailVerified) {
      navigate("/dashboard", { replace: true });
    }
  }, [isEmailVerified]);

  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // Only allow numbers
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move focus to the next input if value is entered
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && code[index] === "") {
      // Move focus to the previous input on backspace
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const onSend = async () => {
    navigate("/newPassword")
  }

return (
  <div>
    <div className="row">
      <div className="bg_black col-12">
        <div className="row">
          {/* Right Side Content */}
          <div className="col-6">
            <div className="row bg_white">
              <div className="col-12 ">
                <div className="row">
                  <span className="logtx01">Verification</span>
                </div>
                <div className="row mt-1">
                  <span className="logtx02 mb-3">Enter your organizational credentials to proceed</span>
                </div>
                <div className="row mt-4">
                  <div className="col-12 all_center">
                    <div className="row col-7">
                      <label className="loglab mb-1" id="code">Enter Verification Code</label>
                      <div className="verification-code-container">
                        {code.map((digit, index) => (
                                <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="verification-code-input"
                                />
                            ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="code">If you didn't receive a code, <span>Resend</span></div>
                  <div className="col-12 all_center mt-3">
                    <div className="col-7 space_bet" id="send">
                      <button className="btn btn-dark" onClick={onSend}>Send</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row upbox">
              <span className="logotx"><img className="me-2" src="./images/logo.png" alt="" />DAIRY FARMER CO.</span>
            </div>
            <div className="row botbox">
              <span className="bottx ">Revolutionizing poultry farming with our non-invasive pre-incubation gender determination system, utilizing machine learning for efficient and ethical chick sexing.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Verification;
