import React from 'react';

export default function Filter(props) {
  const {updatePattern} = props;

  return (
    <>
      <p>Filter</p>
      <input type="text" onChange={ (e) => updatePattern(e.target.value)}/>
    </>
  );
}


