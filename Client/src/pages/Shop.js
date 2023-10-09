import '../index.css';
import React, {useEffect, useState} from 'react';
import ProductDetails from '../components/Product';
import usePost from '../hooks/usePost';
import useFetch from "../hooks/useFetch";
import {useNavigate} from "react-router-dom"

function Shop() {
  const [costing, setCosting] = useState(0.0)
  const [products, setProducts] = useState([])
  const [purchaseDetail, setPurchaseDetail] = useState(null);
  const navigate = useNavigate();

  
  const url  = "/getProductlist";
  const purchaseUrl = "/updatePurchaseHistory";
  const updateUrl = "/updateProductList";

  const [productList, productListError] = useFetch(url);

  const [postPurchaseUrl, postPurchaseUrlError] = usePost(purchaseUrl, () => {
    navigate("/History");});
    
  const [postUpdateStock, postUpdateStockError] = usePost(updateUrl, () => {});

  useEffect(() => 
    {
      if (productList !== null && productList !== undefined)
      {
        const newProductList = []
        productList.map((val) => 
        {
          newProductList.push({
            id: val._id,
            name: val.name,
            cost: val.cost,
            img: val.img,
            remaining: val.remaining,
            purchaseAmount: 0,
            totalCost: 0.0
          })
        })
        setProducts(newProductList);
      }
    }, [productList])

  function updateProduct(id, newAmount, newTotalCost)
  {
    var cost = 0.0;
    const updatedProducts = products.map((product) => {
      if (id == product.id)
      {
        cost += newTotalCost
        return {...product, purchaseAmount: newAmount, totalCost: newTotalCost}
      }

      return product
    });
    setProducts(updatedProducts);
  }

  function PurchaseButton()
  {
    if (costing === 0) return
    var purchaseProduct = false
    var purchase = {
      datetime:new Date().toLocaleString(),
      totalCost:costing,
      purchases: []
    }
    const updatedProducts = products.map((product) => {
        if (product.purchaseAmount > 0)
        {
          purchase.purchases.push(
            {
              name: product.name,
              img: product.img,
              amount: product.purchaseAmount,
              cost: product.totalCost
            })
          var remains = product.remaining - product.purchaseAmount;
          var updateProduct = {
            _id: product.id,
            name: product.name,
            cost: product.cost,
            img: product.img,
            remaining: remains
          }
          postUpdateStock(updateProduct);
          purchaseProduct = true;
          return {...product, purchaseAmount: 0, totalCost: 0, remaining: remains}
        }
  
        return product
      });
      if (purchaseProduct)
      {
        setPurchaseDetail(purchase);
        setProducts(updatedProducts);
      }
  }

  useEffect(() => 
    {
      if (purchaseDetail === null)
      {
        return;
      }
      postPurchaseUrl(purchaseDetail);
    }, [purchaseDetail])

  useEffect(() => {
    var cost = 0.0
    products.map((product) => {
        cost += parseFloat(product.totalCost)
      });
    setCosting(cost.toFixed(2))
  }, [products])
  

  function PurchaseString(purchase)
  {
    var changes = false
    var purchaseString = purchase.toString().toLowerCase();
    const updatedProducts = products.map((product) => {
        var productName = product.name.toString().toLowerCase() + " x";
        var index = purchaseString.indexOf(productName);
        if (index !== -1 && product.remaining > 0)
        {
            if (index > 0 && purchaseString[index-1] !== ' ')
            {
                console.log("wrong product name");
                return product;
            }
            
            var purchasingVal = purchaseString.substring(index + productName.length)
            var indexValue = purchasingVal.indexOf(' ')
            if (indexValue !== -1)
            {
                purchasingVal = purchasingVal.substring(0, indexValue)
            }

            var val = parseInt(purchasingVal);
            if (val > 0)
            {
                changes = true;
                val = val > product.remaining ? product.remaining : val; 
                return {...product, purchaseAmount: val, totalCost: (val * product.cost).toFixed(2)}
            }
            
        }

        return product;
    })
    
    if (changes )
    {
        setProducts(updatedProducts);
    }
  }


  return (
    <div className="App">
      <div className="justify-center">
      <input type="text" name="amount" id="amount" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="fruit x0" 
        onKeyDown={(e) => {
            if (e.key === 'Enter')
            {
              PurchaseString(e.target.value);
            }
        }}/>
        {console.log(productList)}
        {products?.map((product) => {
          return (
            <ProductDetails
              key={product.id}
              id={product.id}
              name={product.name}
              cost={product.cost}
              img={product.img}
              remaining={product.remaining}
              totalCost={product.totalCost}
              purchaseAmount={product.purchaseAmount}
              updateFunc={updateProduct} /> )
        })}
        <div className="py-2 pl-10 flex justify-center">
          <h1>Total Cost: $ {costing}</h1>
          <div className="pl-10">
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            onClick={PurchaseButton}>
              Submit
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
