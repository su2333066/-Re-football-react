import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "components/Carousel/styles.css";
import { Link } from "react-router-dom";

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="carousel">
      <div className="sliderContainer">
        <div className="sliderBox">
          <Slider {...settings}>
            <Link className="sliderImgBox">
              <img
                src="https://plab-football.s3.amazonaws.com/media/banner-debut-event_m.png"
                alt="1"
              />
            </Link>
            <Link className="sliderImgBox">
              <img
                src="https://plab-football.s3.amazonaws.com/media/banner-starter_pc.png"
                alt="2"
              />
            </Link>
            <Link className="sliderImgBox">
              <img
                src="https://plab-football.s3.amazonaws.com/media/banner-12challenge_pc_1.png"
                alt="3"
              />
            </Link>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
