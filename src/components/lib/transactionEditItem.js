export default class transactionEditItem{
    constructor(list, oldList, updatedList, index) {
        this.list = list;
        this.oldItem = oldList;
        this.newItem = updatedList;
        this.index = index;
    }

    doTransaction() {
        var newList = this.list;
        newList.items[this.index] = this.newItem;
        this.list = newList;
    }

    undoTransaction() {
        var newList = this.list;
        newList.items[this.index] = this.oldItem;
        this.list = newList;
    }
}