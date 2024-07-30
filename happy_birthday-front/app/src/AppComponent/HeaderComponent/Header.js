import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { loginUser } from '../../services/birthdayApiService'; // Import the login function
const { DateTime } = require('luxon');


class HeaderComponent extends Component {

  constructor() {
    super();
    this.state = {
      currentTime: DateTime.local(),
      showLoginPopup: false,
      mail: '', // Add mail state
      password: '',  // Add password state
      token : Cookies.get('token')
    };
  }
  

  
  componentDidMount() {
    this.intervalID = setInterval(this.updateTime, 1000); // Mettre à jour toutes les secondes
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  updateTime = () => {
    this.setState({
      currentTime: DateTime.local(),
    });
  };

  handleLoginClick = () => {
    this.setState({ showLoginPopup: true });
  };
  
  handleLogoutClick = () => {
    Cookies.remove('token');
    window.location.reload();
  };

  handleClosePopup = () => {
    this.setState({ showLoginPopup: false });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleLoginSubmit = async (event) => {
    event.preventDefault();
    const { mail, password } = this.state;

    const result = await loginUser(mail, password);
    if (result) {
      alert('Login successful');
      Cookies.set('token', result.token, { expires: 1 });
      window.location.reload(); // Reload the page upon successful login
    } else {
      alert('Login failed');
    }
  }

  render() {
    const { currentTime, showLoginPopup } = this.state;
    const currentDate = DateTime.now().setLocale('fr').toFormat('cccc dd MMMM yyyy');
    const token = Cookies.get('token')

    return (
      <div>
        <div className="fixed min-w-full bg-white py-6 px-12 flex border-b-2 border-slate-900 place-content-between font-bison text-4xl tracking-wide uppercase">
          <div>
            <h1>Citation et anniversaires</h1>
          </div>
          <div>
            <span>
              {currentDate} | {currentTime.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}
            </span>
          </div>
          <div>
            {token? (
            <button
              onClick={this.handleLogoutClick}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Deconnexion
            </button>) : (
              <button
              onClick={this.handleLoginClick}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Se Connecter
            </button>
            )}
          </div>
        </div>

        {showLoginPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded shadow-lg z-50">
              <h2 className="text-2xl mb-4">Connexion</h2>
              <form onSubmit={this.handleLoginSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Email</label>
                  <input
                    type="text"
                    name="mail"
                    value={this.state.mail}
                    onChange={this.handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-bold mb-2">Mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Connexion
                  </button>
                  <button
                    type="button"
                    onClick={this.handleClosePopup}
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default HeaderComponent;
