import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';

import { Patient, NewPatient } from '../types';

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

export default {
  getPatients,
  addPatient,
  findPatientById,
};
