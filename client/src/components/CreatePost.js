import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Col, Row, Container} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import axios from 'axios';

function CreatePost() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [items, setItems] = useState([]);

    const cookies = new Cookies();
    let history = useHistory();

    const addItem = () => {
        if(itemName.length === 0 || price.length === 0 || quantity.length === 0) {
            return;
        }

        setItems((prevItem) => [...prevItem, {name: itemName, price: price, quantity: quantity, id: Math.random()}])
    }

    const removeItem = (id) => {
        let arr = items.filter(e => e.id !== id);
        setItems(arr);
    }

    const createPost = () => {
        if(title.length === 0 || description.length === 0 || zipcode.length === 0) {

            return;
        }

        if(items.length === 0) {

            return;
        }

        axios.post('http://localhost:5000/api/post/create', {
            title: title,
            description: description,
            zip: zipcode,
            items: items
        }, { 
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`
            }
        }).then(response => {
            
            console.log("createPost", response)
            // if(response.status === 200) {
            //     history.push('/signin');
            // }
        }).catch(error => {
            console.log("createPost", error)
        })

    }

    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label>Post title</Form.Label>
                    <Form.Control onChange={(e) => {setTitle(e.target.value)}} size="lg" type="text" placeholder="Enter title here" value={title}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={(e) => {setDescription(e.target.value)}} as="textarea" rows={3} placeholder="Include relevant information such as time and location" value={description}/>
                </Form.Group>
                <Form.Group controlId="formGridZip" >
                    <Form.Label>Zip</Form.Label>
                    <Form.Control onChange={(e) => {setZipcode(e.target.value)}} placeholder={cookies.get('zipcode')? cookies.get('zipcode'):"12345"} value={zipcode}/>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlID="formGridItemName">
                        <Form.Label>Item</Form.Label>
                        <Form.Control onChange={(e) => {setItemName(e.target.value)}} size="sm" type="text" placeholder="Enter item name" value={itemName}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPrice">
                        <Form.Label>$</Form.Label>
                        <Form.Control onChange={(e) => {setPrice(e.target.value)}} size="sm" type="number" placeholder="0.00" value={price}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridQuant">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control onChange={(e) => {setQuantity(e.target.value)}} size="sm" type="number" placeholder="0" value={quantity}>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                {
                    items.map(item => (
                        <Row key={item.id} className="m-1">
                            <div style={{width: "100%", border: "1px solid black"}}>
                                <span>{item.name}</span>
                                <span>{item.price}</span>
                                <span>{item.quantity}</span>
                                <span><Button style={{float: "right"}} variant="danger" onClick={() => {removeItem(item.id)}}>Delete</Button></span>
                            </div>
                        </Row>
                    ))
                }

                <Button className="mb-2" variant="secondary" onClick={addItem}>Add Item</Button>
                    
            </Form>
            <hr></hr>
            <Button className="mr-2" variant="primary" onClick={createPost}>Post</Button>
            <Button variant="danger" onClick={() => {history.push("/")}}>Cancel</Button> 
            
        </Container>
    )
}


export default CreatePost;