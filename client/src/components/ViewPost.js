import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Card, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faAngleUp } from '@fortawesome/free-solid-svg-icons'

function ViewPost(props) {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const cookies = new Cookies();

   
    useEffect(() => {

        const URL = `https://selleasy.herokuapp.com/api/post/get/${props.match.params.id}`;

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
        

        setData({
            email: data.email,
            description: data.description,
            title : data.title,
            items: arr,
            zip: data.zip,
            createdAt: data.createdAt
        })

        

    }

    return (
        <Container>
            {
                Object.keys(data).length === 0 ? "Couldn't find anything at this URL" :
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>{data.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Posted By: {data.email}</Card.Subtitle>
                        <Card.Text>{data.description}</Card.Text>
                        <Card.Subtitle className="mb-2 text-muted">Items for Sale</Card.Subtitle>
                        <Card.Body style={{border: "1px solid #DFDFDF", borderRadius: "3px"}}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Sold</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.items.map((i, index) => (
                                            <tr key={index}>
                                                <td>{i.name}</td>
                                                <td>${i.price}</td>
                                                <td>{i.quantity}</td>
                                                <td>

                                                </td>
                                                <td>{new Boolean(i.sold).toString()}</td>
                                                {
                                                    
                                                    (cookies.get("email") && data.email === cookies.get("email"))
                                                    ? (i.sold) ? 
                                                    <td>
                                                        <Button size="sm" variant="info" onClick={() => {soldbutton(index)}}>Mark as Not Sold</Button>
                                                    </td>
                                                    : 
                                                    <td>
                                                        <Button size="sm" variant="warning" onClick={() => {soldbutton(index)}}>Mark as Sold</Button>
                                                    </td>
                                                    : ""
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


            
        </Container>






    )
}

export default ViewPost;