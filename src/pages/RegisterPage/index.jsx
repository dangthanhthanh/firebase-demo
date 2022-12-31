import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import errorMessage from "../../assets/common/erroMessage";
import { AuthContext } from "../../contexts/AuthContext";

const RegisterPage = () => {
  const {register}=useContext(AuthContext)
  const [error,setError]=useState('')
  const [fromvalue,setFromvalue]=useState({
    email:'',
    password:'',
    passwordConfirmation:''
  })
  const onChange =(e)=>{
    const {name,value}=e.target
    setFromvalue((prev)=>({...prev,[name]:value}))//[name]:value thay cho cach viet {name:value}
    console.log(name,value)
  }
  const onSubmit=async(e)=>{
    e.preventDefault();
    console.log(fromvalue);

    const {password,passwordConfirmation,email}=fromvalue;
    if(error){setError('')}
    if(password !== passwordConfirmation){
      setError('password confimation not match')
      console.log('password confimation not match')
      return
    }
    try {
      await register(email,password)
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
            onChange={onChange}
            type="password"
          />
          <Label for="password">Password</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            id="password-confirmation"
            autoComplete="current-password"
            name="passwordConfirmation"
            placeholder="Password confirmation"
            onChange={onChange}
            type="password"
          />
          <Label for="password-confirmation">Password confirmation</Label>
        </FormGroup>{" "}
        <Button block color="primary">
          Register
        </Button>
      </Form>
      <div className="mt-2 text-center">
        Have already an account? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
