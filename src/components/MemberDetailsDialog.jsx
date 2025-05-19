import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';

export default function MemberDetailsDialog({ open, handleClose, task }) {
	const navigate = useNavigate();
	return (
		<>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle>Task Details</DialogTitle>
				<DialogContent>
					<Table>
						<TableBody>
							{Object.entries(task).map(([key, value]) => {
								const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();

								return (
									<TableRow key={key}>
										<TableCell>{formattedKey}</TableCell>

										<TableCell>
											{formattedKey === "task Photo" && value ? (
												<img src={value} alt="task Photo" style={{ maxHeight: '80px', width: "80px" }} />
											) : formattedKey === "Id Proof" && value ? (
												<img src={value} alt="Id Proof" style={{ maxHeight: '80px', width: "80px" }} />
											) : formattedKey === "Address Proof" && value ? (
												<img src={value} alt="Address Proof" style={{ maxHeight: '80px', width: "80px" }} />
											) : (
												value
											)}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</DialogContent>
				<DialogActions>
					{/* <Button onClick={() => handleUpdate(reception)} color="secondary">
						Update
					</Button> */}

					<Button onClick={handleClose} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
