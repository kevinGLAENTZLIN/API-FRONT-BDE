import * as React from 'react';
import TableBody from '@mui/material/TableBody';
import { modifyItemInventory, removeItemInventory } from './InventoryManager';
import { IconButton, TableRow, TextField, TableCell } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { getCookie } from "../utils/auth";
import axios from 'axios';

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator) t bo
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

export default function BodyTable(props) {

    const { rows, setRows, order, orderBy, page, rowsPerPage } = props;

	const [admin, setAdmin] = React.useState(false);

	React.useEffect(() => {
		const cookie = getCookie("accesToken");
		axios
			.post("http://localhost:3000/user/verifSuperToken", { token: cookie })
			.then((res) => {
				if (res.status === 200)
					setAdmin(true);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);



	const handleRemoveRow = async (name) => {
		console.log(name)
		const res = await removeItemInventory(name);
		if (res.status != 200) { return; }
		const newRows = rows.filter(row => row.name != name);
		setRows(newRows);
	};

	const handleRefChange = (event, name) => {
		const newRows = rows.map(row => {
			if (row.name == name) {
				modifyItemInventory(name, row.price, row.number, event.target.value);
				return {
					...row,
					reference: event.target.value
				}
			}
			return row;
		});
		setRows(newRows);
	};

	const handleAddTotal = (name) => {
		const newRows = rows.map(row => {
			if (row.name == name) {
				modifyItemInventory(name, row.price, parseInt(row.number) + 1, row.reference);
				return {
					...row,
					number: parseInt(row.number, 10) + 1
				}
			}
			return row;
		});
		setRows(newRows);
	};

	const handleRemoveTotal = (name) => {
		const newRows = rows.map(row => {
			if (row.name == name) {
				if (row.number == 0)
					return { ...row };
					modifyItemInventory(name, row.price, parseInt(row.number) - 1, row.reference);
					return {
					...row,
					number: parseInt(row.number, 10) - 1,
				}
			}
			return row;
		});
		setRows(newRows);
	};
	
	const handleAddPrice = (name) => {
		const newRows = rows.map(row => {
			if (row.name == name) {
				modifyItemInventory(name, parseInt(row.price) + 1, row.number, row.reference);
				return {
					...row,
					price: parseInt(row.price, 10) + 1
				}
			}
			return row;
		});
		setRows(newRows);
	};

	const handleRemovePrice = (name) => {
		const newRows = rows.map(row => {
			if (row.name == name) {
				if (row.price == 0)
					return { ...row };
				modifyItemInventory(name, parseInt(row.price) - 1, row.number, row.reference);
				return {
					...row,
					price: parseInt(row.price, 10) - 1
				}
			}
			return row;
		});
		setRows(newRows);
	};

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
            <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                            <TableCell component="th" id={labelId} scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">
                                {row.number}
								{
									admin ?
									<>
                                <IconButton size='small' aria-label="add" onClick={() => handleAddTotal(row.name)}>
                                    <AddIcon />
                                </IconButton>
                                <IconButton size='small' aria-label="add" onClick={() => handleRemoveTotal(row.name)}>
                                    <RemoveIcon />
                                </IconButton>
									</>
									:
									<></>
								}
                            </TableCell>
                            <TableCell align="right">
							{
								admin ?
                                <TextField
                                    id="standard-multiline-flexible"
                                    label="Shop"
                                    multiline
                                    maxRows={4}
                                    variant="standard"
                                    defaultValue={row.reference}
                                    onBlur={(e) => handleRefChange(e, row.name)}
                                />
								:
								<>{row.reference}</>
							}
                            </TableCell>

                            
                            <TableCell align="right">
                                {row.price}
								{
									admin ?
									<>
                                <IconButton size='small' aria-label="add" onClick={() => handleAddPrice(row.name)}>
                                    <AddIcon />
                                </IconButton>
                                <IconButton size='small' aria-label="add" onClick={() => handleRemovePrice(row.name)}>
                                    <RemoveIcon />
                                </IconButton>
									</>
									:
									<></>
								}
                            </TableCell>

							{
								admin ?
								<TableCell align="right">
									<IconButton size='small' aria-label="remove" onClick={() => handleRemoveRow(row.name)}>
										<DeleteIcon />
									</IconButton>
								</TableCell>
								:
								<></>
							}
                        </TableRow>
                    );
                })}
            {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }} >
                    <TableCell colSpan={6} />
                </TableRow>
            )}
        </TableBody>
    );
}