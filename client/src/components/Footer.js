import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import "../styles/Footer.scss";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container mx-auto'>
        <div className='row'>
          <div className='col-md-3'>
            <h5>About Us</h5>
            <p>We are a leading e-commerce platform providing a wide range of products at competitive prices.</p>
          </div>
          <div className='col-md-3'>
            <h5>Quick Links</h5>
            <ul>
              <li><a href='/'>Home</a></li>
              <li><a href='/shop'>Shop</a></li>
              <li><a href='/about'>About Us</a></li>
              <li><a href='/contact'>Contact Us</a></li>
            </ul>
          </div>
          <div className='col-md-3'>
            <h5>Follow Us</h5>
            <div className='social-icons'>
              <a href='https://facebook.com'><FaFacebook /></a>
              <a href='https://twitter.com'><FaTwitter /></a>
              <a href='https://instagram.com'><FaInstagram /></a>
              <a href='https://linkedin.com'><FaLinkedin /></a>
            </div>
          </div>
          <div className='col-md-3'>
            <h5>Subscribe</h5>
            <p>Get the latest updates and offers.</p>
            <form>
              <input type='email' placeholder='Enter your email' />
              <button type='submit'>Subscribe</button>
            </form>
          </div>
        </div>
        <div className='row mt-4'>
          <div className='col text-center'>
            <p>&copy; {new Date().getFullYear()} Ecommerce website by Atib. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
