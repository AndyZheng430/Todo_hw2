import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    render() {
        return (
            <div id="list_items_container">
                <div id="list_item_header">
                    <div className="list_item_task_header" onClick={this.props.organizeItem.bind(this, "description")}>Task</div>
                    <div className="list_item_due_date_header" onClick={this.props.organizeItem.bind(this, "due_date")}>Due Date</div>
                    <div className="list_item_status_header" onClick={this.props.organizeItem.bind(this, "status")}>Status</div>
                </div>
                {
                    // mapping the key and listItem for each Todo 
                    this.props.todoList.items.map((todoItem)=>(
                        <ListItemCard 
                            key={todoItem.key}
                            listItem={todoItem} 
                            moveUp={this.props.moveUp}
                            moveDown={this.props.moveDown} 
                            deleteItem={this.props.deleteItem}/>
                    ))
                }
                <div>
                    <button className="list_item_add_button">&#8853;</button>
                </div>
            </div>
        )
    }
}

export default ListItemsTable
