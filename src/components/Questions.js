import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      trivia: [],
      count: 0,
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  renderQuestion = () => {
    const { trivia, count } = this.state;
    if (trivia !== 0) {
      const testMap = trivia.map((triv, index) => ({
        id: index,
        triv,
      }));
      const triviaId = testMap;
      const filterQuestions = triviaId.find((triv) => triv.id === count);
      const question = filterQuestions.triv;
      const incorrectAnswers = question.incorrect_answers.map((element) => ({
        name: 'wrong-answer',
        answer: element,
      }));
      const correctAnswer = { name: 'correct-answer', answer: question.correct_answer };
      const arrayAnswer = [correctAnswer, ...incorrectAnswers];

      const ordenedAnswer = (array) => {
        for (let i = array.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      };
      ordenedAnswer(arrayAnswer);

      return (
        <div>
          <p data-testid="question-category">{question.category}</p>
          <p data-testid="question-text">{question.question}</p>
          <div data-testid="answer-options">
            {arrayAnswer.map((eachAnswer, index = 0) => (
              <button
                key={ eachAnswer.answer }
                type="button"
                data-testid={ eachAnswer.name === 'wrong-answer'
                  ? `wrong-answer-${index}`
                  : 'correct-answer' }
              >
                { eachAnswer.answer }
              </button>
            ))}
          </div>
        </div>
      );
    }
  }

    getQuestions = async () => {
      const { historyProp } = this.props;
      const token = localStorage.getItem('token');
      const questions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const questionsTrivia = await questions.json();
      if (questionsTrivia.results.length === 0) {
        localStorage.removeItem('token');
        historyProp.push('/');
      }

      this.setState({
        trivia: [...questionsTrivia.results],
        loading: false,
      });
    };

    render() {
      const { loading } = this.state;
      return (
        <div>
          { loading ? <p>Loading...</p>
            : (this.renderQuestion())}
        </div>
      );
    }
}

Questions.defaultProps = {
  historyProp: {},
};

Questions.propTypes = {
  historyProp: PropTypes.shape(PropTypes.any),
};

export default Questions;
