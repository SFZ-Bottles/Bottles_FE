import { useEffect } from "react";
import { getAlbum } from "../../services/API";

function FeedPage(){
    const initialFeed = async () => {
        const id = 'gg';
        const token = localStorage.getItem('token');
        // await getAlbum(id, token);
    };

    useEffect(() => {
        
    },[]);
    return(
        <div>
            
        </div>
    )
}

export default FeedPage;