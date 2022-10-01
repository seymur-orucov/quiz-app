import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleScoreChange } from "../store/actions";

const FinalScreen = () => {
  const navigate = useNavigate();
  const { score } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleBackToMainPage = () => {
    dispatch(handleScoreChange(0));
    navigate("/");
  };

  return (
    <Box mt={30}>
      <Typography variant="h3" fontWeight="bold" mb={3}>
        Final Score {score}
      </Typography>
      <Button onClick={handleBackToMainPage} variant="outlined">
        back to main page
      </Button>
    </Box>
  );
};

export default FinalScreen;
