import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PlaceForm from "./components/PlaceForm";
import Current from "./components/Current";
import Extended from "./components/Extended";
import Chart from "./components/Chart";

function App() {
  return (
    <div className="App ">
      <Current />
      <Extended />
    </div>
  );
}

export default App;
