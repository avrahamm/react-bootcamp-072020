import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

function SelectableList(props) {
  const { items } = props;
  const [selectedItems, setSelectedItems] = useState(new Set());

  function toggleItem(add, item)
  {
      console.log(add, item)
      console.log(`toggleItem: 1) selectedItems`)
      console.log(selectedItems)

      if( add) {
          selectedItems.add(item)
      } else {
          selectedItems.delete(item)
      }
      console.log(`toggleItem: 2) selectedItems`)
      console.log(selectedItems)
      // let updatedArr = [ ...selectedItems ];
      // let updatedArr = Array.from(selectedItems);
      // let updatedSet = new Set(updatedArr)
      setSelectedItems(new Set(selectedItems))
  }

  return (
    <>
      <p>Selected Items: {Array.from(selectedItems).join(', ')}</p>
      <ul>
        {items.map(item => (
          <li key={item} style={{ direction: "rtl" }}>
            <label>
              {item}
              <input type="checkbox" checked={selectedItems.has(item)}
                     onChange={e => toggleItem(e.target.checked, item)}/>
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}


const App = () => {
  const days = ['Sunday', 'Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return (
    <div>
      <SelectableList items={days}/>
    </div>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);
