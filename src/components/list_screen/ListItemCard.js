import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ListItemCard extends Component {

    // Prints Completed or Pending if the item is completed or not.
    printCompleted = () => {
        return this.props.listItem.completed==true ? 'Completed': 'Pending'
    }
    
    render() {
        const { key } = this.props.listItem;
        return (
            <div className='list_item_card'>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                <div className='list_item_card_completed'>
                    {this.printCompleted()}
                </div>
                <div className='list_item_button_container'>
                    <button className='list_item_up_arrow' onClick={this.props.moveUp.bind(this, key)}>
                        &#8593;
                    </button>
                </div>
                <div className='list_item_button_container'>
                    <button className='list_item_down_arrow'  onClick={this.props.moveDown.bind(this, key)}>
                        &#8595;
                    </button>
                </div>
                <div className='list_item_button_container' onClick={this.props.deleteItem.bind(this, key)}>
                    <button className='list_item_delete'>
                        &#x2715;
                    </button>
                </div>
            </div>
        )
    }
}

export default ListItemCard
