import { styled } from "styled-components";

export const UserProfile = styled.div<{
  src: string;
  width: number;
  height: number;
}>`
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;
  background-size: cover;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
`;
