import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import "../styles.css";

const PlayGameModal = ({ playGameClickHandler, startGameFunc }) => {
  const [open, setOpen] = useState(true);
  const [game, setGame] = useState(null);

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

            // startGameFunc(game);
            setOpen(false);
            playGameClickHandler();
          }}
        >
          NEW GAME
        </Button>
        <Button
          onClick={() => {
            console.log("continue with play game");
            // startGameFunc(game);
            setOpen(false);
            playGameClickHandler();
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
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default PlayGameModal;
