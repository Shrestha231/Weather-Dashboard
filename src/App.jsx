import { Routes, Route } from "react-router-dom";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />

      <div className="">
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/Page2" element={<Page2 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;