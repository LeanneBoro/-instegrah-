import React from 'react';


export function SearchInput({ width = '' }) {

    const inputContainerStyle = {
        width: width, 
    }


    return <section className="input-container" style={inputContainerStyle}>
        <img className="search-icon" src="src\assets\svgs\Search.svg" alt="" />

        <input type="text" placeholder="Search" />
        <div className="clear-search">X</div>
    </section>




}