import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Card, Alert, Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';

function ViewallGarageSales(){
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const cookies = new Cookies();

    const GET_RECENT_DATA_URL = `https://selleasy.herokuapp.com/api/post/latest/${cookies.get("zipcode") && cookies.get("zipcode") !== "undefined" ? cookies.get("zipcode") : "-1"}`;

    let history = useHistory();

    const visitPage = (id) => {
        history.push(`/${id}`);
    }

    useEffect(() => {

        if(!cookies.get("zipcode") || cookies.get("zipcode") === "undefined") {
            cookies.set("zipcode", "27514", {path: "/"});
        }

        (async () => {

            let result = await axios.get(GET_RECENT_DATA_URL);
           
            if(result.status === 200) {
                
                setData(result.data);
                setLoading(false);

            }

        })();

    }, []);
    
    return (
        <Container style={{height: "100vh"}}>
            <Row className="justify-content-md-center">
           {
            loading || data.length === 0 ? 
                <Alert className="mt-3" variant="dark">
                    It looks like there are no posts to see right now on zipcode {cookies.get("zipcode")}, please come back later!
                </Alert>
            :
            
            data.map( (item) => (
        
                <Card key={item._id} className="m-2" style={{width: '15rem'}}>
                    <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Subtitle style={{color: "#616161"}}>Description</Card.Subtitle>
                        <Card.Text>{item.description.length >= 150 ? item.description.substring(0, 149) + "..." : item.description}</Card.Text>
                        <Card.Text>Items for sale: {item.items.length}</Card.Text>
                        
                    </Card.Body>
                    <Card.Footer className="text-center">
                        <Button variant="primary" onClick={() => {visitPage(item._id)}}>View Page</Button>
                    </Card.Footer>
                </Card>
                
            ))
      
            }
            </Row>
        </Container>
    ) 
}

export default ViewallGarageSales;