import { styled } from "styled-components";
import { useEffect, useState } from "react";
import Button from "../Button/CustomButton";
import { getComments, setComments } from "../../services/API";

function CommentModal({AlbumId}: {AlbumId: string}){
    const [ment, setMent] = useState('');
    const [data, setData] = useState<any>();

    const getComment = async () => {
        const result = await getComments(AlbumId);
        setData(result.result);
    };

    const onMentionClick = (user_id: string) => {
        setMent((prev: string) => `${user_id} ${prev}`);
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const result = await setComments(AlbumId,ment);
        getComment();
        setMent('');
    }

    useEffect(() => {
        getComment();
    },[]);
    return(
        <S.Container>
            <S.Navbar>
                comments
            </S.Navbar>
            <S.CommentContainer>

            {data?.map((comment: any) => (
                <S.CommentDiv>
                    <S.OriginalComment>
                        <S.UserProfile/>
                        <S.UserInfo>
                            <S.UserTitle>
                                {comment.user_id}
                                <Button name='reply'/>
                                <Button name='mention'
                                onClick={() => onMentionClick(comment.user_id)}/>
                            </S.UserTitle>
                            {comment.comment}
                            <S.CommentTime>
                                {comment.created_at}
                            </S.CommentTime>
                        </S.UserInfo>
                    </S.OriginalComment>
                    {comment?.reply.length ? 
                        comment?.reply.map((item: any) => (
                        <S.ReplyDiv>
                            <S.UserProfile/>
                            <S.UserInfo>
                                <S.UserTitle>
                                    {item?.user_id}
                                    <Button name='mention'
                                    onClick={() => onMentionClick(item.user_id)}/>
                                </S.UserTitle>
                                {item.comment}
                                <S.CommentTime>
                                    {comment.created_at}
                                </S.CommentTime>
                            </S.UserInfo>
                        </S.ReplyDiv>
                        ))
                    : 
                    null
                    }
                </S.CommentDiv>
            ))}
            </S.CommentContainer>
                <S.Form onSubmit={onSubmit}>
                    <S.Input value={ment} 
                    placeholder="댓글 달기..."
                    onChange={(e) => setMent(e.target.value)}/>
                    <S.SendButton>
                        <Button name='send'/>
                    </S.SendButton>
                </S.Form>
        </S.Container>
    )
}

const S = {
    Container: styled.div`
        display: flex;
        width: 100%;
        height: 100%;
        background-color: ${(props) => props.theme.color.bgColor};
        font-size: 2rem;
        flex-direction: column;
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
    `
    ,
    CommentDiv: styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;
    `,
    OriginalComment: styled.div`
        display:flex;
        align-items: center;
        width: 100%;
        height: 90px;
        padding-left: 1rem;
    `,
    ReplyDiv: styled.div`
        display: flex;
        align-items: center;
        width: 70%;
        height: 90px;
        padding-left: 4rem;
    `,
    UserProfile: styled.div`
        width: 55px;
        height: 55px;
        border-radius: 3rem;
        background-color: #D9D9D9;
    `,
    UserInfo: styled.div`
        display: flex;
        padding-left: 1rem;
        flex-direction: column;
        color: black;
        font-size: 1rem;
        font-weight: 700;
    `,
    CommentTime: styled.div`
        display: flex;
        color: gray;
        font-size: 0.8rem;
    `,
    UserTitle: styled.div`
        color: ${(props) => props.theme.color.fontColor};
        font-size: 1.2rem;
    `,
    Input: styled.input`
        width: 80%;
        padding-left: 1rem;
        height: 60%;
        border: 1px solid black;
        border-radius: 2rem;
        background-color: ${(props) => props.theme.color.bgColor};
    `,
    SendButton: styled.div`
        position: absolute;
        right: 13%;
        padding-bottom: 3%;
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
    
    `,
}

export default CommentModal;