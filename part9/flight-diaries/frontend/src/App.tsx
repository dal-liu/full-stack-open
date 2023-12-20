import { useState, useEffect } from 'react';
import { getAll, createEntry } from './services/diaryEntries';
import { DiaryEntry, NewDiaryEntry } from './types';

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

const EntryForm = ({
  createDiaryEntry,
}: {
  createDiaryEntry: (entry: NewDiaryEntry) => void;
}) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const entryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiaryEntry({ date, visibility, weather, comment });

    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <>
      <h3>Add new entry</h3>
      <form onSubmit={entryCreation}>
        <div>
          date
          <input
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility
          <input
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>
        <div>
          weather
          <input
            value={weather}
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    async function getDiaries() {
      const data = await getAll();
      setDiaryEntries(data as DiaryEntry[]);
    }
    getDiaries();
  }, []);

  const createDiaryEntry = async (entry: NewDiaryEntry) => {
    const newEntry = await createEntry(entry);
    setDiaryEntries(diaryEntries.concat(newEntry));
  };

  return (
    <>
      <EntryForm createDiaryEntry={createDiaryEntry} />
      <h3>Diary entries</h3>
      {diaryEntries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </>
  );
};

export default App;
