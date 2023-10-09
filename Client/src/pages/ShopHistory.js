import '../index.css';
import React, {useState, useEffect} from 'react';
import PastPurchase from '../components/PurchaseHistory';
import useFetch from '../hooks/useFetch';

function ShopHistory() {
  const [history, setHistory] = useState([]);
  
  const url  = "/getPurchaseHistory";
  
  const [historyList, historyListError] = useFetch(url);
  
  useEffect(()=> {
    if (historyList !== null && historyList !== undefined)
    {
      setHistory(historyList.reverse());
    }
  }, [historyList])

  return (
    <div className="App">
      <div className="justify-center">
        {console.log(historyList)}
        {history?.map((pastPurchase) => {
          return (
          <PastPurchase
            key={pastPurchase.datetime}
            datetime={pastPurchase.datetime}
            totalCost={pastPurchase.totalCost}
            purchaseList={pastPurchase.purchases}
            />)})}
      </div>
    </div>
  );
}

export default ShopHistory;
