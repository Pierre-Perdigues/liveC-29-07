const apiBaseUrl = process.env.REACT_APP_API_URL;

export const getTodaysBirthday = async () => {
  let queryUrl = `${apiBaseUrl}/getBirthday`;

  try {
    return await (await fetch(queryUrl)).json();
  } catch (error) {
    return false;
  }
};

export const getRandomQuote = async () => {
  let queryUrl = `${apiBaseUrl}/getQuote`;

  try {
    return await (await fetch(queryUrl)).json();
  } catch (error) {
    return false;
  }
};

export const postCSVanniv = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${apiBaseUrl}/addBirthday`, {
      method: 'POST',
      body: formData,
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const postCSVquotes = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${apiBaseUrl}/addCitation`, {
      method: 'POST',
      body: formData,
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

