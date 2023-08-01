export const isValidInput = (len: number, maxLen: number) => {
    return len <= maxLen;
};

export const TOKEN = localStorage.getItem('token');

export const checkToken = ({navigate}: any) => {
    if(TOKEN){
        navigate("/home");
    }
};