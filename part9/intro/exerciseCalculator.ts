interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
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
