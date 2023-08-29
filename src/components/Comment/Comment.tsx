import { styled } from "styled-components";
import Button from "../../contents/Button/Button";
import { useState } from "react";

const data = [
    {
        id: 11351513,
        album_id : 13153153,
        user_id: 'barking_dog',
        mention : 'asjfkl',
        created_at: '2023-07-22T09:12:34Z',
        comment : 'oh good!',
        reply_num : 2,
        reply: [ 
              {
              id: 11351513,
              album_id : 13153153,
              user_id: 'humor1234',
              mention : 'asjfkl',
              created_at: '2023-07-22T09:12:34Z',
              comment : 'LOL',
              reply_num : 2,
              },
              ]
        },
        {
            id: 11351513,
            album_id : 13153153,
            user_id: 'cat_lover',
            mention : 'asjfkl',
            created_at: '2023-07-22T09:12:34Z',
            comment : 'awesome!',
            reply_num : 2,
            reply: [ 
                  {
                  id: 11351513,
                  album_id : 13153153,
                  user_id: 'exuser1',
                  mention : 'asjfkl',
                  created_at: '2023-07-22T09:12:34Z',
                  comment : '잘 보고 갑니다!',
                  reply_num : 2,
                  },
                  ]
            },
            {
                id: 11351513,
                album_id : 13153153,
                user_id: 'sneaker33',
                mention : 'asjfkl',
                created_at: '2023-07-22T09:12:34Z',
                comment : 'nice feed.',
                reply_num : 2,
                reply: [ 
                      {
                      id: 11351513,
                      album_id : 13153153,
                      user_id: 'exuser3',
                      mention : 'asjfkl',
                      created_at: '2023-07-22T09:12:34Z',
                      comment : 'thank you',
                      reply_num : 2,
                      },
                      ]
                },
        {
            id: 11351513,
            album_id : 13153153,
            user_id: 'exuser',
            mention : 'asjfkl',
            created_at: '2023-07-22T09:12:34Z',
            comment : 'awesome!',
            reply_num : 2,
            reply: [ 
                  {
                  id: 11351513,
                  album_id : 13153153,
                  user_id: 'exuser',
                  mention : 'asjfkl',
                  created_at: '2023-07-22T09:12:34Z',
                  comment : '잘 보고 갑니다!',
                  reply_num : 2,
                  },
                  ]
            },
            {
                id: 11351513,
                album_id : 13153153,
                user_id: 'exuser',
                mention : 'asjfkl',
                created_at: '2023-07-22T09:12:34Z',
                comment : 'hellow',
                reply_num : 2,
                reply: [ 
                      {
                      id: 11351513,
                      album_id : 13153153,
                      user_id: 'exuser',
                      mention : 'asjfkl',
                      created_at: '2023-07-22T09:12:34Z',
                      comment : 'hellow',
                      reply_num : 2,
                      },
                      ]
                },
                
        {
            id: 11351513,
            album_id : 13153153,
            user_id: 'exuser',
            mention : 'asjfkl',
            created_at: '2023-07-22T09:12:34Z',
            comment : 'awesome!',
            reply_num : 2,
            reply: [ 
                  {
                  id: 11351513,
                  album_id : 13153153,
                  user_id: 'exuser',
                  mention : 'asjfkl',
                  created_at: '2023-07-22T09:12:34Z',
                  comment : '잘 보고 갑니다!',
                  reply_num : 2,
                  },
                  ]
            },
            {
                id: 11351513,
                album_id : 13153153,
                user_id: 'exuser',
                mention : 'asjfkl',
                created_at: '2023-07-22T09:12:34Z',
                comment : 'hellow',
                reply_num : 2,
                reply: [ 
                      {
                      id: 11351513,
                      album_id : 13153153,
                      user_id: 'exuser',
                      mention : 'asjfkl',
                      created_at: '2023-07-22T09:12:34Z',
                      comment : 'hellow',
                      reply_num : 2,
                      },
                      ]
                },
];

function Comment(){
    const [ment, setMent] = useState('');
    const onMentionClick = (user_id: string) => {
        setMent((prev: string) => `${user_id} ${prev}`);
    }
    return(
        <S.Container>
            <S.Navbar>
                comments
            </S.Navbar>
            <S.CommentContainer>

            {data.map((comment) => (
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
                        comment.reply.map((item) => (
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
            <S.CommentInputDiv>
                <S.Input value={ment} 
                placeholder="댓글 달기..."
                onChange={(e) => setMent(e.target.value)}/>
                <S.SendButton>
                    <Button name='send'/>
                </S.SendButton>
            </S.CommentInputDiv>
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
    CommentInputDiv: styled.div`
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${(props) => props.theme.color.bgColor};
        width: 100%;
        height: 10%;
        border-top: 1px solid ${(props) => props.theme.color.navBorder};
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
    `
}

export default Comment;