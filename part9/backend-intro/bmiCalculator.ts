export const calculateBmi = (height: number, weight: number): string => {
  if (height === 0) throw new Error("Can't divide by 0!");

  const bmi = weight / (height / 100) ** 2;
  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 35) {
    return 'Obese (Class I)';
  } else if (bmi < 40) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};
