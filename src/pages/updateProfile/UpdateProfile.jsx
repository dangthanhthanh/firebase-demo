import { useContext, useState } from "react"
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Row } from "reactstrap"
import Avatar from "../../components/avatar/avatar"
import { AuthContext } from "../../contexts/AuthContext"

export const UpdateProfile=()=>{
    const {updateProfile}=useContext(AuthContext)
    const [formValue,setFormValue]=useState({
        displayname:'',
        photoURL:''
    })
    const onchange=(e)=>{
        console.log(e)
        const{name,value}=e.target;
        console.log(name,value)
        setFormValue((pre)=>({...pre,[name]:value}));
        setFormValue((pre)=>{
            return {...pre,[name]:value} 
        })
    }
    const onsubmit=async(e)=>{
        e.prevenDefault()
        await updateProfile(formValue.displayname,formValue.photoURL)
        
    }
    return <Container>
        <Row>
            <Col md={6}>
            <Card>
                <CardBody>
                    <Form onSubmit={onsubmit}>
                        <Avatar/>
                        <FormGroup>
                            <Input type="text" 
                            name="displayname" 
                            placeholder="input display name" 
                            onChange={onchange}/>
                        </FormGroup> 
                        <FormGroup>
                                <Button>Submit</Button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
            </Col>
        </Row>
    </Container>
}