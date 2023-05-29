import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const PostDetail = () => {

    const location = useLocation()
    const [postDocState, setPostDocState] = useState({})

     useEffect(() => {
        const postId = location.pathname.trim().split('/')        
        fetch(`/posts/${postId[2]}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(r => setPostDocState(r.postDoc))
    }, []) 

    return (
        <div>
            <h2>{postDocState.title}</h2>
        </div>
    )
}