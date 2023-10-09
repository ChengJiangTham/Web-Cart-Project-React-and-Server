import {useState, useEffect} from 'react';

export default function usePost(url, successFnc) {
    const [errorStatus, setErrorStatus] = useState();

    const PostData = (postData) => 
    {
        fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(postData)
            }).then((response) => {
              if (!response.ok)
              {
                throw response.status;
              }

              successFnc();
            }).catch((e) => {
              console.log(e) 
            })
    }

    return [PostData, errorStatus]
}