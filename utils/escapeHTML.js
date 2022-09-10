const escapeHTML = (htmlStr) => {
  return htmlStr.replace(/(<([^>]+)>)/gi, '');
};

module.exports = escapeHTML;
