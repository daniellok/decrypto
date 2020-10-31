// @flow

import React from 'react';

const styles = require('../styles.css');

type Props = {
  value: string,
  setValue: (string) => void,
};

function TextInput(props: Props): React.Node {
  const { value, setValue } = props;

  return (
    <input
      className="text-input"
      type="text"
      value={value}
      onChange={(event) => {
        setValue(event.target.value.trim());
      }}
    />
  );
}

export default TextInput;
