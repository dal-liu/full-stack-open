import { Typography } from '@mui/material';
import { useContext } from 'react';
import DiagnosesContext from './DiagnosesContext';

import { Entry } from '../../types';

const DiagnosisList = ({ entry }: { entry: Entry }) => {
  const diagnoses = useContext(DiagnosesContext);

  const filteredDiagnoses = diagnoses.filter((diagnosis) => {
    return entry.diagnosisCodes?.includes(diagnosis.code);
  });

  if (!filteredDiagnoses.length) {
    return null;
  }

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

export default DiagnosisList;
