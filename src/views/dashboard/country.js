import React, { useEffect, useState } from 'react';
import '../../scss/country.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { addcountry, deleteCountry, getcountry } from '../../api';

function Country() {
  const [countries, setCountries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCountry, setNewCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setNewCountry("");
  };

  const addCountry = async () => {
    setLoading(true);
    try {
      let payload = { country_name: newCountry };
      await addcountry(payload);
      toast.success("Country added successfully!");
      closeModal();
      getCountry();
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCountry();
  }, []);

  const getCountry = async () => {
    setLoading(true);
    try {
      const response = await getcountry();
      if(response?.data?.status == 200){
        setCountries(response.data.data);
      }else{
        setCountries([])
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
    setLoading(false);
  };

  const handleDeleteCountry = async (id) => {
    setLoading(true);
    try {
      await deleteCountry(id);
      toast.success("Country deleted successfully!");
      setCountries((prev) => prev.filter((country) => country.id !== id));
      closeModal();
    } catch (error) {
      toast.error(error.message || "Failed to delete country.");
    }
    setLoading(false);
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
          {countries?.map((country, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{country?.name}</td>
              <td>
                <span className="delete-icon" onClick={() => handleDeleteCountry(country?.id)}>
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
