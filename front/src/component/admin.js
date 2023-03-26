import * as React from 'react';
import Box from '@mui/material/Box';
import { TextField, Button, FormControlLabel, Radio, RadioGroup} from '@mui/material';
import axios from 'axios';
import { getCookie } from "../utils/auth"

export default function Admin() {
  const [formState, setFormState] = React.useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: ''
  });

  const [fieldErrors, setFieldErrors] = React.useState({});
  const [requestStatus, setRequestStatus] = React.useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const fieldErrors = {};
    if (isNaN(formState.field4)) {
      fieldErrors.field4 = 'Years must be a number';
    }
    if (!isNaN(formState.field1)) {
      fieldErrors.field1 = 'Name must be alphanumeric';
    }
    if (!isNaN(formState.field2)) {
      fieldErrors.field2 = 'Name must be alphanumeric';
    }

    if (Object.keys(fieldErrors).length > 0) {
      setFieldErrors(fieldErrors);
      return;
    }

    const param = {
      name: formState.field1,
      nom: formState.field2,
      password: formState.field3,
      years: formState.field4,
      law: formState.field5,
      accesToken: getCookie("accesToken")
    }
    axios
      .post('http://localhost:3000/user/add', param)
      .then((response) => {
        setFormState({
          field1: '',
          field2: '',
          field3: '',
          field4: '',
          field5: ''
        });
        setFieldErrors({});
        setRequestStatus(response.status);
      })
      .catch((error) => {
        console.error(error);
        setRequestStatus(error.response?.status);
      });
  }

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f5f5f5"
      backgroundImage="url('/path/to/background/image')"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box
        bgcolor="#fff"
        boxShadow={2}
        borderRadius={8}
        maxWidth={600}
        width="100%"
        p={4}
        textAlign="center"
      >
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <TextField
              label="Name"
              value={formState.field1}
              onChange={(e) =>
                setFormState({ ...formState, field1: e.target.value })
              }
              margin="normal"
              helperText={fieldErrors.field1}
              error={Boolean(fieldErrors.field1)}
              fullWidth
            />
            <TextField
              label="Last Name"
              value={formState.field2}
              onChange={(e) =>
                setFormState({ ...formState, field2: e.target.value })
              }
              margin="normal"
              helperText={fieldErrors.field2}
              error={Boolean(fieldErrors.field2)}
              fullWidth
            />
            <TextField
              label="Password"
              value={formState.field3}
              onChange={(e) =>
                setFormState({ ...formState, field3: e.target.value })
              }
              margin="normal"
              fullWidth
            />
            <TextField
              label="Years"
              value={formState.field4}
              onChange={(e) =>
                setFormState({ ...formState, field4: e.target.value })
              }
              margin="normal"
              fullWidth
              helperText={fieldErrors.field4}
              error={Boolean(fieldErrors.field4)}
            />
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="666"
                control={<Radio />}
                label="Admin"
                onChange={(e) =>
                  setFormState({ ...formState, field5: e.target.value })
                }
              />
              <FormControlLabel
                value="333"
                control={<Radio />}
                label="Mid Admin"
                onChange={(e) =>
                  setFormState({ ...formState, field5: e.target.value })
                }
              />
              <FormControlLabel
                value="0"
                control={<Radio />}
                label="Member"
                onChange={(e) =>
                  setFormState({ ...formState, field5: e.target.value })
                }
              />
            </RadioGroup>
            <Box mt={4}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
            {requestStatus === 403 && (
              <Box mt={4} color="red">
                Access Denied you are not Admin !
              </Box>
            )}
          </Box>
        </form>
      </Box>
    </Box>
    );
  }