import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Account() {

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
                    <Row className="ml-1">
                        <div style={{backgroundColor: "gray"}}>
                            <span>Title of Post</span>
                            <span>Description of the post here is goes something over here lmao</span>
                            <span>11/11/2020</span>
                        </div>
                    </Row>
                    <Row className="ml-1">
                        <div style={{backgroundColor: "gray"}}>
                            <span>Title of Post</span>
                            <span>Description of the post here is goes something over here lmao</span>
                            <span>11/11/2020</span>
                        </div>
                    </Row>
                </Col>
            </Row>
            
        </Container>
    )
}

export default Account;