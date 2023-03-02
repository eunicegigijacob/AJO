const messages = {
  resetPasswordMessage: (firstname, resetLink) => {
    return `Hello ${firstname}, \nsomeone just requested to change your password. You can do
     this through the link below.\n${resetLink}\nIf you didn't request this, please ignore this email.
      Your password will stay safe and won't be changed.`;
  },
};

module.exports = { messages };
