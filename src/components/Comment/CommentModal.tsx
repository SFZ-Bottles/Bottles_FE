import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { getComments, setComments } from "../../services/API";
import { Card } from "../Card/Card";
import RemoveModal from "../Modal/RemoveModal";
import AuthService from "../../utils/authService";
import AlbumApi from "../../services/albumApi";
import { timeAgo } from "../../utils/timeUtils";
import { ReactComponent as Selection } from "../../assets/selection.svg";
import { Button } from "../Button/Button";

export interface IComment {
  made_by: string;
  content: string;
  commentId: string | null;
  mentioned_user_id: string | null;
  parent_comment_id: string | null;
}

function CommentModal({ AlbumId, owner }: { AlbumId: string; owner: string }) {
  const [ment, setMent] = useState<IComment>({
    made_by: "",
    content: "",
    commentId: "",
    mentioned_user_id: "",
    parent_comment_id: "",
  });
  const [, myId] = AuthService.getTokenAndId();
  const [data, setData] = useState<any>();

  const [removeModalState, setRemoveModalState] = useState(false);

  const getComment = async () => {
    const result = await getComments(AlbumId);
    setData(result.result);
  };

  const onMentionClick = (user_id: string, commentId: string) => {
    setMent({
      ...ment,
      content: `@${user_id} ` + ment.content,
      mentioned_user_id: user_id,
    });
  };

  const onReplyClick = (user_id: string, commentId: string) => {
    setMent({
      ...ment,
      content: `@${user_id} ` + ment.content,
      mentioned_user_id: user_id,
      commentId,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await setComments(AlbumId, ment);
      getComment();
      setMent({
        ...ment,
        content: "",
        mentioned_user_id: null,
        commentId: null,
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  const onRemoveButtonClick = () => {
    setRemoveModalState(true);
  };

  const onDeleteClick = async (commentId: string) => {
    try {
      await AlbumApi.deleteComment(commentId);
      await getComment();
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <S.Container>
      <S.Navbar>
        comments
        {owner === myId && <S.StyledSelection onClick={onRemoveButtonClick} />}
        {removeModalState && (
          <RemoveModal
            albumId={AlbumId}
            onClose={() => setRemoveModalState(false)}
          />
        )}
      </S.Navbar>
      <S.CommentContainer>
        {data?.map((comment: any) => (
          <S.CommentDiv key={comment.id}>
            <Card>
              <Card.UserProfile src={comment.avatar} />
              <Card.UserId>{comment.user_id}</Card.UserId>
              <Button
                variant="outlined"
                onClick={() => onReplyClick(comment.user_id, comment.id)}
              >
                reply
              </Button>
              <Button
                variant="outlined"
                onClick={() => onMentionClick(comment.user_id, comment.id)}
              >
                mention
              </Button>
              <Card.UserComment>{comment.comment}</Card.UserComment>
              <Card.CreatedTime>{timeAgo(comment.created_at)}</Card.CreatedTime>
              {myId === comment.user_id && (
                <Button
                  variant="outlined"
                  onClick={() => onDeleteClick(comment.id)}
                >
                  delete
                </Button>
              )}
            </Card>
            {comment?.reply.length
              ? comment?.reply.map((reply: any) => (
                  <S.ReplyDiv key={reply.id}>
                    <Card>
                      <Card.UserProfile src={reply.avatar} />
                      <Card.UserId>{reply.user_id}</Card.UserId>
                      <Button
                        variant="outlined"
                        onClick={() => onMentionClick(reply.user_id, reply.id)}
                      >
                        mention
                      </Button>
                      <Card.UserComment>{reply.comment}</Card.UserComment>
                      <Card.CreatedTime>
                        {timeAgo(reply.created_at)}
                      </Card.CreatedTime>
                      {myId === reply.user_id && (
                        <Button
                          onClick={() => onDeleteClick(reply.id)}
                          variant="outlined"
                        >
                          delete
                        </Button>
                      )}
                    </Card>
                  </S.ReplyDiv>
                ))
              : null}
          </S.CommentDiv>
        ))}
      </S.CommentContainer>
      <S.Form onSubmit={onSubmit}>
        <S.Input
          value={ment.content}
          placeholder="댓글 달기..."
          onChange={(e) => setMent({ ...ment, content: e.target.value })}
        />
        <Button variant="outlined">send</Button>
      </S.Form>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.color.bgColor};
    font-size: 2rem;
    flex-direction: column;

    button {
      font-size: 1rem;
    }
  `,
  CommentContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 80%;
    overflow: auto;
    overflow-x: hidden;
    padding: 10px;
    gap: 20px;
    &::-webkit-scrollbar {
      width: 0.7rem;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background: ${(props) => props.theme.color.barColor};
    }
  `,
  Navbar: styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 10%;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.color.fontColor};
    border-bottom: 2px solid ${(props) => props.theme.color.navBorder};
  `,
  CommentDiv: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  ReplyDiv: styled.div`
    display: flex;
    align-items: center;
    padding-left: 3rem;
    padding-top: 10px;
  `,
  Input: styled.input`
    width: 80%;
    padding-left: 1rem;
    padding-right: 3rem;
    height: 60%;
    border: 1px solid black;
    border-radius: 2rem;
    background-color: ${(props) => props.theme.color.bgColor};
  `,
  Form: styled.form`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.color.bgColor};
    width: 100%;
    height: 10%;
    border-top: 1px solid ${(props) => props.theme.color.navBorder};

    & > button {
      position: absolute;
      right: 17%;
    }
  `,
  NavWrapper: styled.div`
    display: flex;
  `,
  StyledSelection: styled(Selection)`
    fill: ${(props) => props.theme.fontColor};
    position: absolute;
    right: 10px;
  `,
};

export default CommentModal;
