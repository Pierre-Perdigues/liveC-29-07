import React, { Component } from 'react';
import { postCSVanniv, postCSVquotes } from '../../services/birthdayApiService'; // Import the postCSV functions

class FooterComponent extends Component {
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

  render() {
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
        </div>
      </div>
    );
  }
}

export default FooterComponent;
