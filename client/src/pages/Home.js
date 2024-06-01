import React from "react";
import "../styles/Home.scss";
import CategoryList from "../components/CategoryList";
import BannerProd from "../components/BannerProd";
import CategoryProduct from "../components/CategoryProduct";
import Categories from "../components/Categories";
const Home = () => {
  return (
    <div>
      {/* <CategoryList /> */}
      <BannerProd/>
      <Categories/>
      {/* <CategoryProduct category={'laptop'} heading={'Laptop'}/> */}
    </div>
  );
};

export default Home;
