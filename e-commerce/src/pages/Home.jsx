import Announcement from "../components/Annoucmenet/Announcement";
import Navbar from "../components/Navbar/Navbar";
import styled from "styled-components";
import Slider from "../components/Slider/Slider";
import Category from "../components/Category/Category";
import Product from "../components/Product/Product";
import Newsletter from "../components/Newsletter/Newsletter";
import Footer from "../components/Footer/Footer";


const Home = () => {
  return (
    <div>

        <Announcement/>

        
      <Navbar/>
      <Slider/>
      <Category/>
      <Product/>
      <Newsletter/>
      <Footer/>

      
    </div>


     
    

  )
}

export default Home
