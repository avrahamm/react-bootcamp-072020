const ASC_ORDER = 0;
const DESC_ORDER = 1;

function buildColumnIndexesMap(header)
{
    const columnIndexesMap = {}
    header.forEach( (title, index) => {
        columnIndexesMap[title] = index;
    })
    return columnIndexesMap;

    // const columnIndexesMap = {
    //     'id': 0,
    //     'Name': 1,
    //     'Country': 2,
    //     'Email': 3
    // }
}

function sortRows(dataRows, sortingColumn, sortingOrder)
{
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
    return dataRows.sort(compareRowsByColumn)
}

export {
    ASC_ORDER,
    DESC_ORDER,
    buildColumnIndexesMap,
    sortRows
};