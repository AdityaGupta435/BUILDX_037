const SAVED_ITEMS_KEY = "scholarmatch_saved_items";

/* =========================
   GET SAVED ITEMS
========================= */

export const getSavedItems = () => {
  try {
    const saved = localStorage.getItem(
      SAVED_ITEMS_KEY
    );

    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error(
      "Unable to read saved items:",
      error
    );

    return [];
  }
};


/* =========================
   CHECK SAVED
========================= */

export const isItemSaved = (id, type) => {
  const items = getSavedItems();

  return items.some(
    (item) =>
      item.id === id &&
      item.type === type
  );
};


/* =========================
   SAVE ITEM
========================= */

export const saveItem = (item, type) => {
  const items = getSavedItems();

  const alreadySaved = items.some(
    (savedItem) =>
      savedItem.id === item.id &&
      savedItem.type === type
  );

  if (alreadySaved) {
    return items;
  }

  const newItem = {
    ...item,
    type,
    savedAt: new Date().toISOString(),
  };

  const updatedItems = [
    ...items,
    newItem,
  ];

  localStorage.setItem(
    SAVED_ITEMS_KEY,
    JSON.stringify(updatedItems)
  );

  return updatedItems;
};


/* =========================
   REMOVE ITEM
========================= */

export const removeSavedItem = (
  id,
  type
) => {
  const items = getSavedItems();

  const updatedItems = items.filter(
    (item) =>
      !(
        item.id === id &&
        item.type === type
      )
  );

  localStorage.setItem(
    SAVED_ITEMS_KEY,
    JSON.stringify(updatedItems)
  );

  return updatedItems;
};


/* =========================
   TOGGLE SAVE
========================= */

export const toggleSavedItem = (
  item,
  type
) => {
  if (isItemSaved(item.id, type)) {
    return removeSavedItem(
      item.id,
      type
    );
  }

  return saveItem(item, type);
};


/* =========================
   CLEAR ALL
========================= */

export const clearSavedItems = () => {
  localStorage.removeItem(
    SAVED_ITEMS_KEY
  );
};