import React, { useContext, useState } from 'react';
import '../styles/Login.scss';
import { FaRegUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link,useNavigate} from "react-router-dom";
import axios from 'axios';
import SummaryApi from '../comman';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const userContext = useContext(Context)
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userLogin = await axios.post(SummaryApi.signin, {
        email: data.email,
        password: data.password,
      }, {
        withCredentials: true
      });
    
      toast.success(userLogin.data.message);
      navigate('/');
      userContext.fetchUserDetails()
    } catch (err) {
      console.error(err);
      console.log(err.response.status);
      if(err.response.status === 401){
        toast.error(err.response.data.message);
      }
      else{
      toast.error('Error Logging in');
      }
    }
  };
  return (
    <div className="login-page d-flex justify-content-center align-items-center mt-2">
      <div className="card p-4 shadow-lg">
        <div className="text-center mb-4">
          <FaRegUserCircle size={50} className="mb-3" />
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter email"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleOnChange}
                required
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
        <div className="text-center mt-3">
          <Link to={'/forgot-password'} className="text-primary forgot-password">Forgot password?</Link>
        </div>
        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <Link to={'/sign-up'} className="text-primary sign-up">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
