export default class transactionDelete{
    constructor(list, item, index) {
        this.list = list;
        this.index = index;
        this.removedItem = item;
    }

    doTransaction() {
        var newList = this.list;
        newList.items.splice(this.index, 1);
        for( var i = 0; i < newList.items.length; i++ ){
            newList.items[i].key = i;
        }
        this.list = newList;
    }

    undoTransaction() {
        var newList = this.list;
        newList.items.splice(this.index, 0, this.removedItem);
        for( var i = 0; i < newList.items.length; i++ ){
            newList.items[i].key = i;
        }
        this.list = newList;
    }
}