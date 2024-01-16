import { styled } from "styled-components";
import { useEffect, useState } from "react";

function EmptySpace (props : any){
  return (
    <S.EmptySpace>
          <S.ImageContainer>
            <img width="600px" src="/img/bottle.png" alt="bottle"/>
          </S.ImageContainer>
          <S.MyText>{props.Mytext}</S.MyText>
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
      margin-top: 100px;
    `,
    MyText: styled.p`
      font-size: 40px;
      padding-bottom:20px;
      color: #333;
    `,
    Text: styled.p`
      font-size: 25px;
      padding:10px;
      color: grey;
    `,
};

export default EmptySpace;