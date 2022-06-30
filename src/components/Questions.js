import React, { Component } from 'react';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      trivia: [],
      count: 0,
    };
  }

  // const randomElement = array[Math.floor(Math.random() * array.length)];
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
      console.log(question);
      const incorrectAnswers = question.incorrect_answers.map((element) => ({
        name: 'wrong-answer',
        answer: element,
      }));
      const correctAnswer = { name: 'correct-answer', answer: question.correct_answer };
      const arrayAnswer = [correctAnswer, ...incorrectAnswers];
      const numberMagic = -1;
      // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
      const ordenedAnswer = arrayAnswer.sort((a, b) => {
        if (a.answer > b.answer) { return 1; }
        if (a.answer < b.answer) { return numberMagic; }
        return 0; // a must be equal to b
      });
      console.log('name:', ordenedAnswer);
      return (
        <div>
          <p>{question.category}</p>
          <p>{question.question}</p>
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
      );
    }
  }

    getQuestions = async () => {
      const token = 'a9ae6153fa761459992830486a962f3b0012ad108f5095b1edcf3b0e7057a5f2';
      const questions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const questionsTrivia = await questions.json();
      console.log(questionsTrivia);
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

export default Questions;
