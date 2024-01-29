import styled, { keyframes } from "styled-components";

const dotAnimation = keyframes`
  0%{
    content: "";
  }
  25% {
    content: ".";
  }
  50% {
    content: "..";
  }
  75% {
    content: "...";
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingText = styled.div`
  font-size: 20px;
  font-weight: 700;
  &:after {
    content: "";
    animation: ${dotAnimation} 1.5s infinite;
  }
`;

export const LoadingContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  gap: 3rem;
  padding: 20px;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: rgba(232, 232, 232, 0.9); // RGBA 사용
  border-radius: 10px;

  :last-child {
    font-size: 20px;
    font-weight: 700;
    opacity: 1;
    color: #313030;
  }
`;

export const LoadingImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  animation: ${rotate} 2s linear infinite;
  margin-bottom: 20px;
`;
