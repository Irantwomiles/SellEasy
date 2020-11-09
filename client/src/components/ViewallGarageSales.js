import React, {useState, useEffect} from 'react';
import axios from 'axios';

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
        <div>
           {
            loading ? "" :
            
            data.map( (item) => (
        
                <div key={item._id}>
                    <span>{item.email}</span>
                    <span>{item.description}</span>
                    <span>{item.zip}</span>
                    <span>{}</span>
                </div>
  
            ))
      
            }
        </div>
    ) 
}

export default ViewallGarageSales;