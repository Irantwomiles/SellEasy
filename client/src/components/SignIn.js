import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Alert, Col } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Cookies from 'universal-cookie';

function SignIn() {

    const {USER, TOKEN} = useContext(UserContext);
    
    const [user, setUser] = USER;
    const [token, setToken] = TOKEN;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);

    const emailChange = (e) => { setEmail(e.target.value); }
    const passwordChange = (e) => { setPassword(e.target.value); }
    const cookies = new Cookies();

    let history = useHistory();

    useEffect(() => {
        if(password.length > 0 && email.length > 0) {
            history.push('/');
        }
      
    }, [user])

    const login = (e) => {
        e.preventDefault();

        if(email.length === 0 || password.length === 0) {
            setShow(true);
            return;
        }

        if(!isLoggedIn()) {
            axios.post(`https://selleasy.herokuapp.com/api/login`, {
                email: email,
                password: password
            })
            .then((response) => {
                if(response.status === 200) {

                    cookies.set('email', response.data.email, {path: '/'});
                    cookies.set('token', response.data.token, {path: '/'});
                    cookies.set('zipcode', response.data.zipcode, {path: '/'});

                    history.push("/");
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }

    }

    

    function isLoggedIn() {
        if(cookies.get('email') && cookies.get('token')) return true;

        return false;
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

                <Alert className="mt-2" variant="secondary">
                    Sign In Page
                </Alert>

                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={emailChange}/>
                </Form.Group>
            
                <Form.Group>
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