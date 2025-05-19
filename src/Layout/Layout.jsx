import React from 'react'
// import Navbar from '../Components/Navbar'
import { Box, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
	return (
		<>
			<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

				<Header />
				<Box component="main" sx={{ flexGrow: 1, mt: 10 }} >
					<Outlet />

				</Box>

				<Box sx={{ py: 2.5, mt: 5, textAlign: "center", bgcolor: "#f1f1f1" }}>
					<Typography variant="body2" sx={{ color: "#444", fontWeight: 500 }}>
						© Software Designed By PJSOFTECH Pvt. Ltd. | All Rights Reserved
					</Typography>
				</Box>
			</Box>

		</>
	)
}

export default Layout