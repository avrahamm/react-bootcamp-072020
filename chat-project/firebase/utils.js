import firebase from "./index";

function fetchCollectionData({collection, orderColumn, limit, updateData, conditions=[]}) {
    let query = firebase.firestore().collection(collection);
    conditions.forEach(condition => {
        const [field, opStr, value] = condition;
        query = query.where(field, opStr, value);
    })
    query = query.orderBy(orderColumn);
    query = query.limit(limit);

    query.onSnapshot(function (qs) {
        const addedDocsBatch = [];
        const modifiedDocsBatch = [];
        const removedDocsBatch = [];
            qs.docChanges().forEach(function (change) {
                //@link:https://firebase.google.com/docs/firestore/query-data/listen
                if (change.type === "added") {
                    console.log(`change.type === "added". New ${collection}: `, change.doc.data());
                    addedDocsBatch.push({id: change.doc.id, ...change.doc.data()});
                }
                if (change.type === "modified") {
                    console.log(`Modified ${collection}: `, change.doc.data());
                    modifiedDocsBatch.push({id: change.doc.id, ...change.doc.data()});
                }
                if (change.type === "removed") {
                    console.log(`Removed ${collection}: `, change.doc.data());
                    removedDocsBatch.push({id: change.doc.id, ...change.doc.data()});
                }
            });
            if (addedDocsBatch.length) {
                // we have the new item/s in batch
                updateData(prevData => {
                    return prevData.concat(addedDocsBatch);
                })
            } else if (modifiedDocsBatch.length) {
                /// modified item/s in batch
                updateData(prevData => {
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
                    return modifiedData;
                })
            } else if (removedDocsBatch.length) {
                /// modified item/s in batch
                updateData(prevData => {
                    const filteredData = prevData.filter(prevItem => {
                        const removedItem = removedDocsBatch.find(removedItem => {
                            return removedItem.id === prevItem.id;
                        });
                        return !Boolean(removedItem);

                    })
                    return filteredData;
                })
            }
        }
    )
}

export {
    fetchCollectionData,
}