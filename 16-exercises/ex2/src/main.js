import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import Filter from './filter';
import ItemsList from './ItemsList';


const ListWithFilter = () => {
    const initialItems = ["a1", "a12", "b1", "b12", "c3", "c34", "d1234", "abc", "dee"]
    const [pattern, setPattern] = useState("")
    const [itemsList, setItemsList] = useState(initialItems)

    function updatePattern(newPattern)
    {
        setPattern(newPattern)
        let newItemsList = initialItems.filter( (item) => item.includes(newPattern))
        setItemsList(newItemsList)
    }

  return (
    <div>
      <Filter updatePattern={updatePattern}/>
      <hr />
      <ItemsList itemsList={itemsList}  />
    </div>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<ListWithFilter />, root);
