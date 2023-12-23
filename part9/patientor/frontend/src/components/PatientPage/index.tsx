import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

import DiagnosesContext from './DiagnosesContext';
import EntryDetails from './EntryDetails';
import AddEntryModal from '../AddEntryModal';
import patientService from '../../services/patients';

import { Patient, Gender, Diagnosis, NewEntry } from '../../types';

interface Props {
  patient: Patient | undefined | null;
  diagnoses: Diagnosis[];
}

const PatientPage = ({ patient, diagnoses }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [type, setType] = useState<string>('');

  const openModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError('');
  };

  if (!patient) {
    return null;
  }

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const entry = await patientService.createEntry(patient.id, values);
      patient.entries.push(entry);
      setModalOpen(false);
      setType('');
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

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
        <AddEntryModal
          modalOpen={modalOpen}
          onClose={closeModal}
          onSubmit={submitNewEntry}
          error={error}
          type={type}
          setType={setType}
          diagnoses={diagnoses}
        />
        <Button
          variant="contained"
          onClick={() => openModal()}
          style={{ marginBottom: '1em' }}
        >
          Add New Entry
        </Button>
        {patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </div>
    </DiagnosesContext.Provider>
  );
};

export default PatientPage;
