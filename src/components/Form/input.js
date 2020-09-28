import React, {useEffect, useRef} from 'react';
import {useField} from '@unform/core';


export default function Input ({name, ...rest}){
    const {defaultValue, fieldName, registerField, error} = useField(name);

    const inputRef = useRef(null);

    useEffect(() => {
       registerField({
           name: fieldName,
           ref: inputRef.current,
           path: 'value'
       })
    }, [fieldName, registerField]);

    return (
        <div>
            <input ref={inputRef} defaultValue={defaultValue} {...rest}/>

            {error && <span style={{color: '#f00'}}>{error}</span>}
        </div>
    )
}

