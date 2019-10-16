import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

var ascState = "";
var ascBool = false;

export class ListScreen extends Component {
    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return this.props.todoList.name;
        }
        else
            return "";
    }
    setListName(e) {
        this.props.todoList.name = e.target.value;
    }
    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return this.props.todoList.owner;
        }
    }
    setListOwner(e) {
        this.props.todoList.owner = e.target.value;
    }
    moveUp = (e, key) => {
        if(key != 0) {
            var up = this.props.todoList.items[key-1];
            up.key = key;
            var current = this.props.todoList.items[key];
            current.key = key - 1;
            this.props.todoList.items[key-1] = current;
            this.props.todoList.items[key] = up;
            this.forceUpdate();
        }
        e.stopPropagation();
    }
    moveDown = (e, key) => {
        if(key != this.props.todoList.items.length-1) {
            var down = this.props.todoList.items[key+1];
            down.key = key;
            var current = this.props.todoList.items[key];
            current.key = key + 1;
            this.props.todoList.items[key+1] = current;
            this.props.todoList.items[key] = down;
            this.forceUpdate();
        }
        e.stopPropagation();
    }
    deleteItem = (e, key) => {
        this.props.todoList.items.splice(key, 1);
        for (var i = 0; i < this.props.todoList.items.length; i++) {
            this.props.todoList.items[i].key = i;
        }
        this.forceUpdate();
        e.stopPropagation();
    }
    organizeItem(criteria) {
        if (criteria == "description") {
            if (ascState != criteria) {
                ascState = criteria; 
                ascBool = true;
            }
            else {
                ascBool = !ascBool;
            }
            if (ascBool == true) {
                this.props.todoList.items.sort((a,b) => a.description > b.description);
            } 
            else if (ascBool != true) {
                this.props.todoList.items.sort((a,b) => a.description < b.description);
            }
        }
        else if (criteria == "due_date") {
            if (ascState != criteria) {
                ascState = criteria; 
                ascBool = true;
            }
            else {
                ascBool = !ascBool;
            }
            if (ascBool == true) {
                this.props.todoList.items.sort((a,b) => a.due_date > b.due_date);
            } 
            else if (ascBool != true) {
                this.props.todoList.items.sort((a,b) => a.due_date < b.due_date);
            }
        }
        else if (criteria == "status") {
            if (ascState != criteria) {
                ascState = criteria; 
                ascBool = true;
            }
            else {
                ascBool = !ascBool;
            }
            if (ascBool == true) {
                this.props.todoList.items.sort((a,b) => a.completed < b.completed);
            } 
            else if (ascBool != true) {
                this.props.todoList.items.sort((a,b) => a.completed > b.completed);
            }
        }
        for (var i = 0; i < this.props.todoList.items.length; i++) {
            this.props.todoList.items[i].key = i;
        }
        this.forceUpdate();
        console.log(this.props.todoList.items);
    }
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
                            defaultValue={this.getListName()} 
                            type="text" 
                            id="list_name_textfield" 
                            onChange={this.setListName.bind(this)}/>
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            defaultValue={this.getListOwner()}
                            type="text" 
                            id="list_owner_textfield" 
                            onChange={this.setListOwner.bind(this)}/>
                    </div>
                </div>
                <ListItemsTable 
                    todoList={this.props.todoList} 
                    moveUp={this.moveUp} 
                    moveDown={this.moveDown} 
                    deleteItem={this.deleteItem}
                    organizeItem={this.organizeItem}
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
