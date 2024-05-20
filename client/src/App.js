import "./App.scss";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import { useEffect } from "react";
import SummaryApi from "./comman";
import axios from "axios";
import Context from "./context";
function App() {
  const fetchUserDetails = async()=>{
    const userDetails = await axios.get(SummaryApi.user_details, {
      withCredentials: true
    });
    console.log(userDetails);
  }
  useEffect(()=>{
    
    fetchUserDetails();
  },[])
  return (
    <Context.Provider value={{
      fetchUserDetails
    }}>
    <div className="app-container d-flex flex-column min-vh-100">
      <ToastContainer className='toast-position' position='top-center' />
      <Navbar />
      <main className="main-content container flex-grow-1 mb-3">
        <Outlet />
      </main>
      <Footer />
    </div>
    </Context.Provider>
  );
}

export default App;
