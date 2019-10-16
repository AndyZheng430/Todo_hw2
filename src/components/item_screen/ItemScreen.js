import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    render() {
        return (
            <div>
                <div id="item_form_container">
                    <strong> Item </strong>
                </div>
                <div id="item_description_prompt">
                    <strong>Description: </strong>
                    <input id="item_description_textfield" type="text" defaultValue={this.props.todoItem.description}/>
                </div>
                <div id="item_assigned_to_prompt">
                    <strong>AssignedTo: </strong>
                    <input id="item_assigned_to_textfield" type="text" defaultValue={this.props.todoItem.assigned_to}/>
                </div>
                <div id="item_due_date_prompt">
                    <strong>Due Date: </strong>
                    <input id="item_due_date_picker" type="date" defaultValue={this.props.todoItem.due_date}/>
                </div>
                <div>
                    <strong>Completed: </strong>
                    <input id="item_completed_checkbox" type="checkbox" defaultChecked={this.props.todoItem.completed}/>
                </div>
                <div>
                    <input id="item_form_submit_button" type="button" onClick={this.props.changeItem} value="Submit"/>
                    <input id="item_form_cancel_button" type="button" onClick={this.props.goBack} value="Cancel"/>
                </div>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
