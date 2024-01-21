import { styled } from "styled-components";
import AlbumApi from "../../services/albumApi";
import Modal from "./Modal";
import AuthService from "../../utils/authService";

function RemoveModal({
  albumId,
  onClose,
}: {
  albumId: string;
  onClose: () => void;
}) {
  const onClick = () => {
    const [token] = AuthService.getTokenAndId();
    AlbumApi.deleteAlbum(albumId, token);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <button onClick={onClick}>삭제 버튼</button>
    </Modal>
  );
}

const S = {
  Container: styled.div`
    width: 20rem;
    height: 8rem;
  `,
};

export default RemoveModal;
