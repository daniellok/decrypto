// @flow

import React from 'react';

const styles = require('./styles.css');

type Props = {
  userId: string,
  setUserId: (string) => void,
};

function TextInput(props: Props): React.Node {
  const { userId, setUserId } = props;

  return (
    <input
      className="text-input"
      type="text"
      value={userId}
      onChange={(event) => {
        setUserId(event.target.value.trim());
      }}
    />
  );
}

export default TextInput;
