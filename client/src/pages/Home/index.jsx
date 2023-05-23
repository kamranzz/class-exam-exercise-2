import React from "react";
import "./style.css";
import CardList from "../../components/CardList/CardList";

const Home = () => {
  return (
    <>
    <div className="image-hero">
            <div className="center-div">
        <div class="container banner-content ">
          <div>
            <h1 class="text-white">
              Improved <br /> Production level <br /> with Robotics
            </h1>
            <p class="pt-20 pb-20 text-white">
              EVERYONE WANTS THE INNOVATION THROUGH ROBOTICS
            </p>
          </div>
          <a href="add" class="primary-btn text-uppercase">
            Get Started
          </a>
        </div>
        <div class="banner-img ">
          <img class="img-fluid" src="https://preview.colorlib.com/theme/robotics/img/banner-img.png" alt="" />
        </div>
      </div>
    </div>


      <CardList />
    </>
  );
};

export default Home;
