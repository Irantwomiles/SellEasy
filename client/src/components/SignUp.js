import React from 'react';
import { Form, Button, Col, Container, Alert } from 'react-bootstrap';

function SignUp() {
    return (
        <Container>
            <Alert className="mt-2" variant="secondary">
                Sign Up Page
            </Alert>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formFirstLast">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formFirstLast">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Form.Row>
                
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicPassword">
                        <Form.Label>Re-Enter Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </Form.Row>
                
                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>Alabama - AL</option>
                            <option>Alaska - AK</option>
                            <option>Arizona - AZ</option>
                            <option>Arkansas - AR</option>
                            <option>California - CA</option>
                            <option>Colorado - CO</option>
                            <option>Connecticut - CT</option>
                            <option>Delaware - DE</option>
                            <option>Florida - FL</option>
                            <option>Georgia - GA</option>
                            <option>Hawaii - HI</option>
                            <option>Idaho - ID</option>
                            <option>Illinois - IL</option>
                            <option>Indiana - IN</option>
                            <option>Iowa - IA</option>
                            <option>Kansas - KS</option>
                            <option>Kentucky - KY</option>
                            <option>Louisiana - LA</option>
                            <option>Maine - ME</option>
                            <option>Maryland - MD</option>
                            <option>Massachusetts - MA</option>
                            <option>Michigan - MI</option>
                            <option>Minnesota - MN</option>
                            <option>Mississippi - MS</option>
                            <option>Missouri - MO</option>
                            <option>Montana - MT</option>
                            <option>Nebraska - NE</option>
                            <option>Nevada - NV</option>
                            <option>New Hampshire - NH</option>
                            <option>New Jersey - NJ</option>
                            <option>New Mexico - NM</option>
                            <option>New York - NY</option>
                            <option>North Carolina - NC</option>
                            <option>North Dakota - ND</option>
                            <option>Ohio - OH</option>
                            <option>Oklahoma - OK</option>
                            <option>Oregon - OR</option>
                            <option>Pennsylvania - PA</option>
                            <option>Rhode Island - RI</option>
                            <option>South Carolina - SC</option>
                            <option>South Dakota - SD</option>
                            <option>Tennessee - TN</option>
                            <option>Texas - TX</option>
                            <option>Utah - UT</option>
                            <option>Vermont - VT</option>
                            <option>Virginia - VA</option>
                            <option>Washington - WA</option>
                            <option>West Virginia - WV</option>
                            <option>Wisconsin - WI</option>
                            <option>Wyoming - WY</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Form.Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}


export default SignUp;