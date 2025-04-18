import React, { useState } from 'react';
import '../../scss/country.css';

// Font Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

function Country() {
  const [countries, setCountries] = useState(['india', 'canada', 'japan']);
  const [showModal, setShowModal] = useState(false);
  const [newCountry, setNewCountry] = useState('');

  const addCountry = () => {
    if (newCountry.trim() === '') {
      alert('Please enter a country name.');
      return;
    }
    setCountries([...countries, newCountry.trim()]);
    setNewCountry('');
    setShowModal(false);
  };

  const deleteCountry = (index) => {
    const updated = [...countries];
    updated.splice(index, 1);
    setCountries(updated);
  };

  return (
    <div className="container-lg px-4 add_web">
      <h2>Country Management</h2>
      <table className="country-table">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Country Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{country}</td>
              <td>
                <span className="delete-icon" onClick={() => deleteCountry(idx)}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn" onClick={() => setShowModal(true)}>
        <FontAwesomeIcon icon={faPlus} /> Add Country
      </button>

      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">Add Country</div>
            <input
              type="text"
              placeholder="Enter country name"
              value={newCountry}
              onChange={(e) => setNewCountry(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="btn" onClick={addCountry}>Add</button>
              <button className="btn cancel" onClick={() => setShowModal(false)}>
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Country;
