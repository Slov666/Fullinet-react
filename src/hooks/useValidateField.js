import {useEffect, useState} from "react";

export default () => {
    const [valid, setValid] = useState()
    const [field, setField] = useState('')
    useEffect(()=> {
        (field && field.length > 20) ? setValid(false) : setValid(true)
        if (!field) {
            setValid(false)
        }

    },[field])
    return [valid, setField]
}