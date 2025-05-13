import React, { useEffect, useState } from 'react'
import '../../scss/dashboard.css'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardBody,
  CCardHeader,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react'
import { getWebsites, deleteFinanceData } from '../../api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const [websites, setWebsites] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState(null)
  console.log("🚀 ~ Dashboard ~ selectedItemId:", selectedItemId)
  const navigate = useNavigate()

  useEffect(() => {
    fetchWebsites()
  }, [])

  const fetchWebsites = async () => {
    try {
      const response = await getWebsites()
      if (response.status === 200) {
        setWebsites(response.data)
      } else {
        setWebsites([])
      }
    } catch (error) {
      console.error('Error fetching websites:', error)
      toast.error('Failed to fetch websites')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item) => {
    navigate('/loanadmin/edit-website', { state: { websiteData: item } })
  }

  const confirmDelete = (item_id) => {
    setSelectedItemId(item_id)
    setDeleteModalVisible(true)
  }

  const handleDeleteConfirmed = async () => {
    try {
      const response = await deleteFinanceData(selectedItemId)
      if (response.status === 200) {
        toast.success('Website deleted successfully!')
        fetchWebsites()
      }
    } catch (error) {
      console.error('Error deleting website:', error)
      toast.error('Failed to delete website. Please try again.')
    } finally {
      setDeleteModalVisible(false)
      setSelectedItemId(null)
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <h2 className="title_tb">Submitted Websites</h2>
        </CCardHeader>
        <CCardBody>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : websites.length === 0 ? (
            <div className="text-center py-4">No websites found.</div>
          ) : (
            <CTable striped hover responsive submited_table className='submited_tb'>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" className="sr_no">
                    Sr No
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="Country">
                    Country
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="finance_name">
                   Finance Name
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="url">
                    Url
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="custom_data">
                    Custom Data
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="custom_action">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {websites?.slice().reverse().map((item, index) => (
                  <CTableRow key={item._id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{item?.country}</CTableDataCell>
                    <CTableDataCell>{item.website_name}</CTableDataCell>
                    <CTableDataCell>
                      <a href={item?.website_url} target="_blank" rel="noopener noreferrer">
                        {item?.website_url}
                      </a>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="mb-2 p-2 bg-light border rounded" style={{ fontSize: '0.9rem' }}>
                        <strong>Loan Type:</strong> {item.loan_type} <br />
                        <strong>Loan Amount Minimum:</strong> {item.min_amount} <br />
                        <strong>Loan Amount Maximum:</strong> {item.max_amount} <br />
                        <strong>Credit Score Minimum:</strong> {item.min_credit_score} <br />
                        <strong>Credit Score Maximum:</strong> {item.max_credit_score} <br />
                        <strong>Interest Rate:</strong> {parseFloat(item.interest_rate).toFixed(1)}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <button className="btn btn-sm btn-warning me-2 Edit_btn" onClick={() => handleEdit(item)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger delete_btn" onClick={() => confirmDelete(item.id)}>
                        Delete
                      </button>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
        </CCardBody>
      </CCard>

      {/* Delete Confirmation Modal */}
      <CModal visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)} className="delete_modal"> 
        <CModalHeader closeButton>
          <strong>Confirm Delete</strong>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete this website? This action cannot be undone.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeleteModalVisible(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={handleDeleteConfirmed}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Dashboard