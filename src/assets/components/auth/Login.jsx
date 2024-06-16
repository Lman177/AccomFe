import React, { useState } from "react";
import { loginUser, registerUser } from "../utils/ApiFunctions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [registration, setRegistration] = useState({ firstName: "", phoneNumber: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectUrl = location.state?.path || "/welcome";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isLoginActive) {
      setLogin({ ...login, [name]: value });
    } else {
      setRegistration({ ...registration, [name]: value });
    }
  };

  const handlePassChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/\s/g, ''); // Remove spaces
    if (isLoginActive) {
      setLogin({ ...login, [name]: sanitizedValue });
    } else {
      setRegistration({ ...registration, [name]: sanitizedValue });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoginActive) {
      const success = await loginUser(login);
      if (success) {
        const token = success.jwt;
        auth.handleLogin(token);
        const decodedToken = jwt_decode(token);
        const userRoles = decodedToken.roles;
        if (userRoles.includes("ROLE_ADMIN")) {
          navigate("/admin-panel", { replace: true });
        } else {
          navigate(redirectUrl, { replace: true });
        }
      } else {
        setErrorMessage("Invalid username or password. Please try again.");
      }
    } else {
      try {
        const result = await registerUser(registration);
        setSuccessMessage(result);
        setErrorMessage("");
        setRegistration({ firstName: "", phoneNumber: "", email: "", password: "" });
      } catch (error) {
        setSuccessMessage("");
        setErrorMessage(`Registration error: ${error.message}`);
      }
    }
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <div className={`container ${isLoginActive ? "" : "active"}`} id="container">
      <div className="form-container sign-in">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon"><FontAwesomeIcon icon={faGooglePlusG} /></a>
            <a href="#" className="icon"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#" className="icon"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="#" className="icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
          </div>
          <span>or use your email for login</span>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={login.email}
            onChange={handlePassChange}
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={login.password}
            onChange={handlePassChange}
          />
          {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
          <a href="#">Forgot Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <h1 style={{ whiteSpace: 'nowrap' }}>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icon"><FontAwesomeIcon icon={faGooglePlusG} /></a>
            <a href="#" className="icon"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#" className="icon"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="#" className="icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
          </div>
          <span>or use your email for registration</span>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Full Name"
            value={registration.firstName}
            onChange={handleInputChange}
          />
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            placeholder="Phone Number"
            value={registration.phoneNumber}
            onChange={handleInputChange}
          />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={registration.email}
            onChange={handlePassChange}
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={registration.password}
            onChange={handlePassChange}
          />
          {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
          {successMessage && <p className="alert alert-success">{successMessage}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="hidden" id="login" onClick={() => setIsLoginActive(true)}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="hidden" id="register" onClick={() => setIsLoginActive(false)}>Sign Up</button>
          </div>
        </div>
      </div>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Montserrat', sans-serif;
        }

        body {
          background-color: #f0f0f0;
          // background: linear-gradient(to right, #7986cb, #673ab7);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          height: 100vh;
        }

        .container {
          background-color: #fff;
          border-radius: 30px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
          position: relative;
          overflow: hidden;
          width: 768px;
          max-width: 100%;
          min-height: 480px;
        }

        .container p {
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0.3px;
          margin: 20px 0;
        }

        .container span {
          font-size: 12px;
        }

        .container a {
          color: #333;
          font-size: 13px;
          text-decoration: none;
          margin: 15px 0 10px;
        }

        .container button {
          background-color: #ff5a5f;
          color: #fff;
          font-size: 12px;
          padding: 10px 45px;
          border: 1px solid transparent;
          border-radius: 8px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-top: 10px;
          cursor: pointer;
        }

        .container button.hidden {
          background-color: transparent;
          border-color: #fff;
        }

        .container form {
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 40px;
          height: 100%;
        }

        .container input {
          background-color: #eee;
          border: none;
          margin: 8px 0;
          padding: 10px 15px;
          font-size: 13px;
          border-radius: 8px;
          width: 100%;
          outline: none;
        }

        .form-container {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.6s ease-in-out;
        }

        .sign-in {
          left: 0;
          width: 50%;
          z-index: 2;
        }

        .container.active .sign-in {
          transform: translateX(100%);
        }

        .sign-up {
          left: 0;
          width: 50%;
          opacity: 0;
          z-index: 1;
        }

        .container.active .sign-up {
          transform: translateX(100%);
          opacity: 1;
          z-index: 5;
          animation: move 0.6s;
        }

        @keyframes move {
          0%, 49.99% {
            opacity: 0;
            z-index: 1;
          }
          50%, 100% {
            opacity: 1;
            z-index: 5;
          }
        }

        .social-icons {
          margin: 20px 0;
        }

        .social-icons a {
          border: 1px solid #ccc;
          border-radius: 20%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin: 0 3px;
          width: 40px;
          height: 40px;
        }

        .toggle-container {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          overflow: hidden;
          transition: all 0.6s ease-in-out;
          border-radius: 150px 0 0 100px;
          z-index: 1000;
        }

        .container.active .toggle-container {
          transform: translateX(-100%);
          border-radius: 0 150px 100px 0;
        }

        .toggle {
          background-color: #f0f0f0;
          height: 100%;
          background: linear-gradient(to right, #ff7e5f, #ff5a5f );
          color: #fff;
          position: relative;
          left: -100%;
          height: 100%;
          width: 200%;
          transform: translateX(0);
          transition: all 0.6s ease-in-out;
        }

        .container.active .toggle {
          transform: translateX(50%);
        }

        .toggle-panel {
          position: absolute;
          width: 50%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 30px;
          text-align: center;
          top: 0;
          transform: translateX(0);
          transition: all 0.6s ease-in-out;
        }

        .toggle-left {
          transform: translateX(-200%);
        }

        .container.active .toggle-left {
          transform: translateX(0);
        }

        .toggle-right {
          right: 0;
          transform: translateX(0);
        }

        .container.active .toggle-right {
          transform: translateX(200%);
        }
      `}</style>
    </div>
  );
};

export default Login;
