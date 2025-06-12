
/**
 * Gets array of objects stored with specific storage key
 * @param {String} storageKey 
 * @returns {Array<Object>}
 */
export const getItems = (storageKey) => {
    const itemsJSON = localStorage.getItem(storageKey);
    return itemsJSON ? JSON.parse(itemsJSON) : [];
}

/**
 * Saves item in an array stored with specific storage key
 * @param {String} storageKey 
 * @param {Object} item 
 */
export const saveItem = (storageKey, item) => {
    const items = getItems(storageKey);
    items.push(item);
    localStorage.setItem(storageKey, JSON.stringify(items));
}

/**
 * Deletes item that has specific id
 * @param {String} storageKey 
 * @param {String | Number} itemId 
 */
export const deleteItem = (storageKey, itemId) => {
    const items = getItems(storageKey).filter(item => item.id !== itemId);
    localStorage.setItem(storageKey, JSON.stringify(items));
}

/**
 * Updates specific item
 * @param {String} storageKey 
 * @param {object} updatedItem 
 */
export const updateItem = (storageKey, updatedItem) => {
    const items = getItems(storageKey).map(item =>
        item.id === updatedItem.id ? updatedItem : item
    );
    localStorage.setItem(storageKey, JSON.stringify(items));
}

/**
 * Clears items stored with specific storage key from storage
 * @param {String} storageKey 
 */
export const clearItems = (storageKey) => {
    localStorage.removeItem(storageKey);
}
