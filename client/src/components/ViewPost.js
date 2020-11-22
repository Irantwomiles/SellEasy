import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Col, Row, Container, Card} from 'react-bootstrap';
import axios from 'axios';

function ViewPost() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const GET_RECENT_DATA_URL = "https://selleasy.herokuapp.com/api/post/latest/27213";

    useEffect(() => {

        (async () => {

            let result = await axios.get(GET_RECENT_DATA_URL);
           
            if(result.status === 200) {
                
                setData(result.data);
                setLoading(false);

            }

        })();

    }, []);

    return (
        <Container>
            <Card style={{ width: '38rem', height: '38vh'}}>
                <Card.Body>
                    <Card.Title>Post Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">User Name</Card.Subtitle>
                    <Card.Text>Post Description</Card.Text>
                    {/* <Card.Title>Items for Sale!</Card.Title> */}
                    <Card.Text>Items</Card.Text>
                </Card.Body>
            </Card>

            
        </Container>






    )
}

export default ViewPost;