import axios from "axios";
import React, { useState } from "react"



function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

const Fields = (props) => {
    const [showfields, setShowfields] = useState('hidden');
    const [showbutton, setShowbutton] = useState('visible');
    const [newtitle, setNewtitle] = useState('');
    const [newcontent, setNewcontent] = useState('');

    function toggle(){
        if (showfields === 'hidden'){
            setShowfields('visible');
            setShowbutton('hidden');
        }
        else{
            setShowfields('hidden');
            setShowbutton('visible');
        }
    }

        return (<div id={props.pk + "-update-fields"}>
            <div id={props.pk + "btn"} style={{'visibility':showbutton}}>
                <button onClick={()=>{
                    toggle()
                }}>Update</button>
            </div>
        <div id={props.pk + "-update-fields"} style={{'visibility':showfields}}> {/* start from here */}
            <button onClick={async()=>{
                                        const response = await axios.post('http://localhost:8000/update/', {
                                            "pk": props.pk.toString(),
                                            "username": getCookie('username'),
                                            "password": getCookie('password'),
                                            "title": newtitle,
                                            "content": newcontent
                                        })
                                        if (response.status === 200){
                                            alert("Blog updated successfully");
                                            document.location = '/main';
                                        } else {
                                        alert("Oops.. Some issue...\n"+response.data);
                                        }
                                    }}>
                                        Confirm
                                    </button>
            <button id = {props.pk + "-update-cancel"} style={{'visibility':showfields}} onClick={()=>toggle()}>
                Cancel
            </button>
            <input type="text" id={props.pk.toString() + "-update-title"} placeholder="Title" onChange={(event)=>{setNewtitle(event.target.value)}}></input><br></br>
            <input type="text" id={props.pk.toString() + "-update-content"} placeholder="Content" onChange={(event)=>{setNewcontent(event.target.value)}}></input><br></br>
        </div>
        </div>  ) 
    
}



export default Fields;
// setBlogs([...blogs, JSON.parse('{"pk":' + response.data.pk + ',"fields":{"title":"' + title + '","content":"' + content + '"}}')]);