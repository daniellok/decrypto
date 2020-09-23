const React = require("react");
const Button = require("./Button.react");

const styles = require("./styles.css");

type Props = {
  name: string,
};

function MainPage(props: Props): React.Node {
  const { name } = props;
  return (
    <div className="centered">
      <h1>Hello {name}</h1>
      <h2>What would you like to do?</h2>
      <Button
        label="Create New Game"
        onClick={() => {
          console.log("Create New");
        }}
      />
      <Button
        label="Join Existing Game"
        onClick={() => {
          console.log("Join Existing");
        }}
      />
    </div>
  );
}

module.exports = MainPage;
