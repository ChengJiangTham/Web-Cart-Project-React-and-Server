import {useState, useEffect} from 'react';
import { json } from 'react-router-dom';

export default function useFetch(url) {
    const [data, setData] = useState();
    const [errorStatus, setErrorStatus] = useState();

    useEffect(() => {
        fetch(url).then((response) => {
            if (!response.ok)
            {
                throw response.status;
            }

            return response.json();
        }).then((data) => {
            setData(data);
        }).catch((e) => {
            setErrorStatus(e);  
        })
    }, [])

    return [data, errorStatus]
}