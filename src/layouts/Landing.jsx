import React from 'react'
import Navbar from "../components/Landing/Navbar";
import Hero from "../components/Landing/Hero"
import Statistics from '../components/Landing/Statistics';
import Testimonial from '../components/Landing/Testimonial';
import Gallery from '../components/Landing/Gallery';
import Footer from '../components/Landing/Footer';
import Contact from '../components/Landing/Contact';
import OurServices from '../components/Landing/OurServices';


const Landing = () => {
  return (
    <div className="">
        <Navbar/>
        <Hero/>
        <OurServices/>
        <Statistics/>
        <Gallery/>
        <Testimonial/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default Landing