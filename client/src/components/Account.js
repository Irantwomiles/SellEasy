import React, {useContext} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Cookies from 'universal-cookie';

function Account() {

    const {USER, TOKEN} = useContext(UserContext);
    
    const [user, setUser] = USER;
    const [token, setToken] = TOKEN;

    return (
        <Container>
            <Row>
                <Col sm={3} style={{backgroundColor: "rgb(247,247,249)"}}>
                    <Row className="mt-3 ml-1">
                        <p style={{fontWeight: "bold", }}>Email:</p>
                        <p style={{marginLeft: "5px"}}>email@gmail.com</p>
                    </Row>
                    <Row className="ml-1">
                        <p style={{fontWeight: "bold", }}>Zip Code:</p>
                        <p style={{marginLeft: "5px"}}>27215</p>
                    </Row>
                    <Row className="ml-1">
                        <Button  variant="danger">
                            Logout
                        </Button>
                    </Row>
                </Col>
                <Col sm={9} style={{border: "1px solid black"}}>
                    <Row className="m-1">
                        <div style={{backgroundColor: "gray", width: "100%"}}>
                            <p>Title Of Post</p>
                            <p>Description of this post is this and that with some of this.</p>
                            <p>Posted on: 11/11/2020</p>
                        </div>
                    </Row>
                    <Row className="m-1">
                        <div style={{backgroundColor: "gray", width: "100%"}}>
                            <p>Title Of Post</p>
                            <p>Description of this post is this and that with some of this.</p>
                            <p>Posted on: 11/11/2020</p>
                        </div>
                    </Row>
                </Col>
            </Row>
            
        </Container>
    )
}

export default Account;