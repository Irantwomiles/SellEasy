import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Card, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';

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
        console.log(index);
        let obj = data;
        obj.items[index].sold = !obj.items[index].sold;
        setData(obj);
        console.log(obj);
        console.log(data);
        return;



        // if(first.length === 0 || last.length === 0 || email.length === 0 || password.length === 0 || retype.length === 0 || zip.length === 0) {
        //     setShow({title: "Somethings Wrong!", message: "You must fill out all of the fields below!", type: "danger", show: true});
        //     return;
        // }

        // if(password !== retype) {
        //     setShow({title: "Somethings Wrong!", message: "Your passwords do not match!", type: "danger", show: true});
        //     return;
        // }

        // axios.post('https://selleasy.herokuapp.com/api/create', {
        //     firstName: first,
        //     lastName: last,
        //     email: email,
        //     password: password,
        //     zip: zip
        // }).then(response => {
        //     if(response.status === 200) {
        //         history.push('/signin');
        //     }
        // }).catch(error => {
        //     setShow({title: "Error!", message: "There was an error while attempting to create an account for you, please try again later!", type: "danger", show: true});
        // })
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.items.map((i, index) => (
                                            <tr key={index}>
                                                <td>{i.name}</td>
                                                <td>${i.price}</td>
                                                <td>{i.quantity}</td>
                                                <td>{new Boolean(i.sold).toString()}</td>
                                                {
                                                    
                                                    (cookies.get("email") && data.email === cookies.get("email"))
                                                    ? (i.sold) ? 
                                                    <td>
                                                        <Button size="sm" variant="info" onClick={() => {soldbutton(index)}}>Mark as Not Sold</Button>
                                                    </td>
                                                    : 
                                                    <td>
                                                        <Button size="sm" variant="info" onClick={() => {soldbutton(index)}}>Mark as Sold</Button>
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