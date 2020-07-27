import React from 'react';
import ReactDOM from 'react-dom';

import SortableTable from "./SortableTable";

const App = () => {
    const data = [
        ['id', 'Name', 'Country', 'Email','Education'],
        [0, 'dan', 'Israel', 'dan@gmail.com','Bsc'],
        [1, 'dana', 'Israel', 'dana@gmail.com','Bsc'],
        [2, 'anna', 'Israel', 'anna@gmail.com','Msc'],
        [3, 'zina', 'UK', 'zina@gmail.com','Phd'],
    ];

    return (
        <div>
            <SortableTable data={data}/>
        </div>
    )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App/>, root);
