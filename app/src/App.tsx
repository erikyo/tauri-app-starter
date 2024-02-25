import Tasks from "./components/Tasks.tsx";
import { Header } from "./components/Header.tsx";

function App() {
  return (
    <div className="container m-auto">
      <div className="max-w-md mx-auto bg-white border border-slate-100 shadow-lg rounded-lg overflow-hidden my-16 p-4">
        <Header />
        <Tasks />
      </div>
    </div>
  );
}

export default App;
