import { styled } from "styled-components";
import CustomButton from "../../components/Button/CustomButton";
import { getAvatar, getChatList, makeChatRoom } from "../../services/API";
import { useState } from "react";

function TestPage() {
  const [url, setUrl] = useState();

  let id: any = localStorage.getItem("id");
  const btnClick = async () => {
    const response = await getChatList(id);
    console.log(response);
  };
  const btnClick2 = async () => {};

  const btnClick3 = async () => {
    // const response = await getAvatar('test1234');
    // const imageBlob = response.blob();
    // const reader = new FileReader();
    // reader.onload = () => {
    // setUrl(response);
    // };
    // reader.readAsDataURL(imageBlob);
    // return response;
  };

  return (
    <div style={{ marginTop: "10rem", width: "100%" }}>
      <CustomButton name="채팅방 확인" onClick={btnClick} />
      <CustomButton name="채팅방 생성" onClick={btnClick2} />
      <CustomButton name="아바타" onClick={btnClick3} />
      {url && <img src={url} alt="zmzm" />}
    </div>
  );
}

export default TestPage;
