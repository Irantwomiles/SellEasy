import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GarageSale from './GarageSale';
import { Card } from 'react-bootstrap';

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
        <div style={{display: 'flex', flexDirection: 'row', marginLeft: '10%', marginRight: '10%'}}>
           {
            loading ? "" :
            
            data.map( (item) => (
        
                <Card style={{minWidth: '18rem', width: '18rem', overflow: 'auto'}}>
                    <Card.Body>
                        <Card.Title>{item.email}</Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                    </Card.Body>
                </Card>
                
            ))
      
            }
        </div>
    ) 
}

export default ViewallGarageSales;