import { Routes, Route } from "react-router-dom";
import Setting from "./pages/Setting";
import Questions from "./pages/Questions";
import FinalScreen from "./pages/FinalScreen";
import { Box, Container } from "@mui/material";

const App = () => {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <Routes>
          <Route path="/" element={<Setting />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/score" element={<FinalScreen />} />
        </Routes>
      </Box>
    </Container>
  );
};

export default App;
