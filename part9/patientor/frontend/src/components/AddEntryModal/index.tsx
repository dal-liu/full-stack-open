import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Alert,
} from '@mui/material';
import { useState } from 'react';

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
  const [type, setType] = useState('');

  const onCancel = () => {
    onClose();
    setType('');
  };

  return (
    <Dialog fullWidth open={modalOpen} onClose={onCancel}>
      <DialogTitle>New entry for {patientName}</DialogTitle>
      <DialogContent dividers>
        {error && (
          <Alert severity="error" style={{ marginBottom: '1em' }}>
            {error}
          </Alert>
        )}
        <AddEntryForm onSubmit={onSubmit} type={type} setType={setType} />
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
