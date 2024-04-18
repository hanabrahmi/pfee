import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Register() {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    // console.log(username, email , password );

    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", {
        username,
        email,
        password,
      });
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(err.respone.data.message);
    }
  };
  return (
    <div className="register">
      <div className="formContainer">
        <form ac onSubmit={handelSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="test" />
      </div>
    </div>
  );
}

export default Register;
