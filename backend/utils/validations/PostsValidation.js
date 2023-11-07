const yup = require("yup");

const createCategoryValidation = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("Title is required. Please provide a title.")
    .min(3, "Title must be at least 3 characters long."),
});

module.exports = { createCategoryValidation };
