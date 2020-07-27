import React from 'react';
import {useState} from "react";
import {ASC_ORDER,DESC_ORDER,sortRows} from './Sorter'

export default function SortableTable(props) {

    const ID_COL = 0
    const NAME_COL = 1
    const COUNTRY_COL = 2
    const EMAIL_COL = 3

    const columnIndexes = {
        'id': ID_COL,
        'Name': NAME_COL,
        'Country': COUNTRY_COL,
        'Email': EMAIL_COL
    }

    const {data} = props;
    const [sortingColumn, setSortingColumn] = useState(ID_COL);
    const [sortingOrder, setSortingOrder] = useState(ASC_ORDER);
    const header = (data.slice(0,1))[0]
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
                        header.map( (column, index) => (
                            <th key={column}
                                onClick={() => toggleSortingColumn(columnIndexes[column])}
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