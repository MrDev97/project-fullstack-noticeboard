const validateEmail = (email) => {
  let re = /([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/;
  return re.test(email);
};

module.exports = validateEmail;
