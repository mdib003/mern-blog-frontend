import { useEffect, useState, useContext } from "react";
import { BlogContext } from "../../App"
import "./post.css";
import { Loading } from "../Loading"

export const Post = () => {

    const {appValues}  = useContext(BlogContext)    

    return (
        <div className="container post-page">

            {
                appValues.postsList?.length > 0 && appValues?.postsList.map((post, i) => {
                    const date = new Date(post.updatedAt);
                    console.log(date)
                    return (
                        <div className="flex post-container" key={i}>
                            {/*   <div className="img-post">
                                <img src='download.png' alt='react'></img>
                            </div> */}
                            <div>
                                <h3 className="mar-b-4">{post?.title}</h3>
                                <p className="mar-b-4">{post.summary}</p>
                                <div className="mar-b-4 author-title"><span>{post.author}</span> - <span>{date.getDay()} - {date.getMonth()} - {date.getFullYear()}</span></div>
                                <button className="read-more-btn">Read more</button>
                            </div>
                        </div>
                    )
                })
            }

            { /* <div className="flex post-container">
                <div className="img-post">
                    <img src='download.png' alt='react'></img>
                </div>
                <div>
                    <h3 className="mar-b-4">How React Works</h3>
                    <p className="mar-b-4">fsfsdfsdfsdfsfs</p>
                    <div className="mar-b-4"><span>1 day ago</span></div>
                    <button className="read-more-btn">Read more</button>
                </div>
            </div>
            <div className="flex post-container">
                <div className="img-post">
                    <img src='download.png' alt='react'></img>
                </div>
                <div>
                    <h3 className="mar-b-4">How React Works</h3>
                    <p className="mar-b-4">dfsfsdfsdfsdfsfererewr</p>
                    <div className="mar-b-4"><span>1 day ago</span></div>
                    <button className="read-more-btn">Read more</button>
                </div>
            </div> */}
        </div>
    )
}