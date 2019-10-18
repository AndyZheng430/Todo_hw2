export default class transactionName{
    constructor(list, currentName, newName) {
        this.list = list;
        this.currentName = currentName;
        this.newName = newName;
    }

    doTransaction() {
        var newList = this.list;
        newList.name = this.newName;
        this.list = newList;
    }

    undoTransaction() {
        var newList = this.list;
        this.list.name = this.currentName;
        this.list = newList;
    }
}