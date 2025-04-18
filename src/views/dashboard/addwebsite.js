import React, { useEffect, useState } from 'react'
import '../../scss/addwebsite.css'
import { addWebsite, getcountry } from '../../api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const loanTypes = ['Personal Loan', 'Home Loan', 'Car Loan', 'Business Loan', 'Education Loan']
const AddWebsite = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    url: '',
    country_name: '',
    finance_name: '',
    extra_fields: [],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [countries, setCountries] = useState([])

  useEffect(() => {
    getCountry()
  }, [])

  const getCountry = async () => {
    try {
      const response = await getcountry()
      if (response?.data?.status == 200) {
        setCountries(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching getcountry:', error)
    }
  }

  // Main form input handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Dynamic field input handler
  const handleFieldChange = (index, e) => {
    const { name, value } = e.target
    const updatedFields = [...formData.extra_fields]
    updatedFields[index] = { ...updatedFields[index], [name]: value }
    setFormData((prev) => ({ ...prev, extra_fields: updatedFields }))
  }

  // Add new loan input group
  const addField = () => {
    setFormData((prev) => ({
      ...prev,
      extra_fields: [...prev.extra_fields, { loan_type: '', loan_amount: '', loan_interest: '' }],
    }))
  }

  // Remove loan input group
  const removeField = (index) => {
    setFormData((prev) => ({
      ...prev,
      extra_fields: prev.extra_fields.filter((_, i) => i !== index),
    }))
  }

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await addWebsite({
        ...formData,
      })

      console.log('Website added successfully:', response)

      if (response.status === 201) {
        navigate("/loanadmin/dashboard")
        toast.success('Website added successfully!')
        setFormData({
          url: '',
          country_name: '',
          finance_name: '',
          extra_fields: [],
        })
      }
    } catch (err) {
      console.error('Submission error:', err)
      setError('Failed to add website. Please try again.')
      toast.error('Failed to add website. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="add_web max-w-4xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Add Website</h2>

      {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Country */}
        <div>
          <label className="block text-gray-700 mb-1">Country:</label>
          <select
            name="country_name"
            value={formData.country_name}
            onChange={handleChange}
            required
            className="w-100 border p-2 rounded-md"
          >
            <option value="">Select Country</option>
            {countries?.map((country, i) => (
              <option key={i} value={country.name}>
                {country?.name}
              </option>
            ))}
          </select>
        </div>

        {/* Website URL */}
        <div className="mt-4">
          <label className="block text-gray-700 mb-1">Website URL:</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://example.com"
            required
            className="w-100 border p-2 rounded-md"
          />
        </div>

        {/* Service Provider */}
        <div className="mt-4">
          <label className="block text-gray-700 mb-1">Service Provider Name:</label>
          <input
            type="text"
            name="finance_name"
            value={formData.finance_name}
            onChange={handleChange}
            placeholder="Enter Service Provider"
            required
            className="w-100 border p-2 rounded-md"
          />
        </div>

        {/* Extra Fields Section */}
        <div className="mt-6 extra-fields">
          <h3 className="text-xl font-semibold mb-3">Additional Fields</h3>

          {formData.extra_fields.map((field, index) => (
            <div key={index} className="border p-4 bg-gray-50 rounded-md mb-3 grey_bg">
              <div className="grid grid-cols-2 gap-4">
                <div className="d-flex gap-3">
                  {/* Loan Type */}
                  <div className="w-50">
                    <label className="block text-gray-700 mb-1">Loan Type:</label>
                    <select
                      name="loan_type"
                      value={field.loan_type}
                      onChange={(e) => handleFieldChange(index, e)}
                      className="w-100 border p-2 rounded-md"
                    >
                      <option value="">Select Loan Type</option>
                      {loanTypes.map((type, i) => (
                        <option key={i} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Amount */}
                  <div className="w-50">
                    <label className="block text-gray-700 mb-1">Amount:</label>
                    <input
                      type="number"
                      name="loan_amount"
                      value={field.loan_amount}
                      onChange={(e) => handleFieldChange(index, e)}
                      placeholder="Enter Amount"
                      className="w-100 border p-2 rounded-md"
                    />
                  </div>
                </div>

                {/* Interest */}
                <div className="d-flex gap-3 mt-4">
                  <div className="w-50 col-span-2">
                    <label className="block text-gray-700 mb-1">Interest Rate (%):</label>
                    <input
                      type="number"
                      name="loan_interest"
                      value={field.loan_interest}
                      onChange={(e) => handleFieldChange(index, e)}
                      placeholder="Enter Interest Rate"
                      className="w-100 border p-2 rounded-md"
                    />
                  </div>

                  <div className="w-50"></div>
                </div>
              </div>

              {/* Remove Field */}
              <button
                type="button"
                onClick={() => removeField(index)}
                className="mt-3 text-red-600 flex items-center hover:text-red-800 remove_field"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  className="mr-2"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
                </svg>{' '}
                Remove Field
              </button>
            </div>
          ))}

          {/* Add Field Button */}
          <button
            type="button"
            onClick={addField}
            className="text-green-600 flex items-center font-medium hover:text-green-800 ad_fields"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
            </svg>{' '}
            Add Field
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-500 sbt_btn text-white px-4 py-2 rounded hover:bg-blue-600 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default AddWebsite
