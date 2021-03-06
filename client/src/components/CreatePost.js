import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Col, Row, Container, Card, Alert } from 'react-bootstrap';
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

    const [show, setShow] = useState({title: "Somethings Wrong!", message: "Please enter all required fields.", type: "danger", show: false});

    const cookies = new Cookies();
    let history = useHistory();

    const addItem = () => {
        if(itemName.length === 0 || price.length === 0 || quantity.length === 0) {
            setShow({title: "Somethings Wrong!", message: "Make sure to create an item!", type: "danger", show: true});
            return;
        }

        setItems((prevItem) => [...prevItem, {name: itemName, price: price, quantity: quantity, sold: false, id: Math.random()}])
        setItemName("");
        setPrice("");
        setQuantity("");
    }

    const removeItem = (id) => {
        let arr = items.filter(e => e.id !== id);
        setItems(arr);
    }

    const createPost = () => {
        if(title.length === 0 || description.length === 0 || zipcode.length === 0 ) {
            setShow({title: "Somethings Wrong!", message: "Make sure to include a title, description, and zip code", type: "danger", show: true});
            return;
        }

        if(items.length === 0) {
            setShow({title: "Somethings Wrong!", message: "Make sure to press Add Item!", type: "danger", show: true});
            return;
        }

        axios.post('https://selleasy.herokuapp.com/api/post/create', {
            title: title,
            description: description,
            zip: zipcode,
            items: items
        }, { 
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`
            }
        }).then(response => {
            
            if(response.status === 200) {
                //send to post page
                history.push(`/${response.data.data.id}`);
            }

        }).catch(error => {
            console.log("createPost", error)
        })

    }

    function loggedIn() {
        if(cookies.get("email") && cookies.get("token")) return true;

        return false;
    }

    return (
        <>
            {
                !loggedIn() 
                ? history.push('/account')
                :
            <Container>
                {
                    show.show ?
                    <Alert className="mt-3" variant="danger" onClose={() => setShow({title: "Somethings Wrong!", message: "Filled out", type: "danger", show: false})} dismissible>
                        <Alert.Heading>Could not post!</Alert.Heading>
                        <p>
                            {show.message}
                        </p>
                    </Alert>
                    : ""
                }

                <Form>
                    <Form.Group>
                        <Form.Label>Post title</Form.Label>
                        <Form.Control onChange={(e) => {setTitle(e.target.value)}} size="lg" type="text" placeholder="Enter title here" value={title}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={(e) => {setDescription(e.target.value)}} as="textarea" rows={3} placeholder="Include relevant information such as time and location" value={description}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Zip</Form.Label>
                        <Form.Control onChange={(e) => {setZipcode(e.target.value)}} placeholder={cookies.get('zipcode')? cookies.get('zipcode'):"12345"} value={zipcode}/>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Item</Form.Label>
                            <Form.Control onChange={(e) => {setItemName(e.target.value)}} size="sm" type="text" placeholder="Enter item name" value={itemName}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>$</Form.Label>
                            <Form.Control onChange={(e) => {setPrice(e.target.value)}} size="sm" type="number" placeholder="0.00" value={price}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control onChange={(e) => {setQuantity(e.target.value)}} size="sm" type="number" placeholder="0" value={quantity}>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    {
                        items.map(item => (
                       
                            <div key={item.id} style={{width: "100%", display: "flex", flexDirection: "row", border: "1px solid #DFDFDF", justifyContent: "center", marginBottom: "20px"}}>
                                <p style={{width: "33%", margin: "5px"}}>Name: {item.name}</p>
                                <p style={{width: "33%", margin: "5px"}}>Price: ${item.price}</p>
                                <p style={{width: "33%", margin: "5px"}}>Quantity: {item.quantity}x</p>
                                <button onClick={() => {removeItem(item.id)}} style={{marginTop: "5px", marginBottom: "5px", marginRight: "5px", border: "none", borderRadius: "45px", backgroundColor: "#DFDFDF", color: "black"}}>x</button>
                            </div>
            
                        ))
                    }

                    <Button className="mb-2" variant="secondary" onClick={addItem}>Add Item</Button>
                        
                </Form>
                <hr></hr>
                <Button className="mr-2" variant="primary" onClick={createPost}>Post</Button>
              
               
                <Button variant="danger" onClick={() => {history.push("/")}}>Cancel</Button> 

            </Container>
            
            }

            
            </>
     
    )
}


export default CreatePost;