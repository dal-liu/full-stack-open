import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const getPatients = (): NonSensitivePatient[] => {
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
  };

  patientData.push(newPatient);
  return newPatient;
};

const findPatientById = (id: string): NonSensitivePatient | undefined => {
  return patientData.find((p) => p.id === id);
};

export default {
  getPatients,
  addPatient,
  findPatientById,
};
