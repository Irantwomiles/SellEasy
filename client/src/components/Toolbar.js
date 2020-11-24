import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Nav, InputGroup, FormControl, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { TwitterFollowButton } from 'react-twitter-embed';
import '../Search.css';

function Toolbar() {

    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

    const cookies = new Cookies();
    let history = useHistory();

    useEffect(() => {

        if(!cookies.get("zipcode")) {
            cookies.set("zipcode", "27514", {path: "/"});
        }

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

        axios.get('https://selleasy.herokuapp.com/api/post/search', {
            params: {
                search: search
            }
        }).then((response) => {
            setData(response.data);
        }).catch(error => {
            console.log(error)
        })

    }, [search])

    const sendToPage = (id) => {
        history.push(`/${id}`);
        setData([])
    }

    const searchItems = () => {
        axios.get('https://selleasy.herokuapp.com/api/post/search', {
            params: {
                search: search
            }
        }).then((response) => {
            setData(response.data);
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <>
        <Container style={{backgroundColor: "rgb(34,34,34)"}}>
            <Nav className="pt-1 pb-1 justify-content-md-center">
                <Nav.Item>
                    <Nav.Link as={Link} to='/viewall' style={{color: "white"}}>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to='/' style={{color: "white"}}>About</Nav.Link>
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
                            <InputGroup.Text id="inputGroup-sizing-default" onClick={searchItems}>Search</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Nav.Item>

            </Nav>
        </Container>
        <Container className="mt-2">
            <Row>
                {
                    data.map((item) => (
                        <div key={Math.random()} className="ml-3 search-wrapper" onClick={() => {sendToPage(item._id)}}>
                            <p className="search-title">{item.title}</p>
                            <p className="search-click">Click To View</p>
                        </div>
                    ))
                }

            </Row>
            <TwitterFollowButton
                screenName={'SellEasy2'}
            />
        </Container>
        </>
    )
}

export default Toolbar;