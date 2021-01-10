import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import AuthService from '../api/AuthService';
import Alert from './Alert';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            alert: null,
            processing: false,
            loggedIn: false
        }

        this.handleInputChanged = this.handleInputChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        this.setState({ processing: true });
        AuthService.login(this.state.username, this.state.password, sucess => {
            if (sucess) {
                this.setState({loggedIn: true})
            } else {
                this.setState({alert: 'Não foi possivel realizar o login'})
            }
            this.setState({processing: false});
        });
    }

    handleInputChanged(event) {
        const field = event.target.name;
        const value = event.target.value;
        this.setState({ [field]: value });
    }

    render() {
        if (this.state.loggedIn) {
            return <Redirect to="/"/>
        }
        return (
            <div>
                <h1>Login</h1>
                {this.state.alert !== null ? <Alert message={this.state.alert} /> : ""}
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="username">Usúario</label>
                        <input
                            className="form-control"
                            type="text"
                            onChange={this.handleInputChanged}
                            name="username"
                            value={this.state.username}
                            placeholder="Digite o Nome de Usúario"
                        />
                    </div>
                   &nbsp;
                    <div className='form-group'>
                        <label htmlFor="password">Senha</label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChanged}
                            placeholder="Digite sua senha"
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={this.state.processing}>Login</button>
                </form>
            </div>
        )
    }
}
