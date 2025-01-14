import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {

  return (
  <div className="w-full min-h-screen flex">
    <Sidebar />
    <div className="w-full min-h-full p-4 bg-white">
      <div className="w-full h-full rounded-lg bg-gray-200">

      </div>

    </div>

  </div>
  )
}

export default App;
