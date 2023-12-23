import { useState, SyntheticEvent } from 'react';
import {
  TextField,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Stack,
} from '@mui/material';

import { NewEntry, HealthCheckRating } from '../../types';

interface Props {
  onSubmit: (values: NewEntry) => void;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
}

const AddEntryForm = ({ onSubmit, type, setType }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating['Healthy']
  );
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const addEntry = (event: SyntheticEvent): void => {
    event.preventDefault();
    const entryBase = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.split(','),
    };

    switch (type) {
      case 'HealthCheck':
        onSubmit({
          ...entryBase,
          type,
          healthCheckRating,
        });
        break;
      case 'OccupationalHealthcare':
        onSubmit({
          ...entryBase,
          type,
          employerName,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
        });
        break;
      case 'Hospital':
        onSubmit({
          ...entryBase,
          type,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;
      default:
        throw new Error('Invalid entry type');
    }
  };

  const entryFormBase = (
    <>
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
    </>
  );

  const healthCheckForm = (
    <form id="entry-form" onSubmit={addEntry}>
      {entryFormBase}
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

  const occupationalHealthcareForm = (
    <form id="entry-form" onSubmit={addEntry}>
      {entryFormBase}
      <TextField
        label="Employer name"
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
        margin="dense"
      />
      <InputLabel style={{ marginTop: '0.5em' }}>Sick leave</InputLabel>
      <Stack direction="row" spacing={2}>
        <TextField
          label="Start"
          fullWidth
          value={sickLeaveStartDate}
          onChange={({ target }) => setSickLeaveStartDate(target.value)}
        />
        <TextField
          label="End"
          fullWidth
          value={sickLeaveEndDate}
          onChange={({ target }) => setSickLeaveEndDate(target.value)}
        />
      </Stack>
    </form>
  );

  const hostpitalForm = (
    <form id="entry-form" onSubmit={addEntry}>
      {entryFormBase}
      <TextField
        label="Discharge date"
        fullWidth
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
        margin="dense"
      />
      <TextField
        label="Discharge criteria"
        fullWidth
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
        margin="dense"
      />
    </form>
  );

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="entry-type-label">Entry type</InputLabel>
        <Select
          labelId="entry-type-label"
          value={type}
          label="Entry type"
          onChange={({ target }) => setType(target.value)}
        >
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            OccupationalHealthcare
          </MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
        </Select>
      </FormControl>
      {type === 'HealthCheck' && healthCheckForm}
      {type === 'OccupationalHealthcare' && occupationalHealthcareForm}
      {type === 'Hospital' && hostpitalForm}
    </>
  );
};

export default AddEntryForm;
