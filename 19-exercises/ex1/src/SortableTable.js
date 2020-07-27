import React from 'react';
import {useState} from "react";
import {ASC_ORDER,DESC_ORDER,buildColumnIndexesMap,sortRows} from './Sorter'

export default function SortableTable(props) {

    const {data} = props;
    const [sortingColumn, setSortingColumn] = useState(0);
    const [sortingOrder, setSortingOrder] = useState(ASC_ORDER);
    const header = (data.slice(0,1))[0]
    const columnsIndexesMap = buildColumnIndexesMap(header);
    const sortedDataRows  = sortRows( data.slice(1), sortingColumn, sortingOrder);

    function toggleSortingOrder()
    {
        setSortingOrder(order => (order + 1)%2);
    }

    function toggleSortingColumn(newColumn)
    {
        if (newColumn !== sortingColumn) {
            setSortingColumn(newColumn);
            setSortingOrder(ASC_ORDER);
        }
        else {
            toggleSortingOrder();
        }
    }

    return (
        <>
            <table>
                <thead>
                <tr key={header[0]}>
                    {
                        header.map( (column) => (
                            <th key={column}
                                onClick={() => toggleSortingColumn(columnsIndexesMap[column])}
                            >{column}</th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {sortedDataRows.map(row => (
                    <tr key={row[0]}>
                        {row.map((column, index) => (
                            <td key={index}>{column}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}