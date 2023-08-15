import React from 'react'; 
import { GoogleLogin } from '@react-oauth/google'; 
import jwt_decode from 'jwt-decode';  

function Login({ setUser }) { 
    // Handle successful Google login
    const onSuccess = (res) => { 
        var tokenData = jwt_decode(res.credential);
        var loginData = {
            googleId: tokenData.sub,
            ...tokenData
        }
        setUser(loginData); 

        // Store the login data in local storage
        localStorage.setItem("login", JSON.stringify(loginData));  
        console.log('Login Success: currentUser:', loginData);
    };
       
    // Handle failed Google login
    const onFailure = (res) => { 
        console.log('Login failed: res:', res);
    }

    return ( 
        <div> 
            <GoogleLogin
                id='login' 
                buttonText="Login" 
                onSuccess={onSuccess} 
                onFailure={onFailure} 
                cookiePolicy={'single_host_origin'}
            style={{ marginTop: '100px' }}
                isSignedIn={true} 
                auto_select={true}
            /> 
        </div>
    );
}

export default Login;
