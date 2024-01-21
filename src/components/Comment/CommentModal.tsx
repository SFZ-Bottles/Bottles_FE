import { styled } from "styled-components";
import { useEffect, useState } from "react";
import CustomButton from "../Button/CustomButton";
import { getComments, setComments } from "../../services/API";
import { Card } from "../Card/Card";
import RemoveModal from "../Modal/RemoveModal";
import AuthService from "../../utils/authService";
import AlbumApi from "../../services/albumApi";
import { timeAgo } from "../../utils/timeUtils";

export interface IComment {
  made_by: string;
  content: string;
  commentId: string | null;
  mentioned_user_id: string | null;
  parent_comment_id: string | null;
}

function CommentModal({ AlbumId }: { AlbumId: string }) {
  const [ment, setMent] = useState<IComment>({
    made_by: "",
    content: "",
    commentId: "",
    mentioned_user_id: "",
    parent_comment_id: "",
  });
  const [token, myId] = AuthService.getTokenAndId();
  const [data, setData] = useState<any>();

  const [removeModalState, setRemoveModalState] = useState(false);

  const getComment = async () => {
    const result = await getComments(AlbumId);
    console.log(result, "comment");
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

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await setComments(AlbumId, ment);
    getComment();
    setMent({ ...ment, content: "", mentioned_user_id: null, commentId: null });
  };

  const onRemoveButtonClick = () => {
    setRemoveModalState(true);
  };

  const onDeleteClick = (commentId: string) => {
    AlbumApi.deleteComment(commentId, token);
    getComment();
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <S.Container>
      <S.Navbar>
        comments
        <img
          src="/img/selection.svg"
          alt="선택자"
          onClick={onRemoveButtonClick}
        />
        {removeModalState && (
          <RemoveModal
            albumId={AlbumId}
            onClose={() => setRemoveModalState(true)}
          />
        )}
      </S.Navbar>
      <S.CommentContainer>
        {data?.map((comment: any) => (
          <S.CommentDiv>
            <Card>
              <Card.UserProfile src={comment.avatar} />
              <Card.UserId>{comment.user_id}</Card.UserId>
              <CustomButton
                size={5}
                name="reply"
                onClick={() => onReplyClick(comment.user_id, comment.id)}
              />
              <CustomButton
                size={2}
                name="mention"
                onClick={() => onMentionClick(comment.user_id, comment.id)}
              />
              <Card.UserComment>{comment.comment}</Card.UserComment>
              <Card.CreatedTime>{timeAgo(comment.created_at)}</Card.CreatedTime>
              {myId === comment.user_id && (
                <CustomButton
                  name="delete"
                  onClick={() => onDeleteClick(comment.id)}
                />
              )}
            </Card>
            {comment?.reply.length
              ? comment?.reply.map((reply: any) => (
                  <S.ReplyDiv>
                    <Card>
                      <Card.UserProfile src={reply.avatar} />
                      <Card.UserId>{reply.user_id}</Card.UserId>
                      <CustomButton
                        name="mention"
                        onClick={() => onMentionClick(reply.user_id, reply.id)}
                      />
                      <Card.UserComment>{reply.comment}</Card.UserComment>
                      <Card.CreatedTime>
                        {timeAgo(reply.created_at)}
                      </Card.CreatedTime>
                      {myId === reply.user_id && (
                        <CustomButton
                          name="deletes"
                          onClick={() => onDeleteClick(reply.id)}
                        />
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
        <CustomButton name="send" />
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
    width: 100%;
    height: 90px;
    padding-left: 4rem;
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
      padding-bottom: 5%;
    }
  `,
};

export default CommentModal;
