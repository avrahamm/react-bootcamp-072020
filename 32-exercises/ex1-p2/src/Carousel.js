import React from 'react';

export function Carousel(props) {
    const pages = React.Children.toArray(props.children);

    return (
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
            {/*Indicators*/}
            <ol className="carousel-indicators">
                {
                    pages.map( (index) => (
                        <li data-target="#myCarousel"
                            key={index}
                            data-slide-to={index}
                            className={index === 0 ? "active" : ''}>
                        </li>
                    ))
                }
            </ol>

            {/*Wrapper for slides*/}
            <div className="carousel-inner">
                {
                    pages.map( (page, index) => (
                        <div className={index === 0 ? "item active" : "item"}>
                            {page}
                        </div>
                    ))
                }
            </div>

            {/*Left and right controls*/}
            <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left"/>
                <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#myCarousel" data-slide="next">
                <span className="glyphicon glyphicon-chevron-right"/>
                <span className="sr-only">Next</span>
            </a>
        </div>
  );
}

