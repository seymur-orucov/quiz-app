import { Box, Button, CircularProgress, Typography } from "@mui/material";
import SelectField from "../components/SelectField";
import InputField from "../components/InputField";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const { response, error, loading } = useAxios({ url: "/api_category.php" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/questions");
  };

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" mt={20} color="red">
        Some went wrong!
      </Typography>
    );
  }

  const difficultlyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const typeOptions = [
    { id: "multiple", name: "Multiple choose" },
    { id: "boolean", name: "True/False" },
  ];

  return (
    <div>
      <Typography variant="h2" fontWeight="bold">
        Quiz App
      </Typography>
      <form onSubmit={handleSubmit}>
        <SelectField options={response.trivia_categories} label="Category" />
        <SelectField options={difficultlyOptions} label="Difficulty" />
        <SelectField options={typeOptions} label="Type" />
        <InputField />
        <Box mt={3} width="100%">
          <Button fullWidth variant="contained" type="submit">
            Get Started
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Setting;
