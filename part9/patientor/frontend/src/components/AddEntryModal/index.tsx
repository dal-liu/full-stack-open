import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Alert,
} from '@mui/material';

import AddEntryForm from './AddEntryForm';

import { NewEntry, Diagnosis } from '../../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error: string;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  diagnoses: Diagnosis[];
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  type,
  setType,
  diagnoses,
}: Props) => {
  const onCancel = () => {
    onClose();
    setType('');
  };

  return (
    <Dialog fullWidth open={modalOpen} onClose={onCancel}>
      <DialogTitle>Add a new entry</DialogTitle>
      <DialogContent dividers>
        {error && (
          <Alert severity="error" style={{ marginBottom: '1em' }}>
            {error}
          </Alert>
        )}
        <AddEntryForm
          onSubmit={onSubmit}
          type={type}
          setType={setType}
          diagnoses={diagnoses}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          cancel
        </Button>
        <Button type="submit" form="entry-form" disabled={!type}>
          add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEntryModal;
