import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import '../styles.css';

const HowToPlayModal = ({ rulesClickHandler }) => {
  const [open, setOpen] = useState(true);
  return (
    <Modal className="rules" onClose={() => setOpen(false)} open={open}>
      <Modal.Header>Rules</Modal.Header>
      <Modal.Content>
        <p>Blackjack Rules</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => {
            setOpen(false);
            rulesClickHandler();
          }}
        >
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default HowToPlayModal;
