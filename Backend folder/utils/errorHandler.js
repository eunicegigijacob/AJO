const handleErrors = (err) => {
  console.log(err.message, err.code);

  let errors = {};
  //Duplicate key errors
  if (err.code === 11000) {
    console.log(Object.keys(err.keyPattern));
    errors[Object.keys(err.keyPattern)] = `${Object.keys(
      err.keyPattern
    )} already exists for another user`;
  }

  //validation Errors

  if (err.message.includes('Customer validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports = { handleErrors };
