import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Header = styled.header`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  margin-bottom: -70px;
`;

const Slide = styled.div`
  position: absolute;
  width: 100%;
  height: 92%;
  background-size: cover;
  background-position: center;
  transition: opacity 1s ease-in-out;
  opacity: ${props => (props.active ? 1 : 0)};
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const OverlayContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
`;

const slides = [
  { url: "RoomPhoto/1.jpg", text: "Welcome to Accom" },
  { url: "RoomPhoto/2.jpg", text: "Make your life better" },
  { url: "RoomPhoto/3.jpg", text: "Enjoy Your Stay with Us" }
];

const MainHeader = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Header>
      {slides.map((slide, index) => (
        <Slide
          key={index}
          style={{ backgroundImage: `url(${slide.url})` }}
          active={index === currentSlide}
        >
          <Overlay />
          <OverlayContent>
            <h1>
              {slide.text} <span className="hotel-color"></span>
            </h1>
            <h4>Experience the Best Hospitality in Town</h4>
          </OverlayContent>
        </Slide>
      ))}
    </Header>
  );
};

export default MainHeader;
