import { useState } from "react";

export const useModalForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const [formError, setFormError] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name: field, value } = e.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formError[field]) {
      setFormError((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e, createClothingItem, handleClose) => {
    e.preventDefault();

    const errors = { name: "", imageUrl: "", weather: "" };
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.imageUrl.trim()) {
      errors.imageUrl = "Image URL is required";
    } else if (
      !formData.imageUrl.startsWith("http://") &&
      !formData.imageUrl.startsWith("https://")
    ) {
      errors.imageUrl =
        "Please enter a valid URL (must start with http:// or https://)";
    }
    if (!formData.weather) errors.weather = "Please select a weather type";

    if (errors.name || errors.imageUrl || errors.weather) {
      setFormError(errors);
      return;
    }

    setIsLoading(true);
    try {
      await createClothingItem(formData);
      setFormData({ name: "", imageUrl: "", weather: "" });
      setFormError({ name: "", imageUrl: "", weather: "" });
    } catch (error) {
      setFormError({
        name: error?.name || "",
        imageUrl: error?.imageUrl || "",
        weather: error?.weather || "",
      });
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  return {
    setFormData,
    setFormError,
    setIsLoading,
    formData,
    formError,
    isLoading,
    handleInputChange,
    handleSubmit,
  };
};
