import React from 'react';
import { useState } from "react"



export function SearchInput({ width = '', onSearch }) {
    const [inputValue, setInputValue] = useState("")

    const inputContainerStyle = {
        width: width,
    }

    function handleChange(event) {
        setInputValue(event.target.value)
        onSearch(event.target.value)
    }


    return <section className="input-container" style={inputContainerStyle}>
        <img className="search-icon" src="src\assets\svgs\Search.svg" alt="" />

        <input
            type="text"
            placeholder="Search"
            value={inputValue}
            onChange={handleChange}
        />
        <div className="clear-search">X</div>
    </section>




}