import { useContext } from "react";
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
import { AuthContext } from "../../contexts/AuthContext";
function generratetitle(pathname){
  if(pathname==='/register'){
    return 'register'
  }
  else if(pathname==='/login'){
    return 'login'
  }
  else{
    return ''
  }
}

const AuthLayout = () => {
  const {pathname}=useLocation()
  const title = generratetitle(pathname)
  const {login}=useContext(AuthContext)
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
                <Button color="primary" outline onClick={()=>{login('google')}}>
                  Google
                </Button>
                <Button color="primary" outline onClick={()=>{login('facebook')}}>
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
