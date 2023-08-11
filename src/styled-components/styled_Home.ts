import styled from "styled-components";

export const ChoiceBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    font-size: 2rem;
    padding-bottom: 3rem;
    border-bottom: 3px dashed black;
`;

export const TemplateContainer = styled.div`
    display: flex;
    gap: 30px;
    padding-top: 30px;
`;

export const Template = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 150px;
    border: 2px solid black;
    position: relative;
`;

export const Phrase = styled.div`
    font-size: 2rem;
`;

export const ModalContainer = styled.div`
    display: grid;
    min-width: 400px;
    min-height: 400px;
`;

export const ModalImgDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;