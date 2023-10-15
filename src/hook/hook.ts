export function getTokenId(){
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    return [token, id];
}

