import React from 'react';



function GarageSale(props){
    return (
        <div className = "senasNewGirlfriend">
            <div>
                <h1>{props.item}</h1>
            </div>
            <div>
                <h2>Selling for ${props.cost}</h2>
                <p>Come visit {props.zip}</p>
            </div>
        </div>
    )
}

export default GarageSale;