import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Container, Row, Card, Alert } from 'react-bootstrap';
import Cookies from 'universal-cookie';

function ViewallGarageSales(){
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [zipcode, setZipcode] = useState();
    const cookies = new Cookies();

    const GET_RECENT_DATA_URL = `https://selleasy.herokuapp.com/api/post/latest/${cookies.get("zipcode") ? cookies.get("zipcode") : "-1"}`;

    useEffect(() => {

        console.log("this is getting called");

        if(!cookies.get("zipcode")) {
            cookies.set("zipcode", "-1", {path: "/"});
        }

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
                    It looks like there are no posts to see right now on zipcode {cookies.get("zipcode")}, please come back later!
                </Alert>
            :
            
            data.map( (item) => (
        
                <Card key={item._id} className="m-2" style={{width: '15rem'}}>
                    <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                        {
                            item.items.map((i) => (
                                <Card.Text key={Math.random()}>
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