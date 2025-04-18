import React, { useEffect, useState } from 'react'
import '../../scss/dashboard.css';
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
} from '@coreui/react'
import { getWebsites } from '../../api'

const Dashboard = () => {

  const [websites, setWebsites] = useState([])
  const [loading, setLoading] = useState(true) // Loader state

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await getWebsites()
        if (response.status == 200) {
          setWebsites(response.data)
        } else {
          setWebsites([])
        }
      } catch (error) {
        console.error('Error fetching websites:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWebsites()
  }, [])

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h2 className="title_tb">Submitted Websites</h2>
      </CCardHeader>
      <CCardBody>
        <CTable striped hover responsive submited_table>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col" className="sr_no">Sr No</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="Country">Country</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="url">Url</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="ervice_provider">Service Provider</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="custom_data">Custom Data</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {websites?.reverse()?.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{item?.country_name}</CTableDataCell>
                <CTableDataCell>
                  <a href={item?.website_url} target="_blank" rel="noopener noreferrer">
                    {item?.website_url}
                  </a>
                </CTableDataCell>
                <CTableDataCell>{item?.finance_company_name?.company_name}</CTableDataCell>
                <CTableDataCell>
                  {item?.finance_company_name?.custom_data?.length === 0
                    ? 'No Custom Data'
                    : item?.finance_company_name?.custom_data?.map((cd, i) => (
                        <div
                          key={i}
                          className="mb-2 p-2 bg-light border rounded"
                          style={{ fontSize: '0.9rem' }}
                        >
                          <strong>Loan Type:</strong> {cd.loan_type} <br />
                          <strong>Loan Amount:</strong> {cd.loan_amount} <br />
                          <strong>Interest Rate:</strong> {cd.interest_rate}
                        </div>
                      ))}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default Dashboard
