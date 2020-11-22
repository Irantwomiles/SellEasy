import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Card, Table } from 'react-bootstrap';
import axios from 'axios';

function ViewPost(props) {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

   
    useEffect(() => {

        const URL = `http://localhost:5000/api/post/get/${props.match.params.id}`;

        (async () => {

            let result = await axios.get(URL);
           
            if(result.status === 200) {
                setData(result.data.data);
            }

        })();

    }, []);

    return (
        <Container>
            {
                Object.keys(data).length === 0 ? "Nothing to see here" :
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>{data.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Posted By: {data.email}</Card.Subtitle>
                        <Card.Text>{data.description}</Card.Text>
                        <Card.Subtitle className="mb-2 text-muted">Items for Sale</Card.Subtitle>
                        <Card.Body style={{border: "1px solid #DFDFDF"}}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Sold</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.items.map((i) => (
                                            <tr key={Math.random()}>
                                                <td>{i.name}</td>
                                                <td>${i.price}</td>
                                                <td>{i.quantity}</td>
                                                <td>{new Boolean(i.sold).toString()}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>

                        </Card.Body>
                    </Card.Body>
                </Card>
            }


            
        </Container>






    )
}

export default ViewPost;