import React from 'react';
import {useState} from "react";

export default function SortableTable(props) {
    const ASC_ORDER = 0;
    const DESC_ORDER = 1;
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
    const dataRows  = data.slice(1)

    function compareRowsByColumn(row1, row2) {
        let res = 0;
        if (row1[sortingColumn] < row2[sortingColumn])
            res = -1;
        else if (row1[sortingColumn] > row2[sortingColumn])
            res = 1;
        else
            return 0;

        if ( sortingOrder === ASC_ORDER)
            return res;
        else
            return res*(-1);
    }

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
                {dataRows.sort(compareRowsByColumn).map(row => (
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