import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Typography } from '@mui/material';
import DiagnosesContext from './DiagnosesContext';

import EntryDetails from './EntryDetails';

import { Patient, Gender, Diagnosis } from '../../types';

interface Props {
  patient: Patient | undefined | null;
  diagnoses: Diagnosis[];
}

const PatientPage = ({ patient, diagnoses }: Props) => {
  if (!patient) {
    return null;
  }

  const icon = (gender: Gender) => {
    switch (gender) {
      case 'male':
        return <MaleIcon />;
      case 'female':
        return <FemaleIcon />;
      default:
        return null;
    }
  };

  return (
    <DiagnosesContext.Provider value={diagnoses}>
      <div className="App">
        <Typography
          variant="h4"
          style={{ marginTop: '1em', marginBottom: '0.5em' }}
        >
          {patient.name} {icon(patient.gender)}
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '1em' }}>
          ssn: {patient.ssn}
          <br />
          occupation: {patient.occupation}
        </Typography>
        <Typography variant="h5" style={{ marginBottom: '0.5em' }}>
          entries
        </Typography>
        {patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </div>
    </DiagnosesContext.Provider>
  );
};

export default PatientPage;
