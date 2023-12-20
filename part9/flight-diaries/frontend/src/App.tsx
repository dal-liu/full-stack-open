import { useState, useEffect } from 'react';
import { getAll, createEntry } from './services/diaryEntries';
import { DiaryEntry, NewDiaryEntry } from './types';
import axios from 'axios';

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
  errorMessage,
}: {
  createDiaryEntry: (entry: NewDiaryEntry) => void;
  errorMessage: string;
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

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form onSubmit={entryCreation}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility&emsp;great
          <input
            type="radio"
            onChange={() => setVisibility('great')}
            name="visibility"
          />
          &ensp;good
          <input
            type="radio"
            onChange={() => setVisibility('good')}
            name="visibility"
          />
          &ensp;ok
          <input
            type="radio"
            onChange={() => setVisibility('ok')}
            name="visibility"
          />
          &ensp;poor
          <input
            type="radio"
            onChange={() => setVisibility('poor')}
            name="visibility"
          />
        </div>
        <div>
          weather&emsp;sunny
          <input
            type="radio"
            onChange={() => setWeather('sunny')}
            name="weather"
          />
          &ensp;rainy
          <input
            type="radio"
            onChange={() => setWeather('rainy')}
            name="weather"
          />
          &ensp;cloudy
          <input
            type="radio"
            onChange={() => setWeather('cloudy')}
            name="weather"
          />
          &ensp;stormy
          <input
            type="radio"
            onChange={() => setWeather('stormy')}
            name="weather"
          />
          &ensp;windy
          <input
            type="radio"
            onChange={() => setWeather('windy')}
            name="weather"
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
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function getDiaries() {
      const data = await getAll();
      setDiaryEntries(data as DiaryEntry[]);
    }
    getDiaries();
  }, []);

  const createDiaryEntry = async (entry: NewDiaryEntry) => {
    try {
      const newEntry = await createEntry(entry);
      setDiaryEntries(diaryEntries.concat(newEntry));
      setErrorMessage('');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response ? error.response.data : 'Unknown error occurred'
        );
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <EntryForm
        createDiaryEntry={createDiaryEntry}
        errorMessage={errorMessage}
      />

      <h3>Diary entries</h3>
      {diaryEntries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </>
  );
};

export default App;
