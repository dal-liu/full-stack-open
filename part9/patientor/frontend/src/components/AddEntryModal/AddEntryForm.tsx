import { useState, SyntheticEvent } from 'react';
import {
  TextField,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Stack,
  Input,
  Typography,
  SelectChangeEvent,
} from '@mui/material';

import { NewEntry, HealthCheckRating, Diagnosis } from '../../types';

interface Props {
  onSubmit: (values: NewEntry) => void;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  diagnoses: Diagnosis[];
}

interface HealthCheckOption {
  key: string;
  value: number;
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: '20%',
    },
  },
};

const createOptions = (): HealthCheckOption[] => {
  const values = Object.values(HealthCheckRating).map((v) => v.toString());
  const strings = values.slice(0, values.length / 2);
  const numbers = values.slice(values.length / 2, values.length);
  return strings.map((s, i) => ({
    key: s,
    value: Number(numbers[i]),
  }));
};

const healthCheckOptions = createOptions();

const AddEntryForm = ({ onSubmit, type, setType, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis['code']>
  >([]);
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating['Healthy']
  );
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const onRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if (typeof event.target.value === 'number') {
      const value = event.target.value;
      const values = Object.values(HealthCheckRating).map((r) => Number(r));
      const rating = values.find((r) => r === value);
      if (rating) {
        setHealthCheckRating(rating);
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const entryBase = {
      description,
      date,
      specialist,
      diagnosisCodes,
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
      <FormControl fullWidth margin="dense">
        <InputLabel shrink variant="standard">
          Date
        </InputLabel>
        <Input
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
      </FormControl>
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        margin="dense"
      />
    </>
  );

  const handleCodeChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const diagnosisCodesField = (
    <FormControl fullWidth margin="dense">
      <InputLabel>Diagnosis codes</InputLabel>
      <Select
        label="Diagnosis codes"
        fullWidth
        value={diagnosisCodes}
        onChange={handleCodeChange}
        multiple
        MenuProps={MenuProps}
      >
        {diagnoses.map((diagnosis) => (
          <MenuItem key={diagnosis.code} value={diagnosis.code}>
            {diagnosis.code}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const healthCheckForm = (
    <form id="entry-form" onSubmit={addEntry}>
      {entryFormBase}
      <FormControl fullWidth margin="dense">
        <InputLabel>HealthCheck rating</InputLabel>
        <Select
          label="HealthCheck rating"
          fullWidth
          value={healthCheckRating}
          onChange={onRatingChange}
        >
          {healthCheckOptions.map((option) => (
            <MenuItem key={option.key} value={option.value}>
              {option.key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {diagnosisCodesField}
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
      <InputLabel style={{ marginTop: '0.25em' }}>Sick leave</InputLabel>
      <Stack direction="row" spacing={2} style={{ marginBottom: '0.25em' }}>
        <Input
          type="date"
          fullWidth
          value={sickLeaveStartDate}
          onChange={({ target }) => setSickLeaveStartDate(target.value)}
        />
        <Typography variant="body1">to</Typography>
        <Input
          type="date"
          fullWidth
          value={sickLeaveEndDate}
          onChange={({ target }) => setSickLeaveEndDate(target.value)}
        />
      </Stack>
      {diagnosisCodesField}
    </form>
  );

  const hospitalForm = (
    <form id="entry-form" onSubmit={addEntry}>
      {entryFormBase}
      <InputLabel style={{ marginTop: '0.25em' }}>Discharge date</InputLabel>
      <Input
        type="date"
        fullWidth
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
        style={{ marginBottom: '0.25em' }}
      />
      <TextField
        label="Discharge criteria"
        fullWidth
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
        margin="dense"
      />
      {diagnosisCodesField}
    </form>
  );

  return (
    <>
      <FormControl fullWidth margin="dense">
        <InputLabel>Entry type</InputLabel>
        <Select
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
      {type === 'Hospital' && hospitalForm}
    </>
  );
};

export default AddEntryForm;
