import { styled } from "styled-components";
import { useEffect, useState } from "react";
import CustomButton from "../Button/CustomButton";
import { getComments, setComments } from "../../services/API";
import { Card } from "./Comment";

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

  const [data, setData] = useState<any>();

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

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await setComments(AlbumId, ment);
    getComment();
    setMent({ ...ment, content: "", mentioned_user_id: null, commentId: null });
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <S.Container>
      <S.Navbar>comments</S.Navbar>
      <S.CommentContainer>
        {data?.map((comment: any) => (
          <S.CommentDiv>
            <Card>
              <Card.UserProfile src={comment.avatar} />
              <Card.UserId>{comment.user_id}</Card.UserId>
              <CustomButton
                name="reply"
                onClick={() => onReplyClick(comment.user_id, comment.id)}
              />
              <CustomButton
                name="mention"
                onClick={() => onMentionClick(comment.user_id, comment.id)}
              />
              <Card.UserComment>{comment.comment}</Card.UserComment>
              <Card.CreatedTime>{comment.created_at}</Card.CreatedTime>
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
                      <Card.CreatedTime>{reply.created_at}</Card.CreatedTime>
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
      right: 13%;
      padding-bottom: 5%;
    }
  `,
};

export default CommentModal;
