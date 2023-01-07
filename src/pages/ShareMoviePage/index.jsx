import { useContext, useState } from "react";
import { Alert, Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row, } from "reactstrap";
import { YoutubeContext } from "../../contexts/YoutubeContext";

const ShareMoviePage=()=>{
    const[err,setErr]=useState('')
    const {shareVideo}=useContext(YoutubeContext)
    const [formValue,setFormValue]=useState({
        youtubeUrl:''
    });
    const onChange=(e)=>{
        const {name,value}=e.target
        setFormValue((pre)=>({...pre,[name]:value}));
    }
    
    const onSubmit=async(e)=>{
            e.preventDefault()
        if(err)setErr('')
        try {
            await shareVideo(formValue.youtubeUrl)
            } catch (error) {
                setErr(error.message)
            }
    }
    return <Row>
        <Col md={6}>
            <Card>
            <CardHeader>Share Movie</CardHeader>
            <CardBody>
                <Form md={6} onSubmit={onSubmit}>
                    {err && <Alert color="danger">{err}</Alert>}
                    <FormGroup>
                        <Label for="examplePassword">youtube url</Label>
                        <Input onChange={onChange} type="url" name="youtubeUrl" id="youtubeurl" placeholder="youtube-url" value={formValue.youtubeURL}/>
                        <Button>Share</Button>
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
        </Col>
    </Row>
}
export default ShareMoviePage;