import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Typography } from '@mui/material';

import { Patient, Gender, Diagnosis, Entry } from '../../types';

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

  const diagnosisDescriptions = (entry: Entry) => {
    if (!entry.diagnosisCodes) {
      return null;
    }

    const filteredDiagnoses = diagnoses.filter((diagnosis) => {
      return entry.diagnosisCodes?.includes(diagnosis.code);
    });

    return (
      <ul>
        <Typography variant="body1">
          {filteredDiagnoses.map((diagnosis) => (
            <li key={diagnosis.code}>
              {diagnosis.code} {diagnosis.name}
            </li>
          ))}
        </Typography>
      </ul>
    );
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
          {diagnosisDescriptions(entry)}
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
