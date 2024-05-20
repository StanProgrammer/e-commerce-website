import "./App.scss";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <Navbar />
      <main className="main-content container flex-grow-1 mb-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
