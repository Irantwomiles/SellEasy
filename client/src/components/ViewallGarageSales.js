import React, {useState, useEffect} from 'react';

function Gsale(item, cost, zip){
    this.item = item
    this.cost = cost
    this.zip = zip
}
const fakeData = [new Gsale("grill", 400, 32901), new Gsale("firstborn son", 50, 70770), new Gsale("cheeto shaped like dorito", 9000, 27514)];



function Gsale(item, cost, zip){
    this.item = item
    this.cost = cost
    this.zip = zip
}
const fakeData = [new Gsale("grill", 400, 32901), new Gsale("firstborn son", 50, 70770), new Gsale("cheeto shaped like dorito", 9000, 27514)];

function ViewallGarageSales(){
    data = fakeData
    return (
        <div>
            {
                data.map( (sale) => (
                    <GarageSale
                    item={sale.item}
                    cost={sale.cost}
                    zip={sale.zip}
                    />
                ))
            }
        </div>
    ) 
}