export default class transactionNewItem{
    constructor(list, item) {
        this.list = list;
        this.item = item;
    }

    doTransaction() {
        var newlist = this.list;
        newlist.items.push(this.item);
        this.list = newlist;
    }

    undoTransaction() {
        var newlist = this.list;
        newlist.items.pop();
        this.list = newlist;
    }
}