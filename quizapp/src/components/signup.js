import React, {useState} from 'react'
import axios from 'axios'
function SignUp() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [name, setName] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try
        {
            const res = await axios.post('http://localhost:5000/signup',{email,password, name});
                console.log(res.data);
                alert('User registered successfully')
        }
        catch (err){
            console.error(err.response.data)
            alert('Error during signup')

        }
    }

  return (
    <>
<div className="d-flex justify-content-center align-items-center vh-100">

  <div className="col-6 border p-4 shadow rounded-3">
    <h1 className='text-center'>Sign Up</h1>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter your full name"
        />
      </div>
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
          SignUp
        </button>
      </div>
    </form>
  </div>
</div>


   </>
   
  )
}

export default SignUp

