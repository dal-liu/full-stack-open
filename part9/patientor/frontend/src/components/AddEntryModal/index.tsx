import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Alert,
} from '@mui/material';

import AddEntryForm from './AddEntryForm';

import { NewEntry } from '../../types';

interface Props {
  patientName: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error: string;
}

const AddEntryModal = ({
  patientName,
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => {
  return (
    <Dialog fullWidth open={modalOpen} onClose={onClose}>
      <DialogTitle>Add a new entry for {patientName}</DialogTitle>
      <DialogContent dividers>
        {error && <Alert severity="error">{error}</Alert>}
        <AddEntryForm onSubmit={onSubmit} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          cancel
        </Button>
        <Button type="submit" form="entry-form">
          add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEntryModal;
