export async function validateFormData(formData: FormData) {
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();

  if (!title || title.length === 0) {
    return {
      error: "Title is required.",
    };
  }

  if (!description || description.length === 0) {
    return {
      error: "Description is required.",
    };
  }

  return {
    title,
    description,
  };
};
