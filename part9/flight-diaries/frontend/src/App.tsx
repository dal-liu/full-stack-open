import { useState, useEffect } from 'react';
import { getAllEntries } from './services/diaryEntries';
import { DiaryEntry } from './types';

const Entry = ({ entry }: { entry: DiaryEntry }) => {
  return (
    <div>
      <h4>{entry.date}</h4>
      <p>
        visibility: {entry.visibility}
        <br />
        weather: {entry.weather}
      </p>
    </div>
  );
};

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    async function getDiaries() {
      const data = await getAllEntries();
      setDiaryEntries(data as DiaryEntry[]);
    }
    getDiaries();
  }, []);

  return (
    <>
      <h3>Diary entries</h3>
      {diaryEntries.map((entry, i) => (
        <Entry key={i} entry={entry} />
      ))}
    </>
  );
};

export default App;
