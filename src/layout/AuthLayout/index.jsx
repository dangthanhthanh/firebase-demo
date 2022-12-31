import { signInWithPopup } from "firebase/auth";
import { Outlet, useLocation } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import { auth, facebookProvider, googleProvider } from "../../libs/firebase";
function generratetitle(pathname){
  if(pathname==='/register'){
    return 'register'
  }
  else if(pathname==='/login'){
    return 'login'
  }
  else{
    return 'home'
  }
}

const AuthLayout = () => {
  const {pathname}=useLocation()
  const title = generratetitle(pathname)
  const handleLoginSocial = async (type) =>{
    switch(type){
      case "facebook":
        const result = await signInWithPopup(auth, facebookProvider)
        console.log(result)
        break
      case "google":
        const gg = await signInWithPopup(auth, googleProvider)
        console.log(gg)
        break;

      case "github":
      case "apple": 
      default:
      break  
    }
  }
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col lg={4} md={6}>
          <Card>
            <CardHeader className="text-center">
              <h5>{title}</h5>
            </CardHeader>
            <CardBody>
              <Outlet />
            </CardBody>
            <CardFooter>
              <ButtonGroup className="w-100">
                <Button color="primary" outline onClick={()=>{handleLoginSocial('google')}}>
                  Google
                </Button>
                <Button color="primary" outline onClick={()=>{handleLoginSocial('facebook')}}>
                  Facebook
                </Button>
                <Button color="primary" outline>
                  Twitter
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default AuthLayout;
