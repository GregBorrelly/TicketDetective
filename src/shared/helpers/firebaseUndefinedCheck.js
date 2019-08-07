const sanitizeObject = obj => {
  const sanitizedObject = {};
  const keys = Object.keys(obj);

  keys.forEach(key => {
    if (obj[key]) {
      sanitizedObject[key] = obj[key];
    } else {
      sanitizedObject[key] = null;
    }
  });
  return sanitizedObject;
};

export default sanitizeObject;
