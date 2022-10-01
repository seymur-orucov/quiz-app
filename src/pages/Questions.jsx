import { Box, Button, CircularProgress, Typography } from "@mui/material";
import useAxios from "../hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleScoreChange } from "../store/actions";
import { decode } from "html-entities";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score,
  } = useSelector((state) => state);
  let apiUrl = `/api.php?amount=${amount_of_question}`;

  question_category &&
    (apiUrl = apiUrl.concat(`&category=${question_category}`));
  question_difficulty &&
    (apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`));
  question_type && (apiUrl = apiUrl.concat(`&type=${question_type}`));

  const { response, error, loading } = useAxios({ url: apiUrl });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];

      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );

      setOptions(answers);
    }
  }, [questionIndex, response]);

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

  const handleClickAnswer = (e) => {
    const question = response.results[questionIndex];

    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else navigate("/score");
  };

  return (
    <Box>
      <Typography variant="h4">Question {questionIndex + 1}</Typography>
      <Typography mt={5}>
        {decode(response.results[questionIndex].question)}
      </Typography>
      {options.map((data, id) => (
        <Box mt={2} key={id}>
          <Button variant="contained" onClick={handleClickAnswer}>
            {decode(data)}
          </Button>
        </Box>
      ))}
      <Typography mt={5} variant="h6">
        Score: {score} / {response.results.length}
      </Typography>
    </Box>
  );
};

export default Questions;
