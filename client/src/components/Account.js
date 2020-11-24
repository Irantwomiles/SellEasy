import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';

function Account() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [zip, setZip] = useState("");
    const [show, setShow] = useState(false);
    const [deleteItem, setDeleteItem] = useState("");

    const cookies = new Cookies();

    let history = useHistory();

    const logout = (e) => {
        e.preventDefault();

        axios.post('https://selleasy.herokuapp.com/api/logout', {}, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`
            }
        }).then(response => {
            if(response.status === 200) {
                cookies.remove('email');
                cookies.remove('token');

                history.push("/");
            }
        }).catch(error => {
        }) 
    }

    const handleClose = () => {setShow(false)}
    const handleShow = () => {setShow(true)};
    const handleDeleteButton = (id) => {
        setDeleteItem(id);
        handleShow();
    }

    const handleDelete = (id) => {

        if(id && id.length > 0 && cookies.get("token")) {

            axios.post(`https://selleasy.herokuapp.com/api/post/delete/${id}`, {}, { 
                headers: {
                    'Authorization': `Bearer ${cookies.get("token")}`
                }
            }).then(response => {
                
                if(response.status === 200) {
                    setData(response.data.data);
                }

            }).catch(error => {
                
            })


        }

        handleClose();

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

                    setLoggedIn(true);

                    axios.get(`https://selleasy.herokuapp.com/api/post/user`, {
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Delete Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => {handleDelete(deleteItem)}}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>

            {
                loading ? "" :
                loggedIn ?
                ((typeof data === 'undefined') || (data.length === 0)) ? 
                <Row>
                    <Col sm={3} style={{backgroundColor: "rgb(247,247,249)"}}>
                        <Row className="mt-3 ml-1">
                            <p style={{fontWeight: "bold" }}>Email</p>
                            <p style={{marginLeft: "5px"}}>{cookies.get("email")}</p>
                        </Row>
                
                        <Form>
                            <Form.Row className="align-items-center">
                                <Col xs="auto">
                                <Form.Label htmlFor="inlineFormInput">
                                    ZipCode
                                </Form.Label>
                                <Form.Control
                                    className="mb-2"
                                    id="inlineFormInput"
                                    type="number"
                                    onChange={(e) => {setZip(e.target.value)}} 
                                    placeholder={cookies.get("zipcode") ? cookies.get("zipcode") : "ex: 27215"}
                                />
                                </Col>
                                <Col xs="auto">
                                <Button className="mb-2"
                                    onClick={() => {
                                        if(zip.length !== 0) {
                                            cookies.set("zipcode", Number.parseInt(zip), {path: '/'})
                                        } 
                                    }}
                                >
                                    Update
                                </Button>
                                </Col>
                            </Form.Row>

                            <Button className="mt-5" variant="danger" onClick={logout}>
                                Logout
                            </Button>
                        </Form>
                    </Col>
                    <Col className="mt-3" sm={9} style={{textAlign: "center"}}>
                        <p>You have not made any posts yet!</p>
                    </Col>
                </Row>

                : 

                <Row>
                    <Col sm={3} style={{backgroundColor: "rgb(247,247,249)"}}>
                        <Row className="mt-3 ml-1">
                            <p style={{fontWeight: "bold" }}>Email</p>
                            <p style={{marginLeft: "5px"}}>{data[0].email}</p>
                        </Row>
                
                        <Form>
                            <Form.Row className="align-items-center">
                                <Col xs="auto">
                                <Form.Label htmlFor="inlineFormInput">
                                    ZipCode
                                </Form.Label>
                                <Form.Control
                                    className="mb-2"
                                    id="inlineFormInput"
                                    type="number"
                                    onChange={(e) => {setZip(e.target.value)}} 
                                    placeholder={cookies.get("zipcode") ? cookies.get("zipcode") : "ex: 27215"}
                                    value={zip}
                                />
                                </Col>
                                <Col xs="auto">
                                <Button className="mb-2"
                                    onClick={() => {
                                        if(zip.length !== 0) {
                                            cookies.set("zipcode", Number.parseInt(zip), {path: '/'})
                                        } 
                                    }}
                                >
                                    Update
                                </Button>
                                </Col>
                            </Form.Row>

                            <Button className="mt-5" variant="danger" onClick={logout}>
                                Logout
                            </Button>
                        </Form>
                    </Col>
                    <Col sm={9} style={{border: "1px solid #DFDFDF"}}>
                        {
                            data.map(item => (
                                <Row key={Math.random()} className="m-3">
                                    <Card style={{width: "100%"}}>
                                        <Card.Body>
                                            <Card.Title>{item.title}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
                                            <Card.Text>{item.description}</Card.Text>
                                            <Card.Text>Items for Sale: {item.items.length}</Card.Text>
                                            <Button onClick={() => {history.push(`/${item._id}`)}}>View Page</Button>
                                            <Button className="ml-1" variant="danger" onClick={() => {handleDeleteButton(item._id)}}>Delete</Button>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            ))
                        }
                    </Col>
                </Row>

                :
                <>
                    <Form>
                    
                            <Col sm={2} xs="auto">
                                <Form.Label>
                                    ZipCode
                                </Form.Label>
                                <Form.Control
                                    className="mb-2"
                                    type="number"
                                    onChange={(e) => {setZip(e.target.value)}} 
                                    placeholder={cookies.get("zipcode") ? cookies.get("zipcode") : "ex: 27215"}
                                    value={zip}
                                />
                            </Col>
                            <Col xs="auto">
                            <Button className="mb-2"
                                onClick={() => {
                                    if(zip.length !== 0) {
                                        cookies.set("zipcode", Number.parseInt(zip), {path: '/'})
                                    } 
                                }}
                            >
                                Update
                            </Button>
                            </Col>
                  
                    </Form>

                    <hr></hr>

                    <Row className="justify-content-md-center mt-5">
                        <Button className="mr-2" onClick={() => {history.push('/signin')}}>Sign In</Button>
                        <Button className="ml-2" onClick={() => {history.push('/signup')}}>Sign Up</Button>
                    </Row>
                </>
            }

        </Container>
    )
}

export default Account;