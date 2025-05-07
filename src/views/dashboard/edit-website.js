import React, { useEffect, useState } from 'react'
import '../../scss/addwebsite.css'
import { updateFinanceData, getcountry } from '../../api'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'

const loanTypes = ['Personal Loan', 'Home Loan', 'Car Loan', 'Business Loan', 'Education Loan']

const EditWebsite = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const websiteData = location.state?.websiteData
  console.log("🚀 ~ EditWebsite ~ websiteData:", websiteData)

  const [formData, setFormData] = useState({
    website_url: '',
    country: '',
    loan_type: '',
    min_credit_score: '',
    max_credit_score: '',
    min_amount: '',
    max_amount: '',
    interest_rate: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [countries, setCountries] = useState([])
  const [validationErrors, setValidationErrors] = useState({})

  useEffect(() => {
    if (!websiteData) {
      toast.error('No website data found for editing')
      navigate('/loanadmin/dashboard')
      return
    }
    setFormData({
      website_url: websiteData.website_url || '',
      country: websiteData.country || '',
      loan_type: websiteData.loan_type || '',
      min_credit_score: websiteData.min_credit_score || '',
      max_credit_score: websiteData.max_credit_score || '',
      min_amount: websiteData.min_amount || '',
      max_amount: websiteData.max_amount || '',
      interest_rate: websiteData.interest_rate || ''
    })

    getCountry()
  }, [websiteData, navigate])

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }))
    }
  }
  
  const validateForm = () => {
    const errors = {}
    if (!formData.country.trim()) {
      errors.country = 'Country is required'
    }
    
    if (!formData.website_url.trim()) {
      errors.website_url = 'Website URL is required'
    } else {
      try {
        new URL(formData.website_url)
      } catch (e) {
        errors.website_url = 'Please enter a valid URL (e.g., https://example.com)'
      }
    }


    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setError(null)

    try {
      const dataToSubmit = {
        ...formData,
        interest_rate: Number(parseFloat(formData.interest_rate).toFixed(1))
      };

      const response = await updateFinanceData(websiteData.id, dataToSubmit)

      if (response.status === 200) {
        toast.success('Website updated successfully!')
        navigate("/loanadmin/dashboard")
      }
    } catch (err) {
      console.error('Update error:', err)
      setError('Failed to update website. Please try again.')
      toast.error('Failed to update website. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="add_web max-w-4xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Website</h2>

      {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Country */}
        <div>
          <label className="block text-gray-700 mb-1">Country:<span className="text-red-500">*</span></label>
          <select
            name="country"
            value={formData.country.toLowerCase()}
            onChange={handleChange}
            className={`w-100 border p-2 rounded-md ${validationErrors.country ? 'border-red-500' : ''}`}
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
          <label className="block text-gray-700 mb-1">Website URL:<span className="text-red-500">*</span></label>
          <input
            type="url"
            name="website_url"
            value={formData.website_url}
            onChange={handleChange}
            placeholder="https://example.com"
            className={`w-100 border p-2 rounded-md ${validationErrors.website_url ? 'border-red-500' : ''}`}
          />
         
        </div>

        {/* Loan Details Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Loan Details</h3>
          <div className="border p-4 bg-gray-50 rounded-md mb-3 grey_bg">
            <div className="grid grid-cols-1 gap-4">
              {/* Loan Type */}
              <div>
                <label className="block text-gray-700 mb-1">Loan Type:<span className="text-red-500">*</span></label>
                <select
                  name="loan_type"
                  value={formData.loan_type}
                  onChange={handleChange}
                  className={`w-100 border p-2 rounded-md ${validationErrors.loan_type ? 'border-red-500' : ''}`}
                >
                  <option value="">Select Loan Type</option>
                  {loanTypes.map((type, i) => (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
               
              </div>

              {/* Credit Score Range */}
              <div className="d-flex gap-3">
                <div className="w-50">
                  <label className="block text-gray-700 mb-1">Min Credit Score:<span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    name="min_credit_score"
                    value={formData.min_credit_score}
                    onChange={handleChange}
                    placeholder="Minimum Credit Score"
                    className={`w-100 border p-2 rounded-md ${validationErrors.min_credit_score ? 'border-red-500' : ''}`}
                  />
                 
                </div>
                <div className="w-50">
                  <label className="block text-gray-700 mb-1">Max Credit Score:<span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    name="max_credit_score"
                    value={formData.max_credit_score}
                    onChange={handleChange}
                    placeholder="Maximum Credit Score"
                    className={`w-100 border p-2 rounded-md ${validationErrors.max_credit_score ? 'border-red-500' : ''}`}
                  />
                  
                </div>
              </div>

              {/* Amount Range */}
              <div className="d-flex gap-3">
                <div className="w-50">
                  <label className="block text-gray-700 mb-1">Min Amount:<span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    name="min_amount"
                    value={formData.min_amount}
                    onChange={handleChange}
                    placeholder="Minimum Amount"
                    className={`w-100 border p-2 rounded-md ${validationErrors.min_amount ? 'border-red-500' : ''}`}
                  />
                  
                </div>
                <div className="w-50">
                  <label className="block text-gray-700 mb-1">Max Amount:<span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    name="max_amount"
                    value={formData.max_amount}
                    onChange={handleChange}
                    placeholder="Maximum Amount"
                    className={`w-100 border p-2 rounded-md ${validationErrors.max_amount ? 'border-red-500' : ''}`}
                  />
                 
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-gray-700 mb-1">Interest Rate (%):<span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="interest_rate"
                  value={formData.interest_rate}
                  onChange={handleChange}
                  placeholder="Enter Interest Rate"
                  step="0.01"
                  className={`w-100 border p-2 rounded-md ${validationErrors.interest_rate ? 'border-red-500' : ''}`}
                />

              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 sbt_btn text-white px-4 py-2 rounded hover:bg-blue-600 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Updating...' : 'Update'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/loanadmin/dashboard')}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditWebsite