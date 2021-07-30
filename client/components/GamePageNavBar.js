import React, { useState } from 'react';
import { Button } from './Button';
import RulesModal from './RulesModal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const GamePageNavbar = ({ handleClick, isLoggedIn }) => {
  const [showRules, setShowRules] = useState(() => false);

  const rulesClickHandler = () => {
    setShowRules(!showRules);
  };

  <div>
    <nav>
      <div>
        {/* insert logo */}
        {/* <Link to="/home">{logo}</Link> */}
        <Button label="Rules" clickHandler={rulesClickHandler} />
        {showRules ? (
          <RulesModal rulesClickHandler={rulesClickHandler} />
        ) : null}
      </div>
      {isLoggedIn ? (
        <div>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>;
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(GamePageNavbar);
