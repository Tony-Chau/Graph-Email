import './App.css';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.css';
import  './components/css/base.css';


function App() {
  const style = {
    height: "100%",
    minHeight: "92vh",
    marginBottom: "16px"
  }
  return (
    <div className="App" style={style}>
      <Home/>
    </div>
  );
}

export default App;
