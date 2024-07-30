import React, { Component } from 'react';
import { postCSVanniv, postCSVquotes, getAllQuotes, deleteQuote, updateQuote, addQuote, getBirthdays, deleteBirthday, updateBirthday, addBirthday } from '../../services/birthdayApiService'; // Import necessary functions

class FooterComponent extends Component {
  constructor() {
    super();
    this.state = {
      quotes: [],
      birthdays: [],
      showQuotes: false,
      showBirthdays: false,
      editQuoteId: null,
      editQuoteText: '',
      editQuoteAuthor: '',
      newQuoteText: '',
      newQuoteAuthor: '',
      showAddQuoteForm: false,
      editBirthdayId: null,
      editFirstname: '',
      editLastname: '',
      editEmail: '',
      editBirthday: '',
      newFirstname: '',
      newLastname: '',
      newEmail: '',
      newBirthday: '',
      showAddBirthdayForm: false
    };
  }

  handleImport = (type) => (event) => {
    const file = event.target.files[0];
    if (file) {
      const confirmUpload = window.confirm(`Voulez-vous vraiment importer ce fichier ${type} ?`);
      if (confirmUpload) {
        this.uploadFile(file, type);
      }
    }
  };

  uploadFile = async (file, type) => {
    const success = type === 'Anniversaire' ? await postCSVanniv(file) : await postCSVquotes(file);
    if (success) {
      alert(`Fichier ${type} importé avec succès.`);
    } else {
      alert(`Échec de l'importation du fichier ${type}.`);
    }
  };

  handleManageQuotes = async () => {
    const quotes = await getAllQuotes();
    if (quotes) {
      this.setState({ quotes, showQuotes: true, showBirthdays: false });
    } else {
      alert("Échec de la récupération des citations.");
    }
  };

  handleManageBirthdays = async () => {
    const birthdays = await getBirthdays();
    if (birthdays) {
      this.setState({ birthdays, showBirthdays: true, showQuotes: false });
    } else {
      alert("Échec de la récupération des anniversaires.");
    }
  };

  handleCloseQuotes = () => {
    this.setState({ showQuotes: false });
  };

  handleCloseBirthdays = () => {
    this.setState({ showBirthdays: false });
  };

  handleDeleteQuote = async (id) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cette citation ?");
    if (confirmDelete) {
      const success = await deleteQuote(id);
      if (success) {
        this.setState((prevState) => ({
          quotes: prevState.quotes.filter((quote) => quote.id !== id)
        }));
        alert('Citation supprimée avec succès.');
      } else {
        alert('Échec de la suppression de la citation.');
      }
    }
  };

  handleEditQuote = (quote) => {
    this.setState({ editQuoteId: quote.id, editQuoteText: quote.quote, editQuoteAuthor: quote.author });
  };

  handleUpdateQuote = async (id) => {
    const { editQuoteText, editQuoteAuthor } = this.state;
    const success = await updateQuote(id, editQuoteText, editQuoteAuthor);
    if (success) {
      this.setState((prevState) => ({
        quotes: prevState.quotes.map((quote) =>
          quote.id === id ? { ...quote, quote: editQuoteText, author: editQuoteAuthor } : quote
        ),
        editQuoteId: null,
        editQuoteText: '',
        editQuoteAuthor: ''
      }));
      alert('Citation modifiée avec succès.');
    } else {
      alert('Échec de la modification de la citation.');
    }
  };

  handleAddQuote = async () => {
    const { newQuoteText, newQuoteAuthor } = this.state;
    const success = await addQuote(newQuoteText, newQuoteAuthor);
    if (success) {
      this.setState((prevState) => ({
        quotes: [...prevState.quotes, { id: success.id, quote: newQuoteText, author: newQuoteAuthor }],
        newQuoteText: '',
        newQuoteAuthor: '',
        showAddQuoteForm: false
      }));
      alert('Citation ajoutée avec succès.');
    } else {
      alert('Échec de l\'ajout de la citation.');
    }
  };

  handleDeleteBirthday = async (id) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet anniversaire ?");
    if (confirmDelete) {
      const success = await deleteBirthday(id);
      if (success) {
        this.setState((prevState) => ({
          birthdays: prevState.birthdays.filter((birthday) => birthday.id !== id)
        }));
        alert('Anniversaire supprimé avec succès.');
      } else {
        alert('Échec de la suppression de l\'anniversaire.');
      }
    }
  };

  handleEditBirthday = (birthday) => {
    this.setState({
      editBirthdayId: birthday.id,
      editFirstname: birthday.firstname,
      editLastname: birthday.lastname,
      editEmail: birthday.email,
      editBirthday: birthday.birthday
    });
  };

  handleUpdateBirthday = async (id) => {
    const { editFirstname, editLastname, editEmail, editBirthday } = this.state;
    const success = await updateBirthday(id, editFirstname, editLastname, editEmail, editBirthday);
    if (success) {
      this.setState((prevState) => ({
        birthdays: prevState.birthdays.map((birthday) =>
          birthday.id === id ? { ...birthday, firstname: editFirstname, lastname: editLastname, email: editEmail, birthday: editBirthday } : birthday
        ),
        editBirthdayId: null,
        editFirstname: '',
        editLastname: '',
        editEmail: '',
        editBirthday: ''
      }));
      alert('Anniversaire modifié avec succès.');
    } else {
      alert('Échec de la modification de l\'anniversaire.');
    }
  };

  handleAddBirthday = async () => {
    const { newFirstname, newLastname, newEmail, newBirthday } = this.state;
    const success = await addBirthday(newFirstname, newLastname, newEmail, newBirthday);
    if (success) {
      this.setState((prevState) => ({
        birthdays: [...prevState.birthdays, { id: success.id, firstname: newFirstname, lastname: newLastname, email: newEmail, birthday: newBirthday }],
        newFirstname: '',
        newLastname: '',
        newEmail: '',
        newBirthday: '',
        showAddBirthdayForm: false
      }));
      alert('Anniversaire ajouté avec succès.');
    } else {
      alert('Échec de l\'ajout de l\'anniversaire.');
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      quotes,
      birthdays,
      showQuotes,
      showBirthdays,
      editQuoteId,
      editQuoteText,
      editQuoteAuthor,
      newQuoteText,
      newQuoteAuthor,
      showAddQuoteForm,
      editBirthdayId,
      editFirstname,
      editLastname,
      editEmail,
      editBirthday,
      newFirstname,
      newLastname,
      newEmail,
      newBirthday,
      showAddBirthdayForm
    } = this.state;

    return (
      <div className="fixed bottom-0 min-w-full bg-white py-6 px-12 flex justify-center border-t-2 border-slate-900 font-bison text-4xl tracking-wide uppercase">
        <div className="flex space-x-4">
          <div>
            <input
              type="file"
              accept=".csv"
              id="anniversaireInput"
              onChange={this.handleImport('Anniversaire')}
              style={{ display: 'none' }}
            />
            <label htmlFor="anniversaireInput" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
              Import Anniversaire
            </label>
          </div>
          <div>
            <input
              type="file"
              accept=".csv"
              id="citationInput"
              onChange={this.handleImport('Citation')}
              style={{ display: 'none' }}
            />
            <label htmlFor="citationInput" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
              Import Citation
            </label>
          </div>
          <div>
            <button
              onClick={this.handleManageQuotes}
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded"
            >
              Gérer les citations
            </button>
          </div>
          <div>
            <button
              onClick={this.handleManageBirthdays}
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded"
            >
              Gérer les anniversaires
            </button>
          </div>
        </div>

        {showQuotes && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded shadow-lg z-50 w-3/4 h-3/4 overflow-y-auto">
              <h2 className="text-2xl mb-4">Citations</h2>
              <button
                onClick={() => this.setState({ showAddQuoteForm: !showAddQuoteForm })}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
              >
                {showAddQuoteForm ? 'Annuler' : 'Ajouter Citation'}
              </button>
              {showAddQuoteForm && (
                <div className="mb-4">
                  <input
                    type="text"
                    name="newQuoteText"
                    value={newQuoteText}
                    onChange={this.handleInputChange}
                    placeholder="Texte de la citation"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  />
                  <input
                    type="text"
                    name="newQuoteAuthor"
                    value={newQuoteAuthor}
                    onChange={this.handleInputChange}
                    placeholder="Auteur de la citation"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  />
                  <button
                    onClick={this.handleAddQuote}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Enregistrer
                  </button>
                </div>
              )}
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Citation</th>
                    <th className="px-4 py-2">Auteur</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((quote) => (
                    <tr key={quote.id}>
                      <td className="border px-4 py-2">
                        {editQuoteId === quote.id ? (
                          <input
                            type="text"
                            name="editQuoteText"
                            value={editQuoteText}
                            onChange={this.handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        ) : (
                          quote.quote
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {editQuoteId === quote.id ? (
                          <input
                            type="text"
                            name="editQuoteAuthor"
                            value={editQuoteAuthor}
                            onChange={this.handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        ) : (
                          quote.author
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {editQuoteId === quote.id ? (
                          <button
                            onClick={() => this.handleUpdateQuote(quote.id)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          >
                            Enregistrer
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => this.handleEditQuote(quote)}
                              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() => this.handleDeleteQuote(quote.id)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                              Supprimer
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                onClick={this.handleCloseQuotes}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              >
                Fermer
              </button>
            </div>
          </div>
        )}

        {showBirthdays && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded shadow-lg z-50 w-3/4 h-3/4 overflow-y-auto">
              <h2 className="text-2xl mb-4">Anniversaires</h2>
              <button
                onClick={() => this.setState({ showAddBirthdayForm: !showAddBirthdayForm })}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
              >
                {showAddBirthdayForm ? 'Annuler' : 'Ajouter Anniversaire'}
              </button>
              {showAddBirthdayForm && (
                <div className="mb-4">
                  <input
                    type="text"
                    name="newFirstname"
                    value={newFirstname}
                    onChange={this.handleInputChange}
                    placeholder="Prénom"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  />
                  <input
                    type="text"
                    name="newLastname"
                    value={newLastname}
                    onChange={this.handleInputChange}
                    placeholder="Nom"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  />
                  <input
                    type="email"
                    name="newEmail"
                    value={newEmail}
                    onChange={this.handleInputChange}
                    placeholder="Email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  />
                  <input
                    type="date"
                    name="newBirthday"
                    value={newBirthday}
                    onChange={this.handleInputChange}
                    placeholder="Date d'anniversaire"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  />
                  <button
                    onClick={this.handleAddBirthday}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Enregistrer
                  </button>
                </div>
              )}
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Prénom</th>
                    <th className="px-4 py-2">Nom</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Date d'anniversaire</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {birthdays.map((birthday) => (
                    <tr key={birthday.id}>
                      <td className="border px-4 py-2">
                        {editBirthdayId === birthday.id ? (
                          <input
                            type="text"
                            name="editFirstname"
                            value={editFirstname}
                            onChange={this.handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        ) : (
                          birthday.firstname
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {editBirthdayId === birthday.id ? (
                          <input
                            type="text"
                            name="editLastname"
                            value={editLastname}
                            onChange={this.handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        ) : (
                          birthday.lastname
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {editBirthdayId === birthday.id ? (
                          <input
                            type="email"
                            name="editEmail"
                            value={editEmail}
                            onChange={this.handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        ) : (
                          birthday.email
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {editBirthdayId === birthday.id ? (
                          <input
                            type="date"
                            name="editBirthday"
                            value={editBirthday}
                            onChange={this.handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        ) : (
                          birthday.birthday
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {editBirthdayId === birthday.id ? (
                          <button
                            onClick={() => this.handleUpdateBirthday(birthday.id)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          >
                            Enregistrer
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => this.handleEditBirthday(birthday)}
                              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() => this.handleDeleteBirthday(birthday.id)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                              Supprimer
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                onClick={this.handleCloseBirthdays}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default FooterComponent;
