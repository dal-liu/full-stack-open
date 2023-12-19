import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('fetching all diagnoses');
});

export default router;
