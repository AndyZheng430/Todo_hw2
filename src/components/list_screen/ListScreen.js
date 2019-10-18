import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
    showModal = () => {
        document.getElementsByClassName("modal")[0].classList.add("is_visible");
    }
    hideModal = () => {
        document.getElementsByClassName("modal is_visible")[0].classList.remove("is_visible");
    }

    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash showModal={this.showModal}/>
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            value={this.props.getListName()} 
                            type="text" 
                            id="list_name_textfield" 
                            onChange={(e) => this.props.setListName(e)}/>
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            value={this.props.getListOwner()}
                            type="text" 
                            id="list_owner_textfield" 
                            onChange={(e) => this.props.setListOwner(e)}/>
                    </div>
                </div>
                <ListItemsTable 
                    todoList={this.props.todoList} 
                    moveUp={this.props.moveUp} 
                    moveDown={this.props.moveDown} 
                    deleteItem={this.props.deleteItem}
                    sortItem={this.props.sortItem}
                    editListItem={this.props.editListItem}
                    addNewItem={this.props.addNewItem}
                    />
                <div className="modal">
                    <div className="modal_dialog">
                        <p>Delete list?</p> 
                        <p><strong>Are you sure you want to delete this list?</strong></p>
                        <input id="delete_dialog_yes" type="button" value="Yes" onClick={this.props.removeList}/> 
                        <input id="delete_dialog_no" type="button" value="No" onClick={this.hideModal}/>
                        <p>The list will not be retreivable.</p>
                    </div>
                </div>
            </div>
        )
    }
}


export default ListScreen
