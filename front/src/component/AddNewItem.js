import * as React from 'react';
import { Modal, TextField, Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import { getCookie } from "../utils/auth";

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function ModalAddNewItem(props) {

    const { open, setOpen, updateRows } = props;

    const [nameError, setNameError] = React.useState(false);
    const [refError, setRefError] = React.useState(false);
    const [numberError, setNumberError] = React.useState(false);
    const [priceError, setPriceError] = React.useState(false);

	const handleClose = () => setOpen(false);

	const createNewItem = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const name = data.get('name');
		const number = data.get('number');
        const reference = data.get('reference');
        const price = data.get('price');
        const accesToken = getCookie("accesToken");
		axios
			.post("http://localhost:3000/inventaire/add", { name, number, reference, price, accesToken})
			.then((res) => {
				handleClose();
                updateRows();
			})
			.catch((err) => {
				console.log(err);
			});
	}

    const handleNameChange = (event) => {
        const value = event.target.value;
        setNameError(!/^[a-zA-Z]+$/.test(value));
    }

    const handleRefChange = (event) => {
        const value = event.target.value;
        setRefError(!/^[a-zA-Z]+$/.test(value));
    }

    const handleNumberChange = (event) => {
        const value = event.target.value;
        setNumberError(!/^\d+$/.test(value));
    }

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPriceError(!/^\d+$/.test(value));
    }

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography component="h4" variant="h4" align="center" color="text.primary" gutterBottom>
                    Create new item:
                </Typography>
                <Box component="form" noValidate onSubmit={createNewItem} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name of item"
                        name="name"
                        autoFocus
                        error={nameError}
                        onChange={handleNameChange}
                        helperText={nameError ? "Name must be alphanumeric" : ""}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="number"
                        label="Number of item"
                        name="number"
                        autoFocus
                        error={numberError}
                        onChange={handleNumberChange}
                        helperText={numberError ? "Number must be numeric" : ""}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="reference"
                        label="Reference of item"
                        name="reference"
                        autoFocus
                        error={refError}
                        onChange={handleRefChange}
                        helperText={refError ? "Reference must be alphanumeric" : ""}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="price"
                        name="price"
                        label="Price of item"
                        autoFocus
                        error={priceError}
                        onChange={handlePriceChange}
                        helperText={priceError ? "Number must be numeric" : ""}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        ADD item
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
