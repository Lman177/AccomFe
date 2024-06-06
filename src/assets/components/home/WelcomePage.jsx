import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Define the animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0; // Ensure no margin
  padding: 0; // Ensure no padding
  background: linear-gradient(to right, #ff5a5f, #ff7e5f);
  animation: ${fadeIn} 1.5s ease-out;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: white;
  margin-bottom: 10px;
  animation: ${slideIn} 1.5s ease-out;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.h2`
  font-size: 24px;
  color: white;
  margin-bottom: 30px;
  animation: ${slideIn} 2s ease-out;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000); // 3 seconds delay before redirecting to the dashboard

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [navigate]);

  return (
    <Container>
      <Title>Welcome!</Title>
      <Subtitle>We're glad to have you back.</Subtitle>
    </Container>
  );
};

export default WelcomePage;
