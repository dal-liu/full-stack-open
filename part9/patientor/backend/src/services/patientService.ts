import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';

import { Patient, NewPatient, Entry, NewEntry } from '../types';

const getPatients = (): Patient[] => {
  return patientData;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
  };

  patientData.push(newPatient);
  return newPatient;
};

const findPatientById = (id: string): Patient | undefined => {
  return patientData.find((p) => p.id === id);
};

const addEntryToPatient = (patient: Patient, entry: NewEntry): Entry => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  addPatient,
  findPatientById,
  addEntryToPatient,
};
