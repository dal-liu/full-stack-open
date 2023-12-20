import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

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
      <h2>
        {patient.name} {icon(patient.gender)}
      </h2>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientPage;
