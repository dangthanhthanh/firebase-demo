import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Row } from "reactstrap"
import Avatar from "../../components/avatar/avatar"
import { AuthContext } from "../../contexts/AuthContext"

export const UpdateProfile=()=>{
    const {currentUser,updateProfile}=useContext(AuthContext)
    const [formValue,setFormValue]=useState({
        displayname:'',
        photoURL:''
    })
    const onchange=(e)=>{
        const{name,value}=e.target;
        setFormValue((pre)=>({...pre,[name]:value}));
        // setFormValue((pre)=>{
        //     return {...pre,[name]:value} 
        // })
    }
    const onChangeImage=(file)=>{
        setFormValue(pre=>({...pre,photoURL:file}))
    }
    const onsubmit=async(e)=>{
        e.preventDefault()
        await updateProfile(formValue.displayname,formValue.photoURL)
    }
    console.log(formValue)
    if(currentUser.displayName && currentUser.photoURL){
        return <Navigate to="/"/>;
    }
    return <Container>
        <Row>
            <Col md={6}>
            <Card>
                <CardBody>
                    <Form onSubmit={onsubmit}>
                        <Avatar onChangeImage={onChangeImage}/>
                        <FormGroup>
                            <Input type="text" 
                            name="displayname" 
                            placeholder="input display name" 
                            onChange={onchange}/>
                        </FormGroup> 
                        <FormGroup>
                                <Button>UPDATE</Button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
            </Col>
        </Row>
    </Container>
}