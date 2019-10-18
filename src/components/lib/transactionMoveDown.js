export default class transactionMoveDown{
    constructor(list, index, nextIndex, indexItem, nextIndexItem) {
        this.list = list;
        this.index = index;
        this.nextIndex = nextIndex;
        this.indexItem = indexItem;
        this.nextIndexItem = nextIndexItem;
    }
    
    doTransaction() {
        var newList = this.list;
    
        newList.items[this.nextIndex] = this.indexItem;
        newList.items[this.index] = this.nextIndexItem;
        newList.items[this.nextIndex].key = this.nextIndex;
        newList.items[this.index].key = this.index;
    
        this.list = newList;
    }
    
    undoTransaction() {
        var newList = this.list;
    
        newList.items[this.index] = this.indexItem;
        newList.items[this.nextIndex] = this.nextIndexItem;
        newList.items[this.nextIndex].key = this.nextIndex;
        newList.items[this.index].key = this.index;
    
        this.list = newList;
    }
}