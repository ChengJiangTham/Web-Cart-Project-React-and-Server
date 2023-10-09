import React from 'react';

function ProductDetails(props)
{   
    return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
            <div className="shrink-0">
                <img className="h-12 w-12" src={props.img} alt="Product Logo" />
            </div>
            <div>
                <div className="text-xl font-medium text-black">{props.name}</div>
                <p className="text-slate-500">${props.cost}</p>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input type="number" name="amount" id="amount" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0" 
                    value={props.purchaseAmount}
                    onChange={(e) => {
                        e.target.value = e.target.value < 0 ? 0 : e.target.value
                        e.target.value = e.target.value > props.remaining ? props.remaining : e.target.value
                        props.updateFunc(props.id, e.target.value, (e.target.value * props.cost).toFixed(2))
                    }
                    }/>
                    <div className="absolute inset-y-0 right-2 flex items-center">
                        <p>/{props.remaining}</p>
                    </div>
                </div>
                <p>Total Cost : $ {props.totalCost}</p>
            </div>
        </div>
    )
}

export default ProductDetails