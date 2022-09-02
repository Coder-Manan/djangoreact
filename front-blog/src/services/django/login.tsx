async function tryLogin(username:String, password:String) {
    const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "username": username,
            "password": password
        }),
    }
    );
    const data = await response.json();
    if (data['status'] === 'loggedin') {
        return true;
    } else {
        return false;
    }
}

export default tryLogin;