import { useState } from "react";
import { styled } from "styled-components";
import Comment from "../../components/Comment/Comment";

function CommentModal() {
    return(
        <Comment/>
    );
}

const S = {
    Container: styled.div`
        display: flex;
    `,
    CommentConatiner: styled.div`
        width: 100%;
        height: 800px;
    `,
    CommentContainer: styled.div`
        display:flex;
        min-width: 600px;  

    `,
}

export default CommentModal;