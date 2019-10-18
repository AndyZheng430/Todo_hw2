export default class transactionSort{
    constructor(list, oldList, updatedList) {
        this.list = list;
        this.oldList = oldList;
        this.updatedList = updatedList;
    }

    doTransaction() {
        var newList = this.list;
        newList.items = this.updatedList.items;
        this.list = newList;
    }

    undoTransaction() {
        var newList = this.list;
        newList.items = this.oldList.items;
        for(var i = 0; i < newList.items.length; i++) {
            newList.items[i].key = i;
        }
        this.list = newList;
    }
}