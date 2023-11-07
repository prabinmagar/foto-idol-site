const yup = require("yup");

const orderSchemaValidation = yup.object().shape({
  shippingInfo: yup.object().shape({
    address: yup.string().required("Please provide a valid address."),
    city: yup.string().required("City field cannot be left blank."),
    phoneNo: yup.string().required("A valid phone number is essential for delivery."),
    postalCode: yup.string().required("Please enter the postal code for accurate delivery."),
    country: yup.string().required("Country selection is mandatory."),
  }),
});

const createHomeSliderValidation = yup.object().shape({
  title: yup.string().trim().required("Title is required. Please provide a title.").min(10, "Title must be at least 10 characters long.").max(100, "Title must be a maximum of 200 characters long."),
  subtitle: yup.string().trim().required("Subtitle is required. Please provide a subtitle.").min(10, "Subtitle must be at least 10 characters long.").max(100, "Title must be a maximum of 200 characters long."),
  description: yup.string().trim().required("Description is required. Please provide a description.").min(10, "Description must be at least 10 characters long.").max(200, "Description must be a maximum of 200 characters long."),
});

// not used now
const create = yup.object().shape({
  title: yup.string().trim().required("Title is required. Please provide a title.").min(3, "Title must be at least 3 characters long."),
  salary: yup.string().trim().required("Salary is required. Please provide a salary."),
  description: yup.string().trim().required("Description is required. Please provide a description."),
});
module.exports = { create, orderSchemaValidation, createHomeSliderValidation };
