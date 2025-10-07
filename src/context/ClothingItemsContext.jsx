import { useState, useEffect, useCallback, useMemo } from "react";
import {
  getAllItems,
  createItem,
  deleteItem,
  likeItem,
  disLikeItem,
} from "../utils/api";
import { ClothingItemsContext } from "./useClothingItems";

export const ClothingItemsProvider = ({ children }) => {
  const [isClothingItemsLoading, setIsClothingItemsLoading] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [clothingItemsError, setClothingItemsError] = useState({
    GET: null,
    POST: null,
    DELETE: null,
    PUT: null,
  });
  const [mutationMessage, setMutationMessage] = useState({
    POST: null,
    DELETE: null,
    PUT: null,
  });

  const refreshClothingItems = useCallback(async () => {
    setIsClothingItemsLoading(true);
    setClothingItemsError((e) => ({ ...e, GET: null }));
    try {
      const data = await getAllItems();
      setClothingItems(Array.isArray(data) ? data : []);
    } catch (error) {
      setClothingItemsError((e) => ({
        ...e,
        GET: error?.message || "Failed to fetch clothing items",
      }));
    } finally {
      setIsClothingItemsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshClothingItems();
  }, [refreshClothingItems]);

  // ---- Create
  const createClothingItem = useCallback(async (name, weather, imageUrl) => {
    setClothingItemsError((e) => ({ ...e, POST: null }));
    try {
      const created = await createItem(name, weather, imageUrl);
      setClothingItems((items) => [created, ...items]);
      setMutationMessage((m) => ({
        ...m,
        POST: `Created item ${created?.name ?? ""} (${created?._id ?? ""})`,
      }));
      return created;
    } catch (error) {
      const msg = error?.message || "Failed to create clothing item";
      setClothingItemsError((e) => ({ ...e, POST: msg }));
      throw error;
    }
  }, []);

  // ---- Delete
  const deleteClothingItem = useCallback(async (itemId) => {
    setClothingItemsError((e) => ({ ...e, DELETE: null }));
    try {
      await deleteItem(itemId); // DELETE /items/:id
      setClothingItems((items) => items.filter((it) => it._id !== itemId));
      setMutationMessage((m) => ({
        ...m,
        DELETE: `Deleted item ${itemId}`,
      }));
    } catch (error) {
      const msg = error?.message || "Failed to delete clothing item";
      setClothingItemsError((e) => ({ ...e, DELETE: msg }));
      throw error;
    }
  }, []);

  // ---- Like
  const likeClothingItem = useCallback(async (itemId) => {
    setClothingItemsError((e) => ({ ...e, PUT: null }));
    try {
      const updated = await likeItem(itemId); // PUT /items/:id/likes
      setClothingItems((items) =>
        items.map((it) => (it._id === itemId ? updated : it))
      );
      setMutationMessage((m) => ({
        ...m,
        PUT: `Liked item ${itemId}`,
      }));
      return updated;
    } catch (error) {
      const msg = error?.message || "Failed to like item";
      setClothingItemsError((e) => ({ ...e, PUT: msg }));
      throw error;
    }
  }, []);

  // ---- Dislike
  const dislikeClothingItem = useCallback(async (itemId) => {
    setClothingItemsError((e) => ({ ...e, PUT: null }));
    try {
      const updated = await disLikeItem(itemId); // DELETE /items/:id/likes
      setClothingItems((items) =>
        items.map((it) => (it._id === itemId ? updated : it))
      );
      setMutationMessage((m) => ({
        ...m,
        PUT: `Removed like on item ${itemId}`,
      }));
      return updated;
    } catch (error) {
      const msg = error?.message || "Failed to remove like";
      setClothingItemsError((e) => ({ ...e, PUT: msg }));
      throw error;
    }
  }, []);

  // ---- Selector: items by owner id (from state only)
  const getItemsByOwner = useCallback(
    (ownerId) => clothingItems.filter((it) => it.owner === ownerId),
    [clothingItems]
  );

  const value = useMemo(
    () => ({
      // state
      clothingItems,
      isClothingItemsLoading,
      clothingItemsError,
      mutationMessage,
      // actions
      refreshClothingItems,
      createClothingItem,
      deleteClothingItem,
      likeClothingItem,
      dislikeClothingItem,
      // selectors
      getItemsByOwner,
      // optional setter if you need direct control
      setClothingItems,
    }),
    [
      clothingItems,
      isClothingItemsLoading,
      clothingItemsError,
      mutationMessage,
      refreshClothingItems,
      createClothingItem,
      deleteClothingItem,
      likeClothingItem,
      dislikeClothingItem,
      getItemsByOwner,
    ]
  );

  return (
    <ClothingItemsContext.Provider value={value}>
      {children}
    </ClothingItemsContext.Provider>
  );
};
