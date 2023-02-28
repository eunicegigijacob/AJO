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

  // Incorrect email for login
  if (err.message === 'Incorrect email') {
    errors.email = 'That email is not registered';
  }

  // Incorrect password for login
  if (err.message === 'Incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // catch for other undefined errors
  // else {
  //   errors.error = err.message;
  // }

  return errors;
};

module.exports = { handleErrors };
