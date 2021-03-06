import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import { fetchUser, resetStats } from '../store/user';
import '../styles.css';

const currentPlayer = JSON.parse(window.localStorage.getItem('currentPlayer'));

const PlayGameModal = ({
  handlePlayAgain,
  playGameClickHandler,
  startGameFunc,
  loadUser,
  resetUser,
  user,
}) => {
  const [open, setOpen] = useState(true);
  console.log('user on play game modal', user);

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
            // console.log('currentPlayer id', currentPlayer['id']);
            if (currentPlayer['id']) {
              //if logged in user, reset player's info
              const asyncReset = async () => {
                try {
                  await resetUser(currentPlayer['id']);
                } catch (error) {
                  console.log(error);
                }
              };
              asyncReset();
              const asyncLoad = async () => {
                try {
                  console.log('currentPlayer id', currentPlayer['id']);
                  const userInfo = await loadUser(currentPlayer['id']);
                  console.log(
                    'userinfo in async reset function >>>>>>>>>>>>',
                    userInfo
                  );
                  window.localStorage.setItem(
                    'currentPlayer',
                    JSON.stringify(userInfo)
                  );
                } catch (error) {
                  console.log(error);
                }
              };
              asyncLoad();
              console.log(
                "local storage for logged in user's new game button",
                JSON.parse(window.localStorage.getItem('currentPlayer'))
              );
            } else {
              //otherwise reset guest player
              console.log(
                "no currentPlayer['id'] found (meaning this is a guest player"
              );
              window.localStorage.setItem(
                'currentPlayer',
                JSON.stringify({
                  username: 'Guest',
                  totalMoney: 2500,
                  wins: 0,
                  losses: 0,
                  draws: 0,
                })
              );
            }
            startGameFunc();
            setOpen(false);
            playGameClickHandler();
          }}
        >
          NEW GAME
        </Button>
        <Button
          onClick={() => {
            console.log('continue with play game');
            handlePlayAgain();
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

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => ({
  resetUser: (id) => dispatch(resetStats(id)),
  loadUser: (id) => dispatch(fetchUser(id)),
});

export default connect(mapState, mapDispatch)(PlayGameModal);
