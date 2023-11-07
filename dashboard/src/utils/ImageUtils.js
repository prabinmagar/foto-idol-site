export const isImageValid = (file) => {
  const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];
  return allowedFormats.includes(file.type);
};
