import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from "react";

function SelectableList(props) {
  const { items } = props;
  const [activeItems, setActiveItems] = useState(items);
  const [selectedItems, setSelectedItems] = useState([]);

    function reset()
    {
        setActiveItems(items);
        setSelectedItems([])
    }

    function deleteItems()
    {
        setActiveItems(activeItems.filter( item => !selectedItems.includes(item)));
    }

    function toggleItem(add, item)
    {
        if(add) {
            setSelectedItems([...selectedItems, item]);
        } else {
            setSelectedItems(selectedItems.filter( x=> x !== item));
        }
    }

  return (
    <>
      <button onClick={deleteItems}>Delete</button>
      <button onClick={reset}>Reset</button>
      <ul>
        {activeItems.map(item => (
          <li key={item}>
            <label>
              <input
                  type="checkbox"
                  onChange={e => toggleItem(e.target.checked, item)}
                  checked={selectedItems.includes(item)}
              />
              {item}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}


const App = () => {
  const items = ['one', 'two', 'three', 'four', 'five'];

  return (
    <div>
      <SelectableList items={items} />
    </div>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);
