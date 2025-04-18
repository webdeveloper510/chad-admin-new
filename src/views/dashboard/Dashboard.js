import React from 'react'
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

const Dashboard = () => {
  // Static Data
  const submittedWebsites = [
    {
      country: 'India',
      url: 'https://www.springfinancial.ca/',
      serviceProvider: 'Spring Financiallaaasss',
      customData: [
        {
          loan_type: 'New York',
          loan_amount: 'John Doe',
          loan_interest: '2001',
        },
        {
          loan_type: 'New York NEW yokr',
          loan_amount: 'John DOM',
          loan_interest: '0226',
        },
        {
          loan_type: 'type1',
          loan_amount: 'test1',
          loan_interest: 'value1',
        },
      ],
    },
    {
      country: 'Germany',
      url: 'https://www.w3.org/Provider/Style/dummy.html',
      serviceProvider: 'test',
      customData: [],
    },
    {
      country: 'United Kingdom',
      url: 'https://google.com',
      serviceProvider: 'redestretyg',
      customData: [],
    },
    {
      country: 'Germany',
      url: 'https://google.com/new',
      serviceProvider: 'Test service',
      customData: [],
    },
    {
      country: 'United Kingdom',
      url: 'https://www.w3.org/Provider/Style/dummy.html',
      serviceProvider: 'test',
      customData: [],
    },
    {
      country: 'Pakistan',
      url: 'https://www.springfinanciall.ca/',
      serviceProvider: 'Spring',
      customData: [
        {
          loan_type: 'string',
          loan_amount: 'State',
          loan_interest: '',
        },
      ],
    },
  ]

  return (
    <CCard className="mb-4">
      <CCardHeader>
      <h2 className='title_tb'>Submitted Websites</h2>
      </CCardHeader>
      <CCardBody>
        <CTable striped hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Country</CTableHeaderCell>
              <CTableHeaderCell scope="col">URL</CTableHeaderCell>
              <CTableHeaderCell scope="col">Service Provider</CTableHeaderCell>
              <CTableHeaderCell scope="col">Custom Data</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {submittedWebsites.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{item.country}</CTableDataCell>
                <CTableDataCell>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.url}
                  </a>
                </CTableDataCell>
                <CTableDataCell>{item.serviceProvider}</CTableDataCell>
                <CTableDataCell>
                  {item.customData.length === 0 ? (
                    'No Custom Data'
                  ) : (
                    item.customData.map((cd, i) => (
                      <div
                        key={i}
                        className="mb-2 p-2 bg-light border rounded"
                        style={{ fontSize: '0.9rem' }}
                      >
                        <strong>Loan Type:</strong> {cd.loan_type} <br />
                        <strong>Loan Amount:</strong> {cd.loan_amount} <br />
                        <strong>Interest Rate:</strong> {cd.loan_interest}
                      </div>
                    ))
                  )}
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
