import { styled } from "styled-components";
import { useEffect, useState } from "react";

interface EmptyProps {
  title: string
  text: string
}

function EmptySpace (props : EmptyProps){
  return (
    <S.EmptySpace>
          <S.ImageContainer>
            <img width="600px" src="/img/bottle.png" alt="bottle"/>
          </S.ImageContainer>
          <S.MyText>{props.title}</S.MyText>
          <S.Text>{props.text}</S.Text>
          </S.EmptySpace>
  );
}

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
  `,
  EmptySpace: styled.div`
    text-align: center;
    padding: 20px;
    `,
    ImageContainer: styled.div`
    text-align: center;
    margin-top: 100px;
    margin-left: 350px;
    `,
    MyText: styled.p`
    font-size: 40px;
    margin-top:20px;
    padding-left:350px;
    padding-bottom:20px;
    color: #333;
    `,
    Text: styled.p`
    font-size: 25px;
    padding-left:350px;
    padding-bottom:10px;
    color: grey;
    `,
};

export default EmptySpace;
