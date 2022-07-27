import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPlayerAssertions, setPlayerScore } from '../redux/actions';

const CORRECT_ANSWER = 'correct-answer';
const WRONG_ANSWER = 'wrong-answer';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      count: 0,
      isAnswered: false,
      trivia: [],
      timer: 30,
      score: 0,
      assertions: 0,
    };
  }

  componentDidMount = async () => {
    const { setScore } = this.props;
    setScore(0);
    await this.getQuestions();
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(this.handleTimer, ONE_SECOND);
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  };

  handleTimer = () => {
    const { timer } = this.state;
    if (timer > 0) {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    } else {
      clearInterval(this.intervalId);
      this.setState({ isAnswered: true });
    }
  };

  callback = () => {
    const { setScore, setAssertions } = this.props;
    const { score, assertions } = this.state;

    setScore(score);
    setAssertions(assertions);
  }

  handleClick = ({ target }) => {
    this.setState({ isAnswered: true }, () => {
      const { timer } = this.state;
      const difficulty = {
        easy: 1,
        medium: 2,
        hard: 3,
      };
      const number = 10;

      if (target.name === CORRECT_ANSWER) {
        this.setState((prevState) => ({
          score: prevState.score + (number + (timer * difficulty[target.id])),
          assertions: prevState.assertions + 1,
        }), this.callback);

        clearInterval(this.intervalId);
      }
    });
  }

  isCorrect = (answerName) => (answerName === CORRECT_ANSWER
    ? 'green-border'
    : 'red-border')

  renderQuestion = () => {
    const { count, trivia } = this.state;

    if (trivia.length !== 0) {
      const triviaId = trivia.map((triv, index) => ({
        id: index,
        triv,
      }));
      const filterQuestions = triviaId.find((triv) => triv.id === count);
      const question = filterQuestions.triv;
      const { difficulty } = question;
      const incorrectAnswers = question.incorrect_answers.map((element) => ({
        name: WRONG_ANSWER,
        answer: element,
        difficulty,
      }));
      const correctAnswer = {
        name: CORRECT_ANSWER,
        answer: question.correct_answer,
        difficulty };
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
        clearInterval(this.intervalId);
        localStorage.removeItem('token');
        historyProp.push('/');
      }
      this.setState({
        trivia: [...questionsTrivia.results],
      });

      this.renderQuestion();
    };

    handleNext = () => {
      const { count } = this.state;
      const { historyProp } = this.props;
      const ONE_SECOND = 1000;
      const lastQuestion = 4;
      clearInterval(this.intervalId);
      if (count === lastQuestion) {
        historyProp.push('/feedback');
      } else {
        this.setState((prevState) => ({
          isAnswered: false,
          timer: 30,
          count: prevState.count + 1,
        }), () => {
          this.renderQuestion();
          this.intervalId = setInterval(this.handleTimer, ONE_SECOND);
        });
      }
    }

    render() {
      const { loading, arrayAnswer, isAnswered, question, timer } = this.state;
      return (
        <div>
          { loading ? <p>Loading...</p>
            : (
              <div>
                <h4>{`Tempo: ${timer}`}</h4>
                <p data-testid="question-category">{question.category}</p>
                <p data-testid="question-text">{question.question}</p>
                <div data-testid="answer-options">
                  {arrayAnswer.map((eachAnswer, index) => (
                    <button
                      key={ eachAnswer.answer }
                      id={ eachAnswer.difficulty }
                      type="button"
                      name={ eachAnswer.name }
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
                {
                  isAnswered && (
                    <button
                      type="button"
                      onClick={ this.handleNext }
                      data-testid="btn-next"
                    >
                      Next
                    </button>)
                }
              </div>
            )}
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  setScore: (score) => dispatch(setPlayerScore(score)),
  setAssertions: (assertions) => dispatch(setPlayerAssertions(assertions)),
});

Questions.propTypes = {
  historyProp: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setScore: PropTypes.func.isRequired,
  setAssertions: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Questions);
