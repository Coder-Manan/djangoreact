// show blogs here and add them here only
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {getBlogs, allBlogs} from '../../services/django/getblogs';
import axios from 'axios';
import tryLogin from '../../services/django/login';
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

const HomePage = () => {
    const [blogs, setBlogs] = useState([]);
    const username = getCookie('username');
    const password = getCookie('password');
    const [check, setCheck] = useState(false);
    tryLogin(username, password).then((status)=>{setCheck(status);console.log(check)});
    // tryLogin(username, password).then((status)=>{setCheck(status);console.log(check)});
    // if (check!==true){
    //     alert("You are not logged in");
    //     document.location = '/';
    //     return;
    // }
    useEffect(()=>{
        fetch('http://localhost:8000/getblogs/', {
        })
        .then((response) => response.json())
        .then((data)=>{
            setBlogs(data);
        });
    },[]);
    return(
        <div>
            <h1>Home Page</h1>
            <button onClick={async()=>{
                document.cookie=`username=${null};secure`;
                document.cookie=`password=${null};secure`;
                document.location = '/';
            }}>Logout</button>
            <div id='blogs'>{blogs.map((blog)=>{
                return(
                    <div key={blog['pk']}>
                        <h2>{blog['fields']['title']}</h2>
                        <p>{blog['fields']['content']}</p>
                    </div>
                )
            })}</div>
            <div id="new">
                <h2>New Blog</h2><br></br>
                <input type="text" id="new-title" placeholder="Title"></input><br></br>
                <input type="text" id="newcontent" placeholder="Content"></input><br></br>
                <button onClick={async()=>{
                    const title = document.getElementById('new-title').value;
                    const content = document.getElementById('newcontent').value;
                    const response = await axios.post('http://localhost:8000/add/', {
                        "name": getCookie('username'),
                        "title": title,
                        "content": content,
                        "username": getCookie('username'),
                        "password": getCookie('password')
                    });
                    console.log(response);
                    if (response['data'] === 'Blog added successfully') {
                        alert("Blog added");
                        window.location.reload();
                    }
                    else {
                        alert("Error...\nBlog not added\nTry logging out and in if issue persists");
                    }
                }}>Add</button>
            </div>
        </div>
    )
}

export default HomePage;

    // console.log(r);
    // const cookies = document.cookie.split(';');
    // console.log(cookies);
    // if (cookies.length !== 2) {
    //     alert("Some error has occured, please login again");
    //     document.location = '/';
    //     return;
    // }
    // const c1 = cookies[0].split('=');
    // const c2 = cookies[1].split('=');
    // console.log(c1, c2);
    // let response = {};
    // if (c1[0] === 'username' && c2[0] === ' password') {
    //     response = await fetch('http://localhost:8000/getblogs/', {
    //         method: 'GET',
    //         // headers: {'Content-Type': 'application/json'},
    //         // body: JSON.stringify({
    //         //     "username": c1[1],
    //         //     "password": c2[1]
    //         // }),
    //     }).then((response) => console.log(response));
    // }
    // else if (c1[0] === 'password' && c2[0] === ' username') {

    //     response = await fetch('http://localhost:8000/getblogs/', {
    //         method: 'GET',
    //         // headers: {'Content-Type': 'application/json'},
    //         // body: JSON.stringify({
    //         //     "username": c2[1],
    //         //     "password": c1[1]
    //         // }),
    //     }).then(console.log(response));
    // }
    // else {
    //     alert("Some error has occured, please login again");
    //     document.location = '/';
    //     navigate('/');
    //     return;
    // }
    // const response = await getBlogs();
    // console.log(response);
    // useEffect(() => {
    //     const response = await fetch('http://localhost:8000/getblogs/', {});
    // });
            // fetch('http://localhost:8000/getblogs/', {}).then((response) => response.json()).then((data) => {
        // console.log(data);
        // let a = ""
        // data.forEach(element => {
        //     a += `<div><h1>${element['fields']['title']}</h1><br>${element['fields']['content']}</div>`
        // });
        // document.getElementById('blogs').innerHTML = a;
        // if (document.getElementById('blogs').innerHTML !== ""){data.forEach(element => {
        //     document.getElementById('blogs').innerHTML += `${element['pk']}`
        // });}