import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import "../styles.css";

const PlayGameModal = ({ playGameClickHandler }) => {
  const [open, setOpen] = useState(true);
  return (
    <Modal
      className="play-game-modal"
      onClose={() => setOpen(false)}
      open={open}
    >
      <Modal.Header></Modal.Header>
      <Modal.Content>
        <Button
          onClick={() => {
            console.log(
              "wipe out local storage || reset game data on logged in user"
            );
          }}
        >
          NEW GAME
        </Button>
        <Button
          onClick={() => {
            console.log("continue with play game");
          }}
        >
          RESUME
        </Button>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => {
            setOpen(false);
            playGameClickHandler();
          }}
        >
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default PlayGameModal;
