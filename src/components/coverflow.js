import React from "react"
import Coverflow from "react-coverflow"
import carouselImg1 from "../images/girl/jernej-graj-8y6L01KFagQ-unsplash.jpg"
import carouselImg2 from "../images/boy/bianca-berg-zhsjOtsBFts-unsplash.jpg"
import carouselImg3 from "../images/boy/briona-baker-t-3jCN4rxhE-unsplash.jpg"
import carouselImg4 from "../images/boy/heleno-kaizer-g5esYpKf6Qw-unsplash.jpg"
import carouselImg5 from "../images/boy/james-barr-hoxXBSlYzeg-unsplash.jpg"
import carouselImg6 from "../images/girl/atikh-bana-2c0midsQKe0-unsplash.jpg"
import carouselImg7 from "../images/girl/caique-silva-Ij24Uq1sMwM-unsplash.jpg"

export default () => (
  <Coverflow
    height="400"
    displayQuantityOfSide={3}
    navigation={false}
    enableScroll={false}
    clickable={false}
    active={0}
    infiniteScroll={true}
    media={{
      "@media (max-width: 900px)": {
        height: "10em",
      },
    }}
  >
    <img src={carouselImg1} alt="" />
    <img src={carouselImg2} alt="" />
    <img src={carouselImg6} alt="" />
    <img src={carouselImg3} alt="" />
    <img src={carouselImg4} alt="" />
    <img src={carouselImg5} alt="" />
    <img src={carouselImg7} alt="" />
  </Coverflow>
)
