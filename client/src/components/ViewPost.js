import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, InputGroup, Form } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';

function ViewPost(props) {

    const [data, setData] = useState({});
    const [message, setMessage] = useState("");
    const [show, setShow] = useState({title: "Somethings Wrong!", message: "You cannot have an empty comment!", type: "danger", show: false})

    const cookies = new Cookies();

    useEffect(() => {

        const URL = `http://localhost:5000/api/post/get/${props.match.params.id}`;

        (async () => {

            let result = await axios.get(URL);
           
            if(result.status === 200) {
                setData(result.data.data);
            }

        })();

    }, []);

    const soldbutton = (index) => {
      
        let arr = data.items;
        arr[index].sold = !arr[index].sold;

        let obj = {
            email: data.email,
            description: data.description,
            title : data.title,
            items: arr,
            zip: data.zip,
            createdAt: data.createdAt,
            _id: data._id
        }

        axios.post('http://localhost:5000/api/post/update', {
            data: obj
        }, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`
            }
        }).then(response => {
            if(response.status === 200) {
                console.log(response)
                setData(obj);
            }
        }).catch(error => {
            console.log(error)
        }) 

    }

    const commentbutton = () => {
        if(message.length === 0 ) {
            setShow({title: "Somethings Wrong!", message: "You cannot have an empty comment!", type: "danger", show: true});
            return;
        }

        let arr = data.comments;

        arr.push({
            email: cookies.get("email"),
            message: message,
            createdAt: new Date().getTime()
        })

        let obj = {
            email: data.email,
            description: data.description,
            title : data.title,
            items: data.items,
            zip: data.zip,
            createdAt: data.createdAt,
            comments: arr,
            _id: data._id
        }

        axios.post('http://localhost:5000/api/post/comments', {
            data: obj
        }, {
            headers: {
                'Authorization': `Bearer ${cookies.get("token")}`
            }
        }).then(response => {
            if(response.status === 200) {
                setData(obj);
            }
        }).catch(error => {
            console.log(error)
        }) 

        setMessage("");

    }

    return (
        <Container>
            {
                Object.keys(data).length === 0 ? "Couldn't find anything at this URL" :
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>{data.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Posted By: {data.email}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">{new Date(data.createdAt).toLocaleDateString("en-US")}</Card.Subtitle>
                        <Card.Text>{data.description}</Card.Text>
                        <Card.Subtitle className="mb-2 text-muted">Items for Sale</Card.Subtitle>
                        <Card.Body style={{border: "1px solid #DFDFDF", borderRadius: "3px"}}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        
                                        <th>Details</th>
                                        {
                                            (cookies.get("email") && data.email === cookies.get("email")) ?
                                            <th>Sold</th>
                                            : <th></th>

                                        }
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.items.map((i, index) => (
                                            <tr key={index}>
                                                <td>{i.name}</td>
                                                <td>${i.price}</td>
                                                <td>{i.quantity}</td>
                                                
                                                {
                                                    (i.sold) ?
                                                    <td>
                                                        <Button size="sm" variant="danger">Out of Stock</Button>
                                                    </td>
                                                    :
                                                    <td>
                                                        <Button size="sm" variant="warning">In Stock</Button>
                                                    </td>

                                                }
                                                
                                                {
                                                    
                                                    (cookies.get("email") && data.email === cookies.get("email"))
                                                    ? (i.sold) ? 
                                                    <td>
                                                        <InputGroup className="mb-3" size="sm">
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Checkbox aria-label="Checkbox for following text input" onClick={() => {soldbutton(index)}} />
                                                            </InputGroup.Prepend>
                                                        </InputGroup>
                                                        {/* <Button size="sm" variant="danger" onClick={() => {soldbutton(index)}}>Out of Stock</Button> */}
                                                    </td>
                                                    : 
                                                    <td>
                                                        <InputGroup className="mb-3" size="sm">
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Checkbox aria-label="Checkbox for following text input" onClick={() => {soldbutton(index)}}/>
                                                            </InputGroup.Prepend>
                                                        </InputGroup>
                                                    </td>
                                                    : <td></td>
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>

                        </Card.Body>
                    </Card.Body>
                </Card>
            }

            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>
                        Comments
                    </Card.Title>
                    {
                        (typeof data.comments === 'undefined') || data.comments.length === 0 ? "" :
                        data.comments.map(comm => (
                            <Card key={Math.random()} className="mt-1 mb-1">
                                <Card.Body>
                                    <Card.Subtitle>{comm.email} <span className="text-muted">{new Date(comm.createdAt).toLocaleDateString("en-US")}</span></Card.Subtitle>
                                    <Card.Text>{comm.message}</Card.Text>
                                </Card.Body>
                            </Card>
                        )) 
                    }
                    

                   {
                       (cookies.get("token") && cookies.get("email")) ?
                        <>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" placeholder="Write a comment"  rows={3} onChange={(e) => {setMessage(e.target.value)}} value={message}/>
                                </Form.Group>
                            </Form>
                            <Button variant="primary" onClick={() => {commentbutton()}}>Post</Button>
                        </>
                       :
                       ""
                   }

                    
                </Card.Body>
            </Card>
   
        </Container>
    )
}

export default ViewPost;