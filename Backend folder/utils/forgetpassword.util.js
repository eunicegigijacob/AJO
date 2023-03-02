const { customerServices } = require('../services/customer');
const { sendmessage } = require('./email');
const { messages } = require('./messages');
const { createToken } = require('./token.utils');

const forgetPassword = async (email, url, senderEmail) => {
  //check that user exists in database
  const user = await customerServices.findCustomerByEmail(email);

  if (!user) {
    throw Error(`There is no user with email address: ${email}`);
  }

  // create reset-token
  const resetToken = createToken.passwordResetToken(
    { id: user._id, email: user.email },
    user.password
  );

  // create reset link
  const link = `${url}/${user._id}/${resetToken}`;

  // create text to be sent
  const text = messages.resetPasswordMessage(user.firstname, link);

  const message = {
    from: senderEmail,
    to: user.email,
    subject: 'Reset password instructions',
    text,
  };

  try {
    await sendmessage(message);
  } catch (error) {
    throw Error(error);
  }
};

module.exports = { forgetPassword };
