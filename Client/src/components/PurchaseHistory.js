import React from 'react';

function PastPurchase(props)
{   
    return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg">
            <h1>Date: {props.datetime}</h1>
            <div>
                {props.purchaseList?.map((purchase) => {
                    return (
                        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg">
                            <div className="flex items-center space-x-4">
                                <div className="shrink-0">
                                    <img className="h-6 w-6" src={purchase.img} alt="Product Logo" />
                                </div>
                                <div>
                                    <p>Name: {purchase.name}</p>
                                    <p>Amount: {purchase.amount}</p>
                                    <p>Cost: ${purchase.cost}</p>
                                </div>
                            </div>
                        </div> )})}
            </div>
            <p>Total Cost : $ {props.totalCost}</p>
        </div>
    )
}

export default PastPurchase