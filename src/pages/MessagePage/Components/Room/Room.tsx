import { ProfileProps } from "../..";
import { useEffect, useState } from "react";
import { filterChatList } from "../../../../utils/messageUtils";
import { styled } from "styled-components";
import MessageBox from "./MessageBox/MessageBox";
import ChatBox from "./ChatBox/ChatBox";

interface RoomProps {
  roomList: ProfileProps[];
  targetId: string;
}

function Room({ roomList, targetId }: RoomProps) {
  const [roomInfo, setRoomInfo] = useState<ProfileProps[]>();
  console.log(roomList, targetId);

  useEffect(() => {
    const filteredList = filterChatList(roomList, targetId);
    setRoomInfo(filteredList);
  }, [targetId, roomList]);

  return (
    <div style={{ paddingLeft: "470px" }}>
      {roomInfo && (
        <S.ContentContainer>
          <MessageBox chatInfo={roomInfo[0]} />
          {roomInfo[0] && <ChatBox roomId={roomInfo[0].id} />}
        </S.ContentContainer>
      )}
    </div>
  );
}

const S = {
  UserContainer: styled.div`
    display: flex;
  `,

  ContentContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 20px;
    border-color: ${(props) => props.theme.color.chatBorder};
  `,
};

export default Room;
