import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogInPage from "./LogInPage";
import Home from "./Home";
import FileUpload from "./uploadFile";
import ImageRenderer from "./Image";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LogInPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/uploadFile" element={<FileUpload />} />
          <Route path="/image" element={<ImageRenderer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
