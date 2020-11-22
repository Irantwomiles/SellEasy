import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Col, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

function SignUp() {

    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retype, setRetype] = useState("");
    const [zip, setZip] = useState("");

    const [show, setShow] = useState({title: "Somethings Wrong!", message: "Filled out", type: "danger", show: false});

    let history = useHistory();

    const signup = () => {
        if(first.length === 0 || last.length === 0 || email.length === 0 || password.length === 0 || retype.length === 0 || zip.length === 0) {
            setShow({title: "Somethings Wrong!", message: "You must fill out all of the fields below!", type: "danger", show: true});
            return;
        }

        if(password !== retype) {
            setShow({title: "Somethings Wrong!", message: "Your passwords do not match!", type: "danger", show: true});
            return;
        }

        axios.post('http://localhost:5000/api/create', {
            firstName: first,
            lastName: last,
            email: email,
            password: password,
            zip: zip
        }).then(response => {
            if(response.status === 200) {
                history.push('/signin');
            }
        }).catch(error => {
            setShow({title: "Error!", message: "There was an error while attempting to create an account for you, please try again later!", type: "danger", show: true});
        })
    }

    return (
        <Container>
            {
                show.show ?
                <Alert className="mt-3" variant="danger" onClose={() => setShow({title: "Somethings Wrong!", message: "Filled out", type: "danger", show: false})} dismissible>
                    <Alert.Heading>Somethings Wrong!</Alert.Heading>
                    <p>
                        {show.message}
                    </p>
                </Alert>
                : ""
            }

            <Alert className="mt-2" variant="secondary">
                Sign Up Page
            </Alert>
            <Form>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control onChange={(e) => {setFirst(e.target.value)}} placeholder="First Name" value={first}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control onChange={(e) => {setLast(e.target.value)}} placeholder="Last Name" value={last}/>
                    </Form.Group>
                </Form.Row>
                
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter email" value={email}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" value={password}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Re-Enter Password</Form.Label>
                        <Form.Control type="password" onChange={(e) => {setRetype(e.target.value)}} placeholder="Password" value={retype}/>
                    </Form.Group>
                </Form.Row>
                
                <Form.Row>
                    <Form.Group as={Col} sm={2}>
                        <Form.Label>Zipcode</Form.Label>
                        <Form.Control className="col-xs-2" onChange={(e) => {setZip(e.target.value)}} placeholder="27215" value={zip}/>
                    </Form.Group>
                </Form.Row>
                <Button variant="primary" onClick={signup}>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}


export default SignUp;