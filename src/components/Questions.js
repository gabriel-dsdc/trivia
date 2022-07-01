import React, { Component } from 'react';
import PropTypes from 'prop-types';

const CORRECT_ANSWER = 'correct-answer';
const WRONG_ANSWER = 'wrong-answer';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      count: 0,
      isAnswered: false,
      timer: 30,
    };
  }

  componentDidMount = async () => {
    await this.getQuestions();
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(this.handleTimer, ONE_SECOND);
  }

  handleTimer = () => {
    const { timer } = this.state;
    if (timer !== 0) {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    } else {
      clearInterval(this.intervalId);
      this.setState({ isAnswered: true });
    }
  };

  handleClick = () => {
    this.setState({ isAnswered: true });
  }

  isCorrect = (answerName) => (answerName === CORRECT_ANSWER
    ? 'green-border'
    : 'red-border')

  renderQuestion = ({ trivia }) => {
    const { count } = this.state;
    if (trivia !== 0) {
      const triviaId = trivia.map((triv, index) => ({
        id: index,
        triv,
      }));
      const filterQuestions = triviaId.find((triv) => triv.id === count);
      const question = filterQuestions.triv;
      const incorrectAnswers = question.incorrect_answers.map((element) => ({
        name: WRONG_ANSWER,
        answer: element,
      }));
      const correctAnswer = { name: CORRECT_ANSWER, answer: question.correct_answer };
      const arrayAnswer = [correctAnswer, ...incorrectAnswers];
      const ordenedAnswer = (array) => {
        for (let i = array.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      };
      ordenedAnswer(arrayAnswer);
      this.setState({
        arrayAnswer,
        question,
        loading: false,
      });
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

      const obj = {
        trivia: [...questionsTrivia.results],
      };
      this.renderQuestion(obj);
    };

    render() {
      const { loading, arrayAnswer, isAnswered, question, timer } = this.state;
      return (
        <div>
          { loading ? <p>Loading...</p>
            : (
              <div>
                <h4>{timer}</h4>
                <p data-testid="question-category">{question.category}</p>
                <p data-testid="question-text">{question.question}</p>
                <div data-testid="answer-options">
                  {arrayAnswer.map((eachAnswer, index = 0) => (
                    <button
                      key={ eachAnswer.answer }
                      type="button"
                      data-testid={ eachAnswer.name === WRONG_ANSWER
                        ? `wrong-answer-${index}`
                        : CORRECT_ANSWER }
                      className={ isAnswered
                        ? this.isCorrect(eachAnswer.name)
                        : '' }
                      disabled={ isAnswered }
                      onClick={ this.handleClick }
                    >
                      { eachAnswer.answer }
                    </button>
                  ))}
                </div>
              </div>
            )}
        </div>
      );
    }
}

Questions.propTypes = {
  historyProp: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Questions;
