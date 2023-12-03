import styled from "styled-components";

export const C_FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexBox = styled.div`
  display: flex;
`;

export const C_ColFlexBox = styled(C_FlexBox)`
  flex-direction: column;
`;

export const LogInContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

export const Title = styled(C_FlexBox)`
  font-size: 8rem;
  font-weight: 700;
  margin-bottom: 5rem;
`;

export const SemiTitle = styled(Title)`
  font-size: 6rem;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 800px;
  height: 4rem;
  border-radius: 2rem;
  font-size: 1.5rem;
  padding-left: 2rem;
`;

export const BigInput = styled.textarea`
  width: 50rem;
  height: 25rem;
  border-radius: 2rem;
  font-size: 1.5rem;
  padding: 2rem;
  border-width: 3px;
`;

export const LogInDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rem 0;
`;

export const SignInDiv = styled(LogInDiv)`
  padding: 3rem 0rem;
`;

export const LogInButton = styled.button`
  font-size: 1.5rem;
  border-radius: 2rem;
  height: 3rem;
  width: 10rem;
  border: none;
  margin-bottom: 3rem;
  cursor: pointer;
`;

export const UnderLine = styled.div`
  font-size: 1.5rem;
  text-decoration: underline;
  cursor: pointer;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const Span = styled.span`
  font-size: 4rem;
  font-weight: 700;
  padding: 1rem 1rem;
`;

export const InvalidBox = styled(C_FlexBox)`
  width: 15rem;
  height: 5rem;
  font-size: 1rem;
  margin-bottom: 3rem;
  color: white;
  font-weight: 700;
  background-color: #fb7878;
  border-radius: 1rem;
`;

export const InputDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  & > p {
    font-size: 1.5rem;
  }
`;

export const LoginInfo = styled.div`
  font-size: 1.5rem;
  color: #888888;
`;

export const CheckId = styled.div`
  font-size: 1.5rem;
  text-decoration: underline;
  cursor: pointer;
  padding: 0 1rem;
`;

export const IdLength = styled.div<{ len: number }>`
  position: absolute;
  right: 2rem;
  bottom: -1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => (props.len < 30 ? "#888888" : "#FC7268")};
`;

export const PasswordLength = styled(IdLength)`
  bottom: -4rem;
`;

export const IntroLegnth = styled(PasswordLength)`
  color: ${(props) => (props.len < 150 ? "#888888" : "#FC7268")};
`;

export const AvailableBox = styled.div<{ available: boolean }>`
  position: relative;
  width: 20rem;
  height: 3rem;
  padding: 0 1rem;
  font-size: 1.5rem;
  color: ${(props) => (props.available ? "#2684FC" : "#FC7268")};
`;

export const NextButton = styled.button`
  height: 4rem;
  width: 10rem;
  border: none;
  border-radius: 2rem;
  margin-top: 6rem;
  margin-right: 5rem;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
`;
