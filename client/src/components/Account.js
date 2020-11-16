import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Cookies from 'universal-cookie';

function Account() {

    const {USER, TOKEN} = useContext(UserContext);
    
    const [user, setUser] = USER;
    const [token, setToken] = TOKEN;

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    const cookies = new Cookies();

    // function isLoggedIn() {
    //     if(user.length > 0 && token.length > 0) return true;

    //     return false;
    // }

    function isLoggedIn() {
        return loggedIn;
    }

    useEffect(() => {

        console.log(data.length)

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
                    setLoggedIn(true);

                    axios.get(`http://localhost:5000/api/post/user`, {
                        params: {
                            email: cookies.get('email')
                        }
                    }).then((response) => {
                        setData(response.data.data);
                        setLoading(false);
                    }).catch((error) => {
                        setData([]);
                        setLoading(false);
                    })

                } else {
                    cookies.remove('email');
                    cookies.remove('token');
                    setLoading(false);
                }

                
            })
            .catch((error) => {
                cookies.remove('email');
                cookies.remove('token');
                setLoading(false);
            });
        } else {
            setLoading(false);
        }

    }, [])

    return (
        <Container>

            {
                loading ? "" :
                loggedIn ?

                data.length === 0 ? "Nothing to Show here"
                : 

                <Row>
                    <Col sm={3} style={{backgroundColor: "rgb(247,247,249)"}}>
                        <Row className="mt-3 ml-1">
                            <p style={{fontWeight: "bold", }}>Email</p>
                            <p style={{marginLeft: "5px"}}>{data[0].email}</p>
                        </Row>
                        <Row className="ml-1">
                            <p style={{fontWeight: "bold", }}>Zip Code:</p>
                            <p style={{marginLeft: "5px"}}>{data[0].zip}</p>
                        </Row>
                        <Row className="ml-1">
                            <Button  variant="danger">
                                Logout
                            </Button>
                        </Row>
                    </Col>
                    <Col sm={9} style={{border: "1px solid black"}}>
                        {
                            data.map(item => (
                                <Row key={Math.random()} className="m-1">
                                    <div style={{backgroundColor: "gray", width: "100%"}}>
                                        <p>{item.title}</p>
                                        <p>{item.description}</p>
                                        <p>{item.createdAt}</p>
                                    </div>
                                </Row>
                            ))
                        }
                        {/* <Row className="m-1">
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
                        </Row> */}
                    </Col>
                </Row>

                :

                <div>You are not logged in</div>
                

            }

        </Container>
    )
}

export default Account;