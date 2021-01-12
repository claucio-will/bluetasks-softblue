import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import TaskService from "../api/TaskService"
import 'react-toastify/dist/ReactToastify.css'
import { Redirect } from 'react-router-dom';
import AuthService from '../api/AuthService';
import Spinner from './Spinner';
import Alert from './Alert'


export default class TaskListTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            editId: 0,
            loading: false,
            alert: null
        }

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onStatusChangeHandler = this.onStatusChangeHandler.bind(this);
        this.onEditHandler = this.onEditHandler.bind(this);
    }

    componentDidMount() {
        this.listTasks();
    }

    listTasks() {
        if (!AuthService.isAuthentication) {
            return;
        }
        this.setState({ loading: true });
        TaskService.list(
            tasks => this.setState({ tasks: tasks, loading: false }),
            error => this.setErrorState(error)
        );
    }

    setErrorState(error) {
        this.setState({alert: `Erro na requisição: ${error.message}`, loading: false})
    }

    onDeleteHandler(id) {
        if (window.confirm('Deseja Realmente Excluir Essa Tarefa ?')) {
            TaskService.delete(id);
            this.listTasks();
            toast.success('Tarefa Excluida!', { position: toast.POSITION_BOTTOM_LEFT });
        }
    }
    onEditHandler(id) {
        this.setState({ editId: id });
    }

    onStatusChangeHandler(task) {
        task.done = !task.done;
        TaskService.save(task);
        this.listTasks();
    }

    render() {
        if (!AuthService.isAuthentication()) {
            return <Redirect to="/login" />
        }
        if (this.state.editId > 0) {
            return <Redirect to={`/form/${this.state.editId}`} />
        }
        return (
            <> 
                <h1>Lista de Tarefas</h1> 
                {this.state.alert != null ? <Alert message={this.state.alert} /> : "" }
                {this.state.loading ? <Spinner /> :
                    <table className="table table-striped">
                        <TableHeader />
                        {this.state.tasks.length > 0 ?
                            <TableBody tasks={this.state.tasks} onDelete={this.onDeleteHandler} onStatusChange={this.onStatusChangeHandler} onEdit={this.onEditHandler} /> :
                            <EmptyTableBody />}
                    </table>
                }
                <ToastContainer autoClose={3000} />

            </>
        )
    }
}
function TableHeader() {
    return (
        <thead id="tableHeader">
            <tr>
                <th scope="col">Status</th>
                <th scope="col" >Descrição</th>
                <th scope="col">Data</th>
                <th scope="col">Ação</th>
            </tr>
        </thead>

    )
}

function TableBody(props) {
    return (
        <tbody>
            {props.tasks.map(task =>
                <tr key={task.id}>
                    <td><input type="checkbox" checked={task.done} onChange={() => props.onStatusChange(task)}></input></td>
                    <td>{task.done ? <s>{task.description}</s> : task.description}</td>
                    <td>{task.done ? <s>{task.whenToDo}</s> : task.whenToDo}</td>
                    <td>
                        <input className="btn btn-primary" type="button" value="Editar" onClick={() => props.onEdit(task.id)} />
                        &nbsp;
                        <input
                            className="btn btn-danger"
                            type="button"
                            value="Excluir"
                            onClick={() => props.onDelete(task.id)} />

                    </td>
                </tr>
            )}
        </tbody>
    )

}

function EmptyTableBody() {
    return (
        <tbody>
            <tr><td id="msgEmptyTable" colSpan="4">Sem Tarefas Cadastradas no Momento</td></tr>
        </tbody>
    );
}
