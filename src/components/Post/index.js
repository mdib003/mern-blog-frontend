import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import "./post.css";
import { Loading } from "../Loading"

export const Post = () => {

    const [postsList, setPostsList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/v1/api/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then(d => {
            setPostsList(d.postsList)
            setLoading(false)
        });
    }, [])

    return (
        <div className="container post-page">
            {loading ? <Loading /> :
                <>
                    {
                        postsList?.length > 0 && postsList.map((post, i) => {
                            const date = new Date(post.updatedAt);
                            return (
                                <div className="flex post-container" key={i}>
                                    {/*   <div className="img-post">
                                <img src='download.png' alt='react'></img>
                            </div> */}
                                    <div>
                                        <h3 className="mar-b-4">{post?.title}</h3>
                                        <p className="mar-b-4">{post.summary}</p>
                                        <div className="mar-b-4 author-title"><span>{post.author}</span> | <span>{date.getDate()} - {date.getMonth() + 1} - {date.getFullYear()}</span></div>
                                        <Link className="read-more-btn" to={`post/${post._id}`}>Read more</Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </>
            }
        </div>
    )
}