import React from 'react';

export default function ItemsList(props) {
    const {itemsList} = props

  return (
      <ul style={{display: "flex", flexDirection: "column", alignItems: "left"}}>
          {
              itemsList.map((item, index) =>{
                  return (
                    <li
                        key={index}
                    >{item}</li>
                  )
              })
          }
      </ul>
  );
}

