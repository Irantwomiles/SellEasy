import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Card, Table, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import "../App.css";
import logo from '../shoppingbags.png';


function About() {

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