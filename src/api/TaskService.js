import axios from 'axios';
import { API_ENDPOINT } from '../contantes';
import AuthService from './AuthService'

class TaskService {
    constructor() {
        this.tasks = [
            { id: 1, description: 'Tarefa 1', whenToDo: '2020/01/03', done: false },
            { id: 2, description: 'Tarefa 2', whenToDo: '2020/01/02', done: true },
            { id: 3, description: 'Tarefa 3', whenToDo: '2020/01/05', done: false },
        ]
    }

    list(onFech, onError) {
        axios.get(`${API_ENDPOINT}/task?sort=whenToDo,asc`, this.buildAuthHeader())
            .then(response => onFech(response.data.content))
            .catch(error => onError(error));
    }
    delete(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    load(id) {
        return this.tasks.filter(t => t.id === id)[0];  
    }

    save(task) {
        if (task.id !== 0) {
          this.tasks = this.tasks.map(e => task.id !== e.id ? e : task);
        } else {
            const taskId = Math.max(...this.tasks.map(t => t.id)) + 1
            task.id = taskId;
            this.tasks.push(task);
        }
    }

    buildAuthHeader() {
        return {
            headers: { 
             'Authorization': `Bearer  ${AuthService.getJWTToken()}`
               
            }
        }
    }
}
export default new TaskService();
