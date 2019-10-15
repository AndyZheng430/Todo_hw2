import React, { Component } from 'react'

export class ListItemCard extends Component {
    render() {
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
                    {this.props.listItem.completed==true ? 'Completed': 'Pending'}
                </div>
                <div className='list_item_up_arrow'>
                    &#8593;
                </div>
                <div className='list_item_down_arrow'>
                    &#8595;
                </div>
                <div className='list_item_delete'>
                    &#x2715;
                </div>
            </div>
        )
    }
}

export default ListItemCard
