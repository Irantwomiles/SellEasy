import React, {useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Nav, InputGroup, FormControl, Container } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Cookies from 'universal-cookie';

function Toolbar() {

    const {USER, TOKEN} = useContext(UserContext);
    
    const [user, setUser] = USER;
    const [token, setToken] = TOKEN;

    const cookies = new Cookies();

    function isLoggedIn() {
        if(cookies.get("email") && cookies.get("token")) return true;

        return false;
    }

    useEffect(() => {

        let email = cookies.get('email');
        let token = cookies.get('token');

        if(email && token) {
            axios.get(`http://localhost:5000/api/authenticated`, {
                params: {
                    email: email,
                    token: token
                }
            })
            .then((response) => {
                if(response.status === 200) {
                    cookies.set('email', response.data.email, {path: '/'});
                    cookies.set('token', response.data.token, {path: '/'});

                    setUser(cookies.get('email'));
                    setToken(cookies.get('token'));

                    // history.push('/');

                } else {
                    cookies.remove('email');
                    cookies.remove('token');
                }
            })
            .catch((error) => {
                cookies.remove('email');
                cookies.remove('token');
            });
        }

    }, [])

    return (
        <Container style={{backgroundColor: "rgb(34,34,34)"}}>
            <Nav className="pt-1 pb-1 justify-content-md-center">
                <Nav.Item>
                    <Nav.Link as={Link} to='/' style={{color: "white"}}>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to='/account' style={{color: "white"}}>Account</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to='/create' style={{color: "white"}}>Create Post</Nav.Link>
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