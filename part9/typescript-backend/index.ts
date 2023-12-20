import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    res.send({
      height: Number(height),
      weight: Number(weight),
      bmi: calculateBmi(Number(height), Number(weight)),
    });
  } else {
    res.status(400).send({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (
    isNaN(Number(target)) ||
    !(daily_exercises instanceof Array) ||
    daily_exercises.some((d) => isNaN(Number(d)))
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  return res.json(
    calculateExercises(daily_exercises as number[], Number(target))
  );
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
