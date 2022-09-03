// show blogs here and add them here only
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {getBlogs, allBlogs} from '../../services/django/getblogs';
import axios from 'axios';
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

const HomePage = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:8000/getblogs/', {})
        .then((response) => response.json())
        .then((data)=>{
            setBlogs(data);
        });
    },[]);
    return(
        <div>
            <h1>Home Page</h1>
            <div id='blogs'>{blogs.map((blog)=>{
                return(
                    <div key={blog['pk']}>
                        <h2>{blog['fields']['title']}</h2>
                        <p>{blog['fields']['content']}</p>
                    </div>
                )
            })}</div>
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