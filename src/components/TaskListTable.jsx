import React, { Component } from 'react'

export default class TaskListTable extends Component {
    render() {
        return (
            <table>
                <TableHeader />
                <TableBody />
            </table>
        )
    }
}

function TableHeader() {
    return (
        <table>
            <tr>
                <td>Status</td>
                <td>Descrição</td>
                <td>Data</td>
                <td>Ação</td>
            </tr>
        </table>
    )
}

function TableBody() {
    return (
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    )
}
