import { useState, SyntheticEvent } from 'react';
import { TextField } from '@mui/material';

import { NewEntry, HealthCheckRating } from '../../types';

interface Props {
  onSubmit: (values: NewEntry) => void;
}

const AddEntryForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating['Healthy']
  );

  const addEntry = (event: SyntheticEvent): void => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.split(','),
      type: 'HealthCheck',
      healthCheckRating,
    });
  };

  return (
    <form id="entry-form" onSubmit={addEntry}>
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        margin="dense"
      />
      <TextField
        label="Date"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
        margin="dense"
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        margin="dense"
      />
      <TextField
        label="Healthcheck rating"
        fullWidth
        value={healthCheckRating}
        onChange={({ target }) => setHealthCheckRating(target.value)}
        margin="dense"
      />
      <TextField
        label="Diagnosis codes"
        fullWidth
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value)}
        margin="dense"
      />
    </form>
  );
};

export default AddEntryForm;
