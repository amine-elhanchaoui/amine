import { useState } from "react";
import "./ApplyEmployee.css";
import DisplayEmployees from "./DisplayEmployees";
// Import static asset so bundler resolves the correct URL at build time
import rocketImg from "./rocket.svg";

export default function ApplyEmployee() {
  const [arr,setArr]=useState([])
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    question: "value1",
    answer: "",
    gender: "",
  });

  const [showEmployees, setShowEmployees] = useState(false);

  const handleRegister = (e) => {
    // prevent form submission when clicking Register
    if (e && e.preventDefault) e.preventDefault();
    // push a shallow copy of formData to avoid mutation issues
    setArr((prev) => [...prev, { ...formData }]);
    // reset form fields
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      question: "value1",
      answer: "",
      gender: "",
    });
    setShowEmployees(true);
  };

  const [darkMode, setDarkMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMITTED DATA:", formData);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      question: "value1",
      answer: "",
      gender: "",
    })


  };

  return (
    <div
      className={
        "container-fluid d-flex align-items-center justify-content-end min-vh-100 p-5 " +
        (darkMode ? "dark-bg text-light" : "light-bg")
      }
    >
      {/* LEFT SIDE */}
      <div className="w-25 text-center">
        {/* Use imported image so the URL is resolved correctly by the bundler */}
        <img src={rocketImg} alt="rocket" className="w-50 mb-3" />

        <h2 className="fw-bold">Welcome</h2>
        <p>You are 30 seconds away from earning your own money!</p>

        <button className="btn btn-light w-50 mt-3">Login</button>

        {/* DARK MODE SWITCH */}
        <div className="mt-5 d-flex justify-content-center align-items-center gap-2">
          <div
            className={"switch" + (darkMode ? " active" : "")}
            onClick={() => setDarkMode(!darkMode)}
          >
            <div className="switch-ball"></div>
          </div>
          <span>Dark mode</span>
        </div>
      </div>

      {/* FORM */}
      <div
        className={
          "w-75 p-5 rounded-start-5 ms-5 " +
          (darkMode ? "bg-dark text-light" : "bg-light")
        }
      >
        <h1 className="text-center fw-bold mb-4">Apply As Employee</h1>

        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="First name"
                onChange={handleChange}
                value={formData.firstName}
              />
            </div>
            <div className="col">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Last name"
                onChange={handleChange}
                value={formData.lastName}
              />
            </div>
            <div className="col">
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="Your phone"
                onChange={handleChange}
                value={formData.phone}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="row mb-3">
            <div className="col">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <div className="col">
              <select
                name="question"
                className="form-select"
                onChange={handleChange}
                value={formData.question}
              >
                <option value="value1">A</option>
                <option value="value2">B</option>
                <option value="value3">C</option>
              </select>
            </div>
          </div>

          {/* Row 4 */}
          <div className="row mb-3">
            <div className="col">
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm password"
                onChange={handleChange}
                value={formData.confirmPassword}
              />
            </div>
            <div className="col">
              <input
                type="text"
                name="answer"
                className="form-control"
                placeholder="Enter your answer"
                onChange={handleChange}
                value={formData.answer}
              />
            </div>
          </div>

          {/* Gender */}
          <div className={`${darkMode ? 'text-light' : 'text-dark'} mb-3`}>
            <label className={darkMode ? "text-light" : "text-dark"}>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleChange}
              />{" "}
              Male
            </label>
            <label className={darkMode ? "text-light" : "text-dark"}>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
              />{" "}
              Female
            </label>
          </div>

          {/* Submit Button */}
          <button type="button" className="btn btn-primary float-end px-4 rounded-pill" onClick={handleRegister}>
            Register
          </button>
          
        </form>
        <button className="btn btn-warning float-end px-4  rounded-pill" onClick={() => setShowEmployees((s) => !s)}>
            {showEmployees ? 'Hide employees' : 'Show employees'}
          </button>
        {showEmployees && <div className="mt-4"><DisplayEmployees employees={arr} /></div>}
      </div>
    </div>
  );
}
