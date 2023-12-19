import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';

import { Patient, SensitivePatient, NewPatient } from '../types';

const getPatients = (): Patient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): SensitivePatient => {
  const newPatient: SensitivePatient = {
    id: uuid(),
    ...patient,
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
};
