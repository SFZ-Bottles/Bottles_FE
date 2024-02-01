import { styled } from "styled-components";

export const UserProfile = styled.img<{
  size: number;
}>`
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;
  background-size: cover;
  border-radius: 50%;
`;
