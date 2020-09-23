const React = require("react");
const styles = require("./styles.css");

type Props = {
  label: string,
  onClick: () => void,
};

function Button(props: Props): React.Node {
  return (
    <div className="button" onClick={props.onClick}>
      {props.label}
    </div>
  );
}

module.exports = Button;
