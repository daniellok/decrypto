const React = require('react');
const ReactDOM = require('react-dom');

function MainPage() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

const root = document.getElementById('root');
ReactDOM.render(<MainPage />, root);
