import React from 'react';
import {useState} from 'react';

export function Carousel(props) {
    const [currentPage, setCurrentPage] = useState(0);
    const numberOfPages = React.Children.count(props.children);

    function pageComponent(pageIndex) {
        const pages = React.Children.toArray(props.children);
        const page = pages[pageIndex];
        return page;
    }

    return (
    <div className="app">
        <button
            disabled={currentPage === 0}
            onClick={(e) => setCurrentPage(v => v - 1)}
        >&lt; Previous Page
        </button>
        <button
            disabled={currentPage >= numberOfPages - 1}
            onClick={(e) => setCurrentPage(v => v + 1)}
        >Next Page &gt;</button>
        { pageComponent(currentPage) }
    </div>
  );
}

