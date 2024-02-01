import { styled } from "styled-components";
import AlbumApi from "../../services/albumApi";
import Modal from "./Modal";
import { FlexColumnCenterCSS } from "../../style/commonStyle";
import { Button } from "../Button/Button";

function RemoveModal({
  albumId,
  onClose,
}: {
  albumId: string;
  onClose: () => void;
}) {
  const onClick = () => {
    AlbumApi.deleteAlbum(albumId);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <S.Container>
        <img src="/img/garbage.svg" alt="아이콘" />
        <span>게시글을 삭제하시겠습니까?</span>
        <S.ButtonWrapper>
          <Button onClick={onClick} skin="red" round="very" size="standard">
            삭제
          </Button>
          <Button onClick={onClose} skin="gray" round="very" size="standard">
            취소
          </Button>
        </S.ButtonWrapper>
      </S.Container>
    </Modal>
  );
}

const S = {
  Container: styled.div`
    ${FlexColumnCenterCSS}
    width: 20rem;
    font-size: 1.5rem;
    font-weight: 700;
    background-color: ${(props) => props.theme.bgColor};
    gap: 20px;
    & > span {
      color: ${(props) => props.theme.fontColor};
    }
  `,
  ButtonWrapper: styled.div`
    display: flex;
    gap: 20px;
  `,
};

export default RemoveModal;
