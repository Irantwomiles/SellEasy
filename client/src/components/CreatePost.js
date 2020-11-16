import React from 'react';
import { Form, Button, Col, Container} from 'react-bootstrap';
import Cookies from 'universal-cookie';



function CreatePost() {
    const cookies = new Cookies();
    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label>Post title</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Enter title here" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Include relevant information such as time and location" />
                </Form.Group>
                <Form.Group controlId="formGridZip" >
                    <Form.Label>Zip</Form.Label>
                    <Form.Control placeholder={cookies.get('zipcode')? cookies.get('zipcode'):"12345"}/>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlID="formGridItemName">
                        <Form.Label>Item</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="Enter item name">
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPrice">
                        <Form.Label>$</Form.Label>
                        <Form.Control size="sm" type="number" placeholder="0.00">
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridQuant">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control size="sm" type="number" placeholder="0">
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridSold">
                        <Form.Label>Sold?</Form.Label>
                        <Form.Check aria-label="radio 1" label="Yes" >
                        </Form.Check>
                    </Form.Group>
                </Form.Row>
                <Button variant="secondary">Add Another Item</Button>{' '}
                
                
            </Form>
            <Button variant="primary">Post</Button>{' '}
            <Button variant="danger">Cancel</Button> 

        </Container>
    )
}


export default CreatePost;