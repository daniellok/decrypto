// @flow

import React from 'react';

const styles = require('../styles.css');

type Props = {
  className: ?string, // className override
  label: string,
  onClick: () => void,
};

function Button(props: Props): React.Node {
  const { className, label, onClick } = props;

  // default className is "button"
  return (
    <div
      className={className != null ? className : 'button'}
      onClick={props.onClick}>
      {props.label}
    </div>
  );
}

export default Button;
