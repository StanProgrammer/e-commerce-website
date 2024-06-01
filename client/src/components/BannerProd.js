import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import "../styles/BannerProd.scss";

// Dynamically import images
const importAll = (r) => r.keys().map(r);

const desktopImages = importAll(
  require.context("../../public/assests/banner", false, /^\.\/.*(?<!_mobile)\.(jpg|webp)$/)
);
const mobileImages = importAll(
  require.context("../../public/assests/banner", false, /^\.\/.*_mobile\.(jpg|webp|png)$/)
);

const BannerProd = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const images = isMobile ? mobileImages : desktopImages;

  return (
    <Carousel>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            src={image}
            alt={`Banner ${index}`}
            className="d-block w-100"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default BannerProd;