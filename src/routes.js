import React from 'react'
import Country from './views/dashboard/country'
import AddWebsite from './views/dashboard/addwebsite'
import UserList from './views/dashboard/userlist'
import EditWebsite from './views/dashboard/edit-website'


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CountryList = React.lazy(() => import('./views/dashboard/CountryList'))
const Login = React.lazy(() => import('./views/pages/login/Login'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/loanadmin/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/loanadmin/countyList', name: 'Country list', element: CountryList},
  { path: '/loanadmin/country', name: 'Country list', element: Country},
  { path: '/loanadmin/addwebsite', name: 'Add Website', element: AddWebsite},
  {path:'/loanadmin/edit-website', name: 'Edit Website', element: EditWebsite},
  { path: '/loanadmin/userlist', name: 'User list', element: UserList},  
]

export default routes
