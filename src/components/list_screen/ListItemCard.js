import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ListItemCard extends Component {

    // Prints Completed or Pending if the item is completed or not.
    printCompleted = () => {
        return this.props.listItem.completed==true ? 'Completed': 'Pending';
    }

    showDisabledUp = () => {
        return this.props.listItem.key == 0? 'list_item_up_arrow disabled': 'list_item_up_arrow';
    }

    render() {
        const { key } = this.props.listItem;
        return (
            <div className='list_item_card' onClick={this.props.editListItem.bind(this, key)}>
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
                    <button className={this.showDisabledUp()} onClick={(e) => this.props.moveUp(e, key)}>
                        &#8593;
                    </button>
                </div>
                <div className='list_item_button_container'>
                    <button className={this.props.showDisabledDown(key)}  onClick={(e) => this.props.moveDown(e, key)}>
                        &#8595;
                    </button>
                </div>
                <div className='list_item_button_container' onClick={(e) => this.props.deleteItem(e, key)}>
                    <button className='list_item_delete'>
                        &#x2715;
                    </button>
                </div>
            </div>
        )
    }
}

export default ListItemCard
