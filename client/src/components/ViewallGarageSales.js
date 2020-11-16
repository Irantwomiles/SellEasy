import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Container, Row, Card, Alert } from 'react-bootstrap';

function ViewallGarageSales(){
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [zipcode, setZipcode] = useState();

    const GET_RECENT_DATA_URL = "http://localhost:5000/api/post/latest/27215";

    useEffect(() => {

        // setZipcode(27215);

        (async () => {

            let result = await axios.get(GET_RECENT_DATA_URL);
           
            if(result.status === 200) {
                
                setData(result.data);
                setLoading(false);

            }

        })();

    }, []);
    
    useEffect(() => {

        for(let i = 0; i < data.length; i++) {
            console.log(data[i].email, data[i].items);
        }

    }, [data])

    return (
        <Container style={{backgroundColor: "rgb(247,247,249)", height: "100vh"}}>
            <Row className="justify-content-md-center">
           {
            loading || data.length === 0 ? 
                <Alert className="mt-3" variant="dark">
                    It looks like there are no posts to see right now, please come back later!
                </Alert>
            :
            
            data.map( (item) => (
        
                <Card className="m-2" style={{width: '15rem'}}>
                    <Card.Body>
                        <Card.Title>{item.email}</Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                        {
                            item.items.map((i) => (
                                <Card.Text>
                                    {i.name}-{i.price}-{new Boolean(i.sold).toString()}
                                </Card.Text>
                            ))
                        }
                    </Card.Body>
                </Card>
                
            ))
      
            }
            </Row>
        </Container>
    ) 
}

export default ViewallGarageSales;