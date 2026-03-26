import bcg from "./Dodge2.jpg"
import './App.css';
import Notes from "./Component/Notes";

function App() {
  return (
    <div className="App">
      <div className="background"><img src={bcg} alt="bcg" /></div>
      <h1 className="title">Notes 📝</h1>
      <Notes />
    </div>
  );
}

export default App;
