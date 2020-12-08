import React from "react";
import firebase from "./index";

function fetchCollectionData({collection, orderColumn, limit, setItems, conditions = []}) {
    let query = firebase.firestore().collection(collection);
    conditions.forEach(condition => {
        const [field, opStr, value] = condition;
        query = query.where(field, opStr, value);
    })
    query = query.orderBy(orderColumn);
    query = query.limit(limit);

    console.log('Before snapshot: conditions =', conditions);

    return query.onSnapshot(function (qs) {
            const addedDocsBatch = [];
            console.log('addedDocsBatch =', addedDocsBatch);
            const modifiedDocsBatch = [];
            console.log('modifiedDocsBatch =', modifiedDocsBatch);
            const removedDocsBatch = [];
            console.log('removedDocsBatch =', removedDocsBatch);
            qs.docChanges().forEach(function (change) {
                //@link:https://firebase.google.com/docs/firestore/query-data/listen
                if (change.type === "added") {
                    // console.log(`change.type === "added". New ${collection}: `, change.doc.data());
                    addedDocsBatch.push({id: change.doc.id, ...change.doc.data()});
                }
                if (change.type === "modified") {
                    // console.log(`change.type === "modified", Modified ${collection}: `, change.doc.data());
                    modifiedDocsBatch.push({id: change.doc.id, ...change.doc.data()});
                }
                if (change.type === "removed") {
                    // console.log(`change.type === "removed", Removed ${collection}: `, change.doc.data());
                    removedDocsBatch.push({id: change.doc.id, ...change.doc.data()});
                }
            });
            if (addedDocsBatch.length) {
                // we have the new item/s in batch
                setItems(prevData => {
                    //debugger
                    const newAddedData = prevData.concat(addedDocsBatch);
                    console.log('conditions =', conditions);
                    console.log('newAddedData =', newAddedData);
                    return (newAddedData);
                })
            } else if (modifiedDocsBatch.length) {
                /// modified item/s in batch
                setItems(prevData => {
                    //debugger
                    const modifiedData = prevData.map(prevItem => {
                        const modifiedItem = modifiedDocsBatch.find(modifiedItem => {
                            return modifiedItem.id === prevItem.id;
                        });
                        if (Boolean(modifiedItem)) {
                            return modifiedItem;
                        } else {
                            return prevItem;
                        }
                    })
                    console.log('conditions =', conditions);
                    console.log('modifiedData =', modifiedData);
                    return modifiedData;
                })
            } else if (removedDocsBatch.length) {
                /// modified item/s in batch
                setItems(prevData => {
                    //debugger
                    const filteredData = prevData.filter(prevItem => {
                        const removedItem = removedDocsBatch.find(removedItem => {
                            return removedItem.id === prevItem.id;
                        });
                        return !Boolean(removedItem);

                    })
                    console.log('conditions =', conditions);
                    console.log('filteredData =', filteredData);
                    return filteredData;
                })
            }
        }
    )

}

/**
 * Custom hook to connect to firestore collection
 *  and subscribe to listen for realtime updates.
 * @param activeRoomId
 * @param collection
 * @param orderColumn
 * @param limit
 * @param dependencies
 * @param conditions
 * @returns {*[]}
 */
function useCollectionData({activeRoomId,collection,orderColumn,limit,
                               dependencies = [],conditions=[]}) {
    const [items, setItems] = React.useState([]);

    React.useEffect( () => {
        let unsubscribe = null;
        if ( activeRoomId ) {
            unsubscribe = fetchCollectionData(
                {
                    collection,
                    orderColumn,
                    limit,
                    setItems,
                    conditions
                }
            );
        }

        return function abort() {
            console.log(`UserItemsList useEffect abort`);
            if ( Boolean(unsubscribe) ) {
                unsubscribe();
                setItems([]);
            }
        }
    }, dependencies);

    return items;
}

export {
    useCollectionData
}