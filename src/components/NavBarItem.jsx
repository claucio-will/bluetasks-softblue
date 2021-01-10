import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavBarItem extends Component {
    render() {
        return (
            <div id="navItem">
                <Link className={`nav-item nav-link ${this.props.item.active ? "active" : ""}`}
                    to={this.props.href}
                    onClick={(_)=> this.props.onClick(this.props.item)}>
                    {this.props.name}</Link>
            </div>
        )
    }
}

export default NavBarItem
