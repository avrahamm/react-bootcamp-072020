import React from 'react';
import ReactDOM from 'react-dom';
import {useState, useRef, useEffect} from 'react';

const Box = React.forwardRef((
    {total, index, activeIndex, content}, ref) => {

    const style = {
        width: "100px",
        height: "100px",
        border: "1px solid",
        display: "inline-block",
        margin: "25px"
    };
    return (
        <div ref={ref} style={style} tabIndex={0}>
            { Boolean(index===activeIndex) ? content : index}
        </div>
    );

})

const App = () => {
    const total = 4;
    const boxRefs = Array(4).fill(0).map( () => useRef(null));
    const [activeIndex, setActiveIndex] = useState(0);
    const [content, setContent] = useState("*");

    useEffect( () => {
        boxRefs[activeIndex].current.focus();
    },[activeIndex])

    function handleKeyPress(e) {
        const value = e.key;
        console.log(value);
        setContent(value);
        setActiveIndex( i => (i+1)%total);
    }

    return (
        <div style={{border: "1px solid"}}
             onKeyDown={handleKeyPress}

        >
            {Array(4).fill(0).map(
                (item, index) =>
                    <Box key={index}
                         total={total}
                         activeIndex={activeIndex}
                         index={index}
                         content={content}
                         ref={boxRefs[index]}
                    />
                )
            }
        </div>
    )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App/>, root);
