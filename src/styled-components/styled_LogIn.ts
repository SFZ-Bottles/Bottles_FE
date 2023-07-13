import styled from "styled-components";

export const LogInContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
`;

export const Title = styled.span`
    display: flex;
    font-size: 8rem;
    font-weight: 700;
    margin-bottom: 5rem;
`;

export const Input = styled.input`
    width: 40rem;
    height: 4rem;
    border-radius: 2rem;
    font-size: 1.5rem;
    padding-left: 2rem;
`;

export const LogInDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10rem 0;
`;

export const LogInButton = styled.button`
    font-size: 1.5rem;
    border-radius: 2rem;
    height: 3rem;
    width: 10rem;
    border: none;
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
    align-items: center;
    gap: 3rem;
`;
