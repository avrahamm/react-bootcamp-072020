import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import Filter from './filter';
import ItemsList from './ItemsList';


const ListWithFilter = () => {
    const initialItems = ["a1", "a12", "b1", "b12", "c3", "c34", "d1234", "abc", "dee"]
    const [pattern, setPattern] = useState("")
  // You don't really need to save itemList in state, do you?
        // Fixed. Removed itemList from state.

    function updatePattern(newPattern)
    {
        setPattern(newPattern)
    }

  return (
    <div>
      <Filter updatePattern={updatePattern}/>
      <hr />
      <ItemsList itemsList={initialItems.filter( (item) => item.includes(pattern))}  />
    </div>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<ListWithFilter />, root);
