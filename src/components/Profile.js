import React, { useEffect, useState } from 'react';
import {
	Avatar,
	Box,
	Card,
	CardContent,
	Grid,
	Typography,
	IconButton,
	Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { getMember, updateProfilePhoto } from '../service/Api'; // Your existing API function
import { toast, ToastContainer } from 'react-toastify';

const Profile = () => {
	const [userData, setUserData] = useState({});
	const [userFields, setUserFields] = useState([]);
	const [imagePreview, setImagePreview] = useState('');

	useEffect(() => {
		async function getDetails() {
			try {
				const response = await getMember();
				const data = response?.data || {};
				console.log(response?.data)
				setUserData(data);

				// Filter out sensitive fields and prepare display fields
				const fields = Object.entries(data)
					.filter(([key]) => key !== 'password' && key !== 'imageUrl')
					.map(([key, value]) => ({
						label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
						value,
					}));

				setUserFields(fields);
			} catch (error) {
				console.error('Error fetching profile data:', error);
			}
		}

		getDetails();
	}, []);

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		// Show local preview
		const previewUrl = URL.createObjectURL(file);
		setImagePreview(previewUrl);

		try {
			const response = await updateProfilePhoto(file);
			toast.success('Profile Image upadated successfully!');
		} catch (err) {
			console.error(err);
			toast.error('Upload failed');
		}
	};



	return (
		<Box sx={{ p: 4, backgroundColor: '#f6f6f6', minHeight: '100vh' }}>
			{/* Header with Avatar */}
			<Paper
				elevation={1}
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					py: 3,
					mb: 4,
				}}
			>
				<Box sx={{ position: 'relative' }}>
					<Avatar
						src={imagePreview || userData.imageUrl || 'https://via.placeholder.com/100'}
						alt={userData.name || 'User'}
						sx={{ width: 100, height: 100 }}
					/>
					<IconButton
						size="small"
						onClick={() => document.getElementById('imageUploadInput').click()}
						sx={{
							position: 'absolute',
							top: 0,
							right: -10,
							color: '#1976d2',
						}}
					>
						<EditIcon />
					</IconButton>
					<input
						type="file"
						accept="image/*"
						id="imageUploadInput"
						hidden
						onChange={handleImageChange}
					/>
				</Box>

				<Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
					{userData.name || '—'}
				</Typography>
			</Paper>

			{/* Profile Info Grid */}
			<Grid container spacing={3}>
				{Array.isArray(userFields) &&
					userFields.map((item, index) => (
						<Grid item size={{ xs: 12, md: 6 }} key={index}>
							<Card elevation={1} sx={{ borderRadius: 2, px: 2, py: 1.5 }}>
								<CardContent sx={{ p: 0 }}>
									<Typography
										variant="h6"
										sx={{ color: '#1976d2', fontWeight: 'bold' }}
									>
										{item.label}
									</Typography>
									<Typography variant="body1" sx={{ mt: 0.5 }}>
										{item.value || '—'}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
			</Grid>
			<ToastContainer position="top-right" autoClose={3000} />
		</Box>
	);
};

export default Profile;
