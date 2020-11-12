import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);

    const emailChange = (e) => { setEmail(e.target.value); }
    const passwordChange = (e) => { setPassword(e.target.value); }

    const login = (e) => {
        e.preventDefault();

        console.log("click")

        if(email.length === 0 || password.length === 0) {
            setShow(true);
            return;
        }

        
    }

    return (
        <Container>
            {
                show ?
                <Alert className="mt-3" variant="danger" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>You must fill out all fields!</Alert.Heading>
                    <p>
                        Your Email and/or Password field was not filled out, please fill them out before attempting to login.
                    </p>
                </Alert>
                : ""
            }
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={emailChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"  value={password} onChange={passwordChange}/>
                </Form.Group>
                <Button variant="primary" onClick={login}>
                    Submit
                </Button>
            </Form>
        </Container>
    )

}

export default SignIn;