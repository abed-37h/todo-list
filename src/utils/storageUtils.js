
export const getItems = (storageKey) => {
    const itemsJSON = localStorage.getItem(storageKey);
    return itemsJSON ? JSON.parse(itemsJSON) : [];
}

export const saveItem = (storageKey, item) => {
    const items = getItems(storageKey);
    items.push(item);
    localStorage.setItem(storageKey, JSON.stringify(items));
}

export const deleteItem = (storageKey, itemId) => {
    const items = getItems(storageKey).filter(item => item.id !== itemId);
    localStorage.setItem(storageKey, JSON.stringify(items));
}

export const updateItem = (storageKey, updatedItem) => {
    const items = getItems(storageKey).map(item =>
        item.id === updatedItem.id ? updatedItem : item
    );
    localStorage.setItem(storageKey, JSON.stringify(items));
}

export const clearItems = (storageKey) => {
    localStorage.removeItem(storageKey);
    localStorage.removeItem(`${storageKey}_counter`);
}
