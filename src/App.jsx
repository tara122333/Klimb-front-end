import { Route,Routes } from "react-router-dom";
import UploadFile from "./Components/UploadFile";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Routes>
      <Route path="/" exect element={<UploadFile />} />
    </Routes> 
  );
}

export default App;
