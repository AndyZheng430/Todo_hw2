export default class transactionOwner{
    constructor(list, currentOwner, newOwner) {
        this.list = list;
        this.currentOwner = currentOwner;
        this.newOwner = newOwner;
    }

    doTransaction() {
        var newList = this.list;
        newList.owner = this.newOwner;
        this.list = newList;
    }

    undoTransaction() {
        var newList = this.list;
        this.list.owner = this.currentOwner;
        this.list = newList;
    }
}