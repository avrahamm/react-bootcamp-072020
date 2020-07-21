import React from 'react';

export default function Person(props) {
  const { name, kids } = props;
  console.log(kids)
  let kidsStr = ''
  if( kids) {
    kidsStr = `Your kids are ${kids.join(", ")}`
  }
  return (
      <>
        <h2>Hello {name}</h2>
        {kidsStr}
      </>
  );
}

