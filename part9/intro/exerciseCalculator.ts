import { isNumber } from './utils';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  exerciseHours: number[];
  target: number;
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const exerciseHours = args.slice(3).map((d) => {
    if (isNumber(d)) {
      return Number(d);
    } else {
      throw new Error(`Provided value ${d} was not a number`);
    }
  });

  if (isNumber(args[2])) {
    return {
      exerciseHours,
      target: Number(args[2]),
    };
  } else {
    throw new Error('Provided target was not a number');
  }
};

const calculateExercises = (
  exerciseHours: number[],
  target: number
): Result => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((d) => d > 0).length;
  const average = exerciseHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  let rating = 1;
  let ratingDescription = 'Goal not met';
  if (target > 0 && average / target >= 1 && average / target < 1.5) {
    rating = 2;
    ratingDescription = 'Goal met';
  } else if (target > 0 && average / target >= 1.5) {
    rating = 3;
    ratingDescription = 'Goal exceeded';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { exerciseHours, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(exerciseHours, target));
} catch (error: unknown) {
  let errorMessage = 'An error occurred.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
