import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import errorMessage from "../../assets/common/erroMessage";
import { AuthContext } from "../../contexts/AuthContext";

const LoginPage = () => {
  const {login}=useContext(AuthContext)
  const [error,setError]=useState('')
  const [fromvalue,setFromvalue]=useState({
    email:'',
    password:''
  })
  const onChange =(e)=>{
    const {name,value}=e.target
    setFromvalue((prev)=>({...prev,[name]:value}))//[name]:value thay cho cach viet {name:value}
    console.log(name,value)
  }
  const onSubmit=async(e)=>{
    e.preventDefault();
    console.log(fromvalue);

    const {password,email}=fromvalue;
    if(error){setError('')}
    try {
      await login(null,email,password);
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode);
      setError(errorMessage(errorCode));
    }
  }
  return (
    <div>
      <Form onSubmit={onSubmit}>
        {error?<Alert color="danger">{error}</Alert>:null}
        <FormGroup floating>
          <Input
            id="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            type="email"
            onChange={onChange}
          />
          <Label for="email">Email</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            id="password"
            autoComplete="current-password"
            name="password"
            placeholder="Password"
            type="password"
            onChange={onChange}
          />
          <Label for="password">Password</Label>
        </FormGroup>{" "}
        <Button block color="primary">
          Login
        </Button>
      </Form>
      <div className="mt-2 text-center">
        <Link to="/register">Create an account?</Link>
      </div>
    </div>
  );
};

export default LoginPage;
