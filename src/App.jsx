import InvitationCard from './components/InviationCard';
import InviationCardGuest from './components/InviationCardGuest';
import Home from './Home';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/invitation/:id" element={<InvitationCard />} />
        <Route path="/invitation/:id/guest" element={<InviationCardGuest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
