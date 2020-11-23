import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nav, InputGroup, FormControl, Container } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { TwitterFollowButton } from 'react-twitter-embed';

function Toolbar() {

    const [search, setSearch] = useState("");
    // const []

    const cookies = new Cookies();

    function isLoggedIn() {
        if(cookies.get("email") && cookies.get("token")) return true;

        return false;
    }

    useEffect(() => {

        let email = cookies.get('email');
        let token = cookies.get('token');

        if(email && token) {
            axios.get(`https://selleasy.herokuapp.com/api/authenticated`, {
                params: {
                    email: email,
                    token: token
                }
            })
            .then((response) => {
                if(response.status === 200) {
                    cookies.set('email', response.data.email, {path: '/'});
                    cookies.set('token', response.data.token, {path: '/'});
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

    useEffect(() => {

        if(search.length < 3) return;

        

    }, [search])

    return (
        <>
        <Container style={{backgroundColor: "rgb(34,34,34)"}}>
            <Nav className="pt-1 pb-1 justify-content-md-center">
                <Nav.Item>
                    <Nav.Link as={Link} to='/' style={{color: "white"}}>About</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to='/viewall' style={{color: "white"}}>Home</Nav.Link>
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
                            placeholder="Enter item name..."
                            onChange={(e) => {setSearch(e.target.value)}}
                            value={search}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Nav.Item>

            </Nav>
        </Container>
        <Container className="mt-2" style={{backgroundColor: "rgb(247,247,249)"}}>
            <TwitterFollowButton
                screenName={'SellEasy2'}
            />
        </Container>
        </>
    )
}

export default Toolbar;