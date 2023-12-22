import {
  NewPatient,
  Gender,
  NewEntry,
  Diagnosis,
  HealthCheckRating,
  SickLeave,
  Discharge,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect name: ' + name);
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect ssn: ' + ssn);
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect occupation: ' + occupation);
  }

  return occupation;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };

    return newPatient;
  }

  throw new Error('Incorrect data: a field missing');
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect specialist: ' + specialist);
  }

  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect description: ' + description);
  }

  return description;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => Number(v.toString()))
    .filter((v) => !isNaN(v))
    .includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    isNaN(Number(healthCheckRating)) ||
    !isHealthCheckRating(Number(healthCheckRating))
  ) {
    throw new Error('Incorrect healthCheckRating: ' + healthCheckRating);
  }

  return Number(healthCheckRating);
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect employerName: ' + employerName);
  }

  return employerName;
};

const isSickLeave = (param: object): param is SickLeave => {
  return 'startDate' in param && 'endDate' in param;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== 'object' || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect sickLeave: ' + sickLeave);
  }

  return sickLeave;
};

const isDischarge = (param: object): param is Discharge => {
  return 'date' in param && 'criteria' in param;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object' || !isDischarge(discharge)) {
    throw new Error('Incorrect discharge: ' + discharge);
  }

  return discharge;
};

const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'date' in object &&
    'specialist' in object &&
    'description' in object &&
    'type' in object
  ) {
    const newEntryBase = {
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      description: parseDescription(object.description),
      diagnosisCodes:
        'diagnosisCodes' in object ? parseDiagnosisCodes(object) : undefined,
    };

    switch (object.type) {
      case 'HealthCheck':
        if ('healthCheckRating' in object) {
          const newEntry: NewEntry = {
            ...newEntryBase,
            type: 'HealthCheck',
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };

          return newEntry;
        }

        throw new Error('Incorrect data: a field missing');
      case 'OccupationalHealthcare':
        if ('employerName' in object && 'sickLeave' in object) {
          const newEntry: NewEntry = {
            ...newEntryBase,
            type: 'OccupationalHealthcare',
            employerName: parseEmployerName(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave),
          };

          return newEntry;
        }

        throw new Error('Incorrect data: a field missing');
      case 'Hospital':
        if ('discharge' in object) {
          const newEntry: NewEntry = {
            ...newEntryBase,
            type: 'Hospital',
            discharge: parseDischarge(object.discharge),
          };

          return newEntry;
        }

        throw new Error('Incorrect data: a field missing');
      default:
        throw new Error('Incorrect type: ' + object.type);
    }
  }

  throw new Error('Incorrect data: a field missing');
};

export default { toNewPatient, toNewEntry };
