import { Card, CardContent, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red, deepOrange, amber, green } from '@mui/material/colors';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

import DiagnosisList from './DiagnosisList';

import { Entry, HealthCheckRating } from '../../types';

const HealthCheckEntry = ({ entry }: { entry: Entry }) => {
  if (entry.type !== 'HealthCheck') {
    return null;
  }

  const color = () => {
    switch (entry.healthCheckRating) {
      case HealthCheckRating['Healthy']:
        return { color: green[500] };
      case HealthCheckRating['LowRisk']:
        return { color: amber[500] };
      case HealthCheckRating['HighRisk']:
        return { color: deepOrange[500] };
      case HealthCheckRating['CriticalRisk']:
        return { color: red[500] };
      default:
        return { color: '#000000' };
    }
  };

  return (
    <Card variant="outlined" style={{ marginBottom: '1em' }}>
      <CardContent>
        <Typography variant="body1">
          {entry.date} <MedicalServicesIcon />
          <br />
          <i>{entry.description}</i>
        </Typography>
        <FavoriteIcon style={color()} />
        <Typography variant="body1">diagnose by {entry.specialist}</Typography>
        <DiagnosisList entry={entry} />
      </CardContent>
    </Card>
  );
};

const OccupationalHealthcareEntry = ({ entry }: { entry: Entry }) => {
  if (entry.type !== 'OccupationalHealthcare') {
    return null;
  }

  return (
    <Card variant="outlined" style={{ marginBottom: '1em' }}>
      <CardContent>
        <Typography variant="body1">
          {entry.date} <WorkIcon /> {entry.employerName}
          <br />
          <i>{entry.description}</i>
        </Typography>
        {entry.sickLeave && (
          <Typography variant="body1">
            sick leave: {entry.sickLeave.startDate} &ndash;{' '}
            {entry.sickLeave.endDate}
          </Typography>
        )}
        <Typography variant="body1">diagnose by {entry.specialist}</Typography>
        <DiagnosisList entry={entry} />
      </CardContent>
    </Card>
  );
};

const HospitalEntry = ({ entry }: { entry: Entry }) => {
  if (entry.type !== 'Hospital') {
    return null;
  }

  return (
    <Card variant="outlined" style={{ marginBottom: '1em' }}>
      <CardContent>
        <Typography variant="body1">
          {entry.date} <MonitorHeartIcon />
          <br />
          <i>{entry.description}</i>
        </Typography>
        <Typography variant="body1">
          {entry.discharge.criteria} discharged {entry.discharge.date}
        </Typography>
        <Typography variant="body1">diagnose by {entry.specialist}</Typography>
        <DiagnosisList entry={entry} />
      </CardContent>
    </Card>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} />;
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    default:
      assertNever(entry);
  }
};

export default EntryDetails;
