import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';

const SignUp = (props) => {
  const [username,setUserName]=useState("")
  const [email,setEmail]=useState("")
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const [age,setAge]=useState(0)
  const [gender,setGender]=useState("")
  const [password,setPassword]=useState("")
  const [passwordConfirmation,setPasswordConfirmation]=useState("")
  let navigate = useNavigate();

  const formhandler=(e)=>{
    e.preventDefault() 
    if(password != passwordConfirmation)
    {
      console.log("password did not match to each other")
      return 0
    }if(age<=0)
    {
      console.log("Age is to small ")
      return 0
    }
    const user={
      email,
      first_name: firstName,
      last_name: lastName,
      username,
      age,
      gender,
      password,
      password_confirmation: passwordConfirmation
    }
    axios.post(`http://localhost:3000/users`,{user})
      .then(res => {
        console.log(res)
        navigate("/signin")

      }).catch(
        (err)=>{
          console.log(err)
        }
      )
  }
  return (
    <div className="">
      <div class="card container my-5 bg-info bg-opacity-25 ">
        <h5 class="card-header bg-info d-flex justify-content-center text-white">Sing Up</h5>
        <div className="container">
          <form onSubmit={formhandler}>
            <div className="mb-3 m-2">
              <label htmlFor="exampleInputEmail1 " className="form-label text-dark">
                User Name
              </label>
              <input
                type="text"
                required
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e)=>setUserName(e.target.value)}
              />
            </div>
            <div className="mb-3 m-2"> 
              <label htmlFor="exampleInputEmail1" className="form-label text-dark">
                Email address
              </label>
              <input
                type="email"
                required
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e)=>setEmail(e.target.value)}

              />
              <div id="emailHelp" class="form-text ">
                Please enter the Valid email it will verify for further steps !!
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label text-dark">
                first_name
              </label>
              <input
                type="text"
                required

                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e)=>setFirstName(e.target.value)}

              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label text-dark">
                last_name
              </label>
              <input
                type="text"
                required

                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e)=>setLastName(e.target.value)}

              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label text-dark">
                Age
              </label>
              <input
                type="number"
                required

                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e)=>setAge(e.target.value)}

              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label text-dark">
                gender
              </label>
              <input
                type="text"
                required

                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e)=>setGender(e.target.value)}

              />
            </div>
            
            <div className="mb-3 m-2">
              <label htmlFor="exampleInputPassword1" className="form-label text-dark">
                Password
              </label>
              <input
                type="password"
                required
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e)=>setPassword(e.target.value)}

              />
            </div>
            <div className="mb-3 m-2">
              <label htmlFor="exampleInputPassword1" className="form-label text-dark">
                Password confirmation
              </label>
              <input
                type="password"
                required
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e)=>setPasswordConfirmation(e.target.value)}

              />
            </div>
            <div className="d-flex m-3 justify-content-center">
              <button type="submit" className="btn btn-primary mx-1 ">
                Submit
              </button>
              <Link to="/">
                <button className="btn btn-primary ">Home</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;