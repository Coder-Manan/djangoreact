import React from "react";
import { useState } from "react";

const Blog = (props) => {
    const [pk, setPk] = useState(props.pk);
    const [title, setTitle] = useState(props.title);
    const [content, setContent] = useState(props.content); 

    function onUpdate(newTitle, newContent){
        setTitle(newTitle);
        setContent(newContent);
    }

    return (
        <div id={pk.toString() + "data"}>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
}



export {Blog};