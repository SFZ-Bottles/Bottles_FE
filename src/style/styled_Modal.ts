import styled from "styled-components";

export const ModalInput = styled.textarea`
  width: 400px;
  height: 300px;
  border-radius: 2rem;
  font-size: 1.5rem;
  padding: 2rem;
  border-width: 3px;
  margin: 30px 0;
`;

export const CustomButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  border-radius: 20px;
  border: none;
  color: white;
  font-weight: 700;
  background-color: #1381a4;
  cursor: pointer;
  margin: 30px 0;
`;

export const ButtonDiv = styled.div`
  display: flex;
  position: relative;
  bottom: 0;
  width: 100%;
  justify-content: center;
  gap: 50px;
  align-items: center;
`;

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: 2px solid black;
`;

export const ListContainer = styled.div`
  display: grid;
  position: relative;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  padding: 24px;
  gap: 10px;
  z-index: -1;
`;

export const UploadButton = styled.div`
  display: flex;
  position: absolute;
  bottom: -100px;
  left: 50%;
  right: 50%;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 30px;
  cursor: pointer;
  background-color: white;
  z-index: 1;
`;

export const BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-right: 1rem;
`;

export const AddButton = styled.button`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  top: -20px;
  right: -20px;
  border-radius: 3rem;
  width: 40px;
  height: 40px;
  border: none;
  font-size: 2.5rem;
  background-color: #1381a4;
  color: white;
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3rem;
  width: 20px;
  height: 20px;
  border: none;
  font-size: 1rem;
  background-color: gray;
  color: white;
`;
