export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface SensitivePatient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type Patient = Omit<SensitivePatient, 'ssn'>;

export type NewPatient = Omit<SensitivePatient, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
