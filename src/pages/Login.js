import React, { Component } from 'react';

class Login extends Component {
    state = {
      name: '',
      email: '',
      isDisable: true,
    }

    handleChange = ({ target: { name: nome, value } }) => {
      this.setState({
        [nome]: value,
      }, () => {
        const { email, name } = this.state;
        if (email.length !== 0 && name.length !== 0) {
          this.setState({ isDisable: false });
        } else {
          this.setState({ isDisable: true });
        }
      });
    }

    render() {
      const { name, email, isDisable } = this.state;
      return (
        <form>
          <input
            name="name"
            type="text"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />

          <input
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />

          <button
            type="submit"
            data-testid="btn-play"
            disabled={ isDisable }
          >
            Play
          </button>
        </form>
      );
    }
}

export default Login;
