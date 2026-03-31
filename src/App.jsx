import { useState } from "react";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Navbar from "./components/Navbar";

function App() {
  const [page, setPage] = useState(1);

  return (
    <div>
      {/* Navbar */}
      <Navbar page={page} setPage={setPage} />

      {/* Pages */}
      <div className="pt-4">
        {page === 1 ? <Page1 /> : <Page2 />}
      </div>
    </div>
  );
}

export default App;