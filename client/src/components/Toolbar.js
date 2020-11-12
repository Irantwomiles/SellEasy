import React, {useState} from 'react';
import { Nav, NavDropdown, InputGroup, FormControl, Container } from 'react-bootstrap';

function Toolbar() {
    // const [color, setColor] = setState();

    return (
        <Container style={{backgroundColor: "rgb(34,34,34)"}}>
            <Nav className="pt-1 pb-1 justify-content-md-center">
                <Nav.Item>
                    <Nav.Link style={{color: "white"}} href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{color: "white"}} href="/account">Account</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{color: "white"}} href="/create">Create Post</Nav.Link>
                </Nav.Item>
                <Nav.Item className="ml-auto">
                    <InputGroup>
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                        <InputGroup.Append>
                            <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Nav.Item>
                
            </Nav>
        </Container>
    )
}

export default Toolbar;