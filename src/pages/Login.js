import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setUserThunk } from '../redux/actions/index';

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

    // REQUISITO 06, fiz a função apenas para testar se tava funcionando o redux
    // DEPOIS APAGAR OU CONSERTAR A FUNÇÃO
    handleClick = (event) => {
      event.preventDefault();
      const { name, email } = this.state;
      const { setName, history } = this.props;
      setName({ name, email }, history);
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
            placeholder="Nome"
            onChange={ this.handleChange }
          />

          <input
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            value={ email }
            placeholder="Email"
            onChange={ this.handleChange }
          />

          <button
            type="submit"
            data-testid="btn-play"
            disabled={ isDisable }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </form>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  setName: ({ name, email }, history) => dispatch(setUserThunk({ name, email }, history)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setName: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
