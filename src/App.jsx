import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Phone from "./pages/Phone";
import ViewDetails from "./pages/ViewDetails";
import { PhoneProvider } from "./context/Context";

const App = () => {
  return (
    <PhoneProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Phone />} />
          <Route path="/viewDetails" element={<ViewDetails />} />
        </Routes>
      </Router>
    </PhoneProvider>
  );
};

export default App;
