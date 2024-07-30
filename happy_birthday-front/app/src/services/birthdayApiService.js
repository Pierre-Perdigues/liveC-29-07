import Cookies from 'js-cookie';
const apiBaseUrl = process.env.REACT_APP_API_URL;

export const getTodaysBirthday = async () => {
  let queryUrl = `${apiBaseUrl}/getBirthday`;

  try {
    return await (await fetch(queryUrl)).json();
  } catch (error) {
    return false;
  }
};

export const getBirthdays = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/getAllBirthdays`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}` // Assuming you use cookies for token storage
      }
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to fetch birthdays');
    }
  } catch (error) {
    console.error('Error fetching birthdays:', error);
    return false;
  }
};

export const deleteBirthday = async (id) => {
  try {
    const response = await fetch(`${apiBaseUrl}/deleteBirthdays/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}` // Assuming you use cookies for token storage
      }
    });

    return response.ok;
  } catch (error) {
    console.error('Error deleting birthday:', error);
    return false;
  }
};

export const updateBirthday = async (id, firstname, lastname, email, birthday) => {
  try {
    const response = await fetch(`${apiBaseUrl}/updateBirthdays/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}` // Assuming you use cookies for token storage
      },
      body: JSON.stringify({ firstname, lastname, email, birthday })
    });

    return response.ok;
  } catch (error) {
    console.error('Error updating birthday:', error);
    return false;
  }
};

export const addBirthday = async (firstname, lastname, email, birthday) => {
  try {
    const response = await fetch(`${apiBaseUrl}/addBirthday`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}` // Assuming you use cookies for token storage
      },
      body: JSON.stringify({ firstname, lastname, email, birthday })
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to add birthday');
    }
  } catch (error) {
    console.error('Error adding birthday:', error);
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

export const getAllQuotes = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/getAllQuotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to fetch quotes');
    }
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return false;
  }
};

export const deleteQuote = async (id) => {
  try {
    const response = await fetch(`${apiBaseUrl}/quotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}` // Assuming you use cookies for token storage
      }
    });

    return response.ok;
  } catch (error) {
    console.error('Error deleting quote:', error);
    return false;
  }
};

export const updateQuote = async (id, quote, author) => {
  try {
    const response = await fetch(`${apiBaseUrl}/quotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}` // Assuming you use cookies for token storage
      },
      body: JSON.stringify({ quote, author })
    });

    return response.ok;
  } catch (error) {
    console.error('Error updating quote:', error);
    return false;
  }
};

export const addQuote = async (quote, author) => {
  try {
    const response = await fetch(`${apiBaseUrl}/addQuote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}` // Assuming you use cookies for token storage
      },
      body: JSON.stringify({ quote, author })
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to add quote');
    }
  } catch (error) {
    console.error('Error adding quote:', error);
    return false;
  }
};


export const postCSVanniv = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const token = Cookies.get('token');

  try {
    const response = await fetch(`${apiBaseUrl}/addBirthdayCSV`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}` // Add the token here
      },

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

export const loginUser = async (email, password) => {
  const payload = { email, password };

  try {
    const response = await fetch(`${apiBaseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Assuming the response returns some JSON
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Error during login:', error);
    return false;
  }
};
