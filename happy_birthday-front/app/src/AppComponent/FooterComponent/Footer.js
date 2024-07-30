import React, { Component } from 'react';
import { postCSVanniv, postCSVquotes, getAllQuotes, deleteQuote, updateQuote, addQuote } from '../../services/birthdayApiService'; // Import necessary functions

class FooterComponent extends Component {
  constructor() {
    super();
    this.state = {
      quotes: [],
      showQuotes: false,
      editQuoteId: null,
      editQuoteText: '',
      editQuoteAuthor: '',
      newQuoteText: '',
      newQuoteAuthor: '',
      showAddForm: false
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
      this.setState({ quotes, showQuotes: true });
    } else {
      alert("Échec de la récupération des citations.");
    }
  };

  handleCloseQuotes = () => {
    this.setState({ showQuotes: false });
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
        showAddForm: false
      }));
      alert('Citation ajoutée avec succès.');
    } else {
      alert('Échec de l\'ajout de la citation.');
    }
  };

  handleEditInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { quotes, showQuotes, editQuoteId, editQuoteText, editQuoteAuthor, newQuoteText, newQuoteAuthor, showAddForm } = this.state;
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
        </div>

        {showQuotes && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded shadow-lg z-50 w-3/4 h-3/4 overflow-y-auto">
              <h2 className="text-2xl mb-4">Citations</h2>
              <button
                onClick={() => this.setState({ showAddForm: !showAddForm })}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
              >
                {showAddForm ? 'Annuler' : 'Ajouter Citation'}
              </button>
              {showAddForm && (
                <div className="mb-4">
                  <input
                    type="text"
                    name="newQuoteText"
                    value={newQuoteText}
                    onChange={this.handleEditInputChange}
                    placeholder="Texte de la citation"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  />
                  <input
                    type="text"
                    name="newQuoteAuthor"
                    value={newQuoteAuthor}
                    onChange={this.handleEditInputChange}
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
                            onChange={this.handleEditInputChange}
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
                            onChange={this.handleEditInputChange}
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
      </div>
    );
  }
}

export default FooterComponent;
