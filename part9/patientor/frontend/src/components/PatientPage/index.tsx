import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Typography } from '@mui/material';

import { Patient, Gender } from '../../types';

const PatientPage = ({ patient }: { patient: Patient | undefined | null }) => {
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
        <div key={entry.id}>
          <Typography variant="body1">
            {entry.date} {entry.description}
          </Typography>
          <ul>
            <Typography variant="body1">
              {entry.diagnosisCodes &&
                entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>)}
            </Typography>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
