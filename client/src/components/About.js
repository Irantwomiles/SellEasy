import React, { useEffect } from 'react';
import { Container} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import "../App.css";
import logo from '../shoppingbags.png';


function About() {

    let cookies = new Cookies();

    useEffect(() => {
        if(!cookies.get("zipcode") || isNaN(cookies.get("zipcode")) || cookies.get("zipcode") === "undefined") {
            cookies.set("zipcode", "27514", {path: "/"});
        }
    }, [])

    return (
        <Container> 
            <h1 className="title">SellEasy</h1>
            <h2 className="desc">Create listings, view items, and many more! Sign up for a free account today!</h2>
            <img className="pic" src={logo} alt="Logo" />
            <h3 class="credit">Created by Shayan Ghofrany, Tracy Boodhoo, Andre Javan</h3>
        </Container>
        
    )
    

}

export default About;