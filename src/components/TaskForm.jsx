import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import TaskService from '../api/task_service';

export default class TaskForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            task: {
                id: 0,
                description: "",
                whenToDo: ""
            },
            redirect: false,
            buttonName: 'Cadastrar'
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        TaskService.save(this.state.task);
        this.setState({ redirect: true });

    }

    onInputChangeHandler(event) {
        const field = event.target.name;
        const value = event.target.value;
        this.setState(prevState => ({ task: { ...prevState.task, [field]: value } }));
        console.log(this.state.task);

    }

    componentDidMount() {
        const editId = this.props.match.params.id;
        if (editId) {
            //Modo de edição
            const task = TaskService.load(parseInt(editId));
            this.setState({ task: task, buttonName: 'Alterar' });

        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <h1>Cadastro da Tarefa</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="description">Descrição</label>
                        <input type="text" className="form-control" name="description" placeholder="Digite a Descrição" onChange={this.onInputChangeHandler} value={this.state.task.description} />
                    </div>
                    &nbsp;
                    <div className="form-group">
                        <label htmlFor="whenToDo">Data</label>
                        <input type="date" className="form-control" name="whenToDo" placeholder="Digite a data" onChange={this.onInputChangeHandler} value={this.state.task.whenToDo} />
                    </div>
                    <button type="submit" className="btn btn-primary">{this.state.buttonName}</button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={() => this.setState({ redirect: true })}>Cancelar</button>
                </form>
            </div>
        )
    }
}
