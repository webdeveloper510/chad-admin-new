import React, { useState } from 'react';
import '../../scss/country.css';

function CountyList() {
  const [countries, setCountries] = useState([
    'india',
    'canada',
    'japan'
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newCountry, setNewCountry] = useState('');
console.log("hello Here Company List --------------------------------->>>>>")
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
    <>
     <p> hello</p>
    <div className="container">
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
                <span className="delete-icon" onClick={() => deleteCountry(idx)}>🗑️</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <button className="btn" onClick={() => setShowModal(true)}>➕ Add Country</button>

      {/* Modal */}
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
              <button className="btn cancel" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default CountyList;
