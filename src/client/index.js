// @flow

const React = require("react");
const ReactDOM = require("react-dom");

type Props = {
  name: string,
};

function MainPage(props: Props): React.Node {
  const { name } = props;
  return (
    <div>
      <h1>Hello {name}</h1>
    </div>
  );
}

const root = document.getElementById("root");
ReactDOM.render(<MainPage name="World" />, root);
