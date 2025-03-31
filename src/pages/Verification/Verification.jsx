import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Verification.scss";
import OrgIntro from "../../components/shared/OrgIntro";
import { axiosPrivate } from "../../api/axios";
import { email_verification_path, verification_code_path } from "../../api/config";

const Verification = () => {
    const navigate = useNavigate();
    const user_id = useSelector((state) => state.user.user_id);
    const isEmailVerified = useSelector((state) => state.user.is_verified);
  
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);
    const [isVerified, setIsVerified] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);

    useEffect(() => {
        if (isEmailVerified) {
          navigate("/", { replace: true });
        }
    }, [isEmailVerified]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && code[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleCodeSend = async () => {
    try {
      const response = await axiosPrivate.get(verification_code_path);
  
      if (response.data.status) {
        setIsCodeSent(true);
        setStatus("success");
        setMessage("✅ OTP sent successfully!");
      } else {
        setStatus("error");
        setMessage("❌ Unable to send verification code. Please try again.");
      }
    } catch (error) {
        navigate("/error", { replace: true });
    }
  }

  const handleEmailVerification = async () => {
    try {
      const response = await axiosPrivate.post(email_verification_path, {
        code: code.join("")
      });
  
      if (response.data.status) {
        setIsVerified(true);
        setStatus("success");
        setMessage("✅ Email verified successfully!");
      } else {
        setStatus("error");
        setMessage("❌ Invalid verification code. Please try again.");
      }
    } catch (error) {
        navigate("/error", { replace: true });
    }
  }

  return (
    <div className="container-fluid verification-container d-flex align-items-center justify-content-center">
      <div className="row verification-box shadow">
        {/* Left Side */}
        <div className="col-md-6 col-12 p-4 left-box">
          <div className="left-box-content">
            <h2 className="text-center fw-bold">Verify Your Email</h2>

            {message && (
              <div className={`alert ${status === "success" ? "alert-success" : "alert-danger"}`} role="alert">
                {message}
              </div>
            )}

            {isVerified ? (
              <p className="text-center text-success">🎉 Your email has been verified successfully!</p>
            ) : (
              <>
                <p className="text-center text-muted">
                  {isCodeSent ? "Enter the verification code sent to your email" : "Click below to receive a verification code."}
                </p>

                {!isCodeSent ? (
                  <button className="btn btn-dark w-100 mt-4" onClick={handleCodeSend}>
                    Send Verification Code
                  </button>
                ) : (
                  <>
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

                    <button className="btn btn-dark w-100 mt-4" onClick={handleEmailVerification}>
                      Verify Your Email
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          <div className="mt-4 text-end">
            <span className="text-primary forgot-password" onClick={() => navigate("/login")}>
              Back to Login
            </span>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-md-6 d-none d-md-block p-4 right-box">
          <OrgIntro />
        </div>
      </div>
    </div>
  );
};

export default Verification;