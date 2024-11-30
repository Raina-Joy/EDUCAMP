import React, {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

function Login() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try
        {
            const res = await axios.post('http://localhost:5000/login',{email,password});
                console.log( res.data);
                alert('Login Success');
                localStorage.setItem('accessToken', res.data.accessToken);
                localStorage.setItem('refreshToken', res.data.refreshToken);
                localStorage.setItem('name', res.data.name);

                navigate('/dashboard');
            }
        catch (err){
            console.error(err.response.data)
            alert('Error during login')

        }
    }
    const handleGoogleLogin = (response) => {
        if (response.credential) {
            // If we have a credential from Google login (OAuth success)
            navigate('/dashboard');
        } else {
            // This step starts the OAuth process
            window.location.href = 'http://localhost:5000/auth/google';  // Redirect to your backend
        }
    };
    
    
    
    
  return (
    <>
<div className="d-flex justify-content-center align-items-center vh-100">
  <div className="col-6 border p-4 shadow rounded-3">
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required
          placeholder="email"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
      </div>
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </div>
      
      <div className="mt-3 text-center">
      <Link to="/signup" className="btn btn-primary">
      Create An account
                </Link>

                <div className="mt-3 text-center">
                        <GoogleLogin 
                            onSuccess={handleGoogleLogin} 
                            onError={() => alert('Google Login Failed')}
                        />
                    </div>
          
        
      </div>
    </form>
  </div>
</div>


   </>
  )
}

export default Login
