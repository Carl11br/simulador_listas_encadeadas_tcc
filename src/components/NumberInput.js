import React from "react";

function NumberInput({setState, maxLength = 3})
{
    function handleChange(event)
    {
        let value = event.target.value.replace(/\D/g, '')
        event.target.value = value
        setState(value);
    }
    return (
        <input placeholder='' onChange={handleChange} type="text" maxLength={maxLength} ></input>
    )
}

export default NumberInput