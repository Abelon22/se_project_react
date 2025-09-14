import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/api";
import { ClothingItemsContext } from "./useClothingItems";

export const ClothingItemsProvider = ({ children }) => {
  const [isClothingItemsLoading, setIsClothingItemsLoading] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [clothingItemsError, setClothingItemsError] = useState({
    GET: null,
    POST: null,
    DELETE: null,
  });

  const [mutationMessage, setMutationMessage] = useState({
    POST: null,
    DELETE: null,
  });

  useEffect(() => {
    async function fetchClothingItems() {
      setIsClothingItemsLoading(true);
      try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch clothing items");
        }

        const data = await response.json();
        console.log("Upon component mount", data);

        if (data.length > 0) {
          setClothingItems(data);
        } else {
          setClothingItems([]);
        }
      } catch (error) {
        setClothingItemsError((currentError) => ({
          ...currentError,
          GET: error.message,
        }));
        console.error("Error fetching clothing items:", error);
      } finally {
        setIsClothingItemsLoading(false);
        setClothingItemsError((currentError) => ({
          ...currentError,
          GET: null,
        }));
      }
    }
    fetchClothingItems();
  }, []);

  const createClothingItem = async ({ name, weather, imageUrl }) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify({ name, weather, imageUrl }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to create clothing item");
      }

      const data = await response.json();
      console.log("Upon creating a new clothing item", data);
      if (data) {
        setClothingItems((currentItems) => [data, ...currentItems]);
        setMutationMessage({
          POST: `Successfully created clothing item with id ${data._id}`,
        });
      }
    } catch (error) {
      setClothingItemsError({ ...clothingItemsError, POST: error.message });
      console.error("Error creating clothing item:", error);
    } finally {
      setClothingItemsError(null);
    }
  };

  const deleteClothingItem = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete clothing item");
      }

      const data = await response.json();
      if (data) {
        setClothingItems((currentItems) =>
          currentItems.filter((item) => item._id !== id)
        );
        setMutationMessage({
          DELETE: `Successfully deleted clothing item with id ${id}`,
        });
      }
    } catch (error) {
      setClothingItemsError({ ...clothingItemsError, DELETE: error.message });
      console.error("Error deleting clothing item:", error);
    } finally {
      setClothingItemsError(null);
    }
  };

  return (
    <ClothingItemsContext.Provider
      value={{
        clothingItems,
        isClothingItemsLoading,
        clothingItemsError,
        mutationMessage,
        createClothingItem,
        deleteClothingItem,
      }}
    >
      {children}
    </ClothingItemsContext.Provider>
  );
};
