import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json';
import HomeScreen from './components/home_screen/HomeScreen';
import ItemScreen from './components/item_screen/ItemScreen';
import ListScreen from './components/list_screen/ListScreen';
import transactionMoveUp from './components/lib/transactionMoveUp.js';
import jsTPS from './components/lib/jsTPS.js';
import transactionSort from './components/lib/transactionSort.js';
import transactionMoveDown from './components/lib/transactionMoveDown.js';
import transactionDelete from './components/lib/transactionDelete.js';
import transactionName from './components/lib/transactionName.js';
import transactionOwner from './components/lib/transactionOwner.js';
import transactionEditItem from './components/lib/transactionEditItem.js';
import transactionNewItem from './components/lib/transactionNewItem.js';
var ascState = "";
var ascBool = false;

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    currentItem: null,
    tps: new jsTPS()
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    var index = this.state.todoLists.indexOf(this.state.currentList);
    this.state.todoLists.splice(index, 1);
    this.state.todoLists.unshift(this.state.currentList);
    for(var i = 0; i < this.state.todoLists.length; i++) {
      this.state.todoLists[i].key = i;
    }
    this.setState({tps: new jsTPS});
    this.setState({currentList: null});
    this.setState({currentItem: null});
  }

  removeList = () => {
    this.goHome();
    this.state.todoLists.splice(this.state.currentList.key, 1);
    for(var i = 0; i < this.state.todoLists.length; i++) {
      this.state.todoLists[i].key = i;
    }
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }

  addNewList = () => {
    var obj = {
      key: this.state.todoLists.length,
      name: "Unknown",
      owner: "Unknown",
      items: []
    }
    this.state.todoLists.push(obj);
    this.setState({currentList: this.state.todoLists[this.state.todoLists.length - 1]});
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
  }

  editListItem = (key) => {
    console.log("2");
    this.setState({currentItem: this.state.currentList.items[key]});
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
  }

  goBack = () => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
  }

  changeItem = () => {
    var oldList = {
      key: this.state.currentItem.key,
      description: this.state.currentItem.description,
      due_date: this.state.currentItem.due_date,
      assigned_to: this.state.currentItem.assigned_to,
      completed: this.state.currentItem.completed
    }

    this.state.currentItem.description = document.getElementById("item_description_textfield").value;
    this.state.currentItem.assigned_to = document.getElementById("item_assigned_to_textfield").value;
    this.state.currentItem.due_date = document.getElementById("item_due_date_picker").value;
    this.state.currentItem.completed = document.getElementById("item_completed_checkbox").checked;
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    
    var newList = {
      key: this.state.currentItem.key,
      description: this.state.currentItem.description,
      due_date: this.state.currentItem.due_date,
      assigned_to: this.state.currentItem.assigned_to,
      completed: this.state.currentItem.completed
    }
    var editTransaction = new transactionEditItem(this.state.currentList, oldList, newList, oldList.key);
    this.state.tps.addTransaction(editTransaction);

    this.setState({currentList: this.state.currentList});
  }

  addNewItem = () => {
    var obj = {
      assigned_to: "",
      description: "",
      due_date: "",
      completed: false,
      key: this.state.currentList.items.length
    };
    var newItemTransaction = new transactionNewItem(this.state.currentList, obj);
    this.state.tps.addTransaction(newItemTransaction);
    this.setState({currentItem: this.state.currentList.items[this.state.currentList.items.length - 1]});
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
  }

  moveUp = (e, key) => {
    e.stopPropagation();
    if(key != 0) {
      var up = this.state.currentList.items[key-1];
      up.key = key;
      var current = this.state.currentList.items[key];
      current.key = key - 1;
      this.state.currentList.items[key-1] = current;
      this.state.currentList.items[key] = up;

      var moveUpTransaction = new transactionMoveUp(this.state.currentList, key, key-1, current, up);
      this.state.tps.addTransaction(moveUpTransaction);

      this.setState({currentList: this.state.currentList});
    }
  }

  moveDown = (e, key) => {
    e.stopPropagation();
    if(key != this.state.currentList.items.length-1) {
        var down = this.state.currentList.items[key+1];
        down.key = key;
        var current = this.state.currentList.items[key];
        current.key = key + 1;
        this.state.currentList.items[key+1] = current;
        this.state.currentList.items[key] = down;

        var moveDownTransaction = new transactionMoveDown(this.state.currentList, key, key+1, current, down);
        this.state.tps.addTransaction(moveDownTransaction);

        this.setState({currentList: this.state.currentList});
    }
  }

  deleteItem = (e, key) => {
    e.stopPropagation();
    var removed = this.state.currentList.items[key];
    this.state.currentList.items.slice(key, 1);
    for (var i = 0; i < this.state.currentList.items.length; i++) {
        this.state.currentList.items[i].key = i;
    }

    var deleteTransaction = new transactionDelete(this.state.currentList, removed, key);
    this.state.tps.addTransaction(deleteTransaction);

    this.setState({currentList: this.state.currentList});
  }

  getListName = () => {
    return this.state.currentList.name;;
  }

  setListName = (e) => {
    var name = this.getListName();
    this.state.currentList.name = e.target.value;
    var nameTransaction = new transactionName(this.state.currentList, name, e.target.value);
    this.state.tps.addTransaction(nameTransaction);
    this.setState({currentList: this.state.currentList});
  }

  getListOwner = () => {
    return this.state.currentList.owner;
  }

  setListOwner = (e) => {
    var owner = this.getListOwner();
    this.state.currentList.owner = e.target.value;
    var ownerTransaction = new transactionOwner(this.state.currentList, owner, e.target.value);
    this.state.tps.addTransaction(ownerTransaction);
    this.setState({currentList: this.state.currentList});
  }

  sortItem = (criteria) => {
    var oldList = {
      "key": this.state.currentList.key,
      "name": this.getListName(),
      "owner": this.getListOwner(),
      "items": []
    }
    for(var i = 0; i < this.state.currentList.items.length; i++) {
      oldList.items.push(this.state.currentList.items[i]);
    }
    this.organizeItem(criteria);
    var newList = {
      "key": this.state.currentList.key,
      "name": this.getListName(),
      "owner": this.getListOwner(),
      "items": []
    }
    for(var i = 0; i < this.state.currentList.items.length; i++) {
      newList.items.push(this.state.currentList.items[i]);
    }
    var sortTransaction = new transactionSort(this.state.currentList, oldList, newList);
    this.state.tps.addTransaction(sortTransaction);

    this.setState({currentList: this.state.currentList});
  }
  organizeItem(criteria) {
    if (criteria == "description") {
        if (ascState != criteria) {
            ascState = criteria; 
            ascBool = true;
        }
        else {
            ascBool = !ascBool;
        }
        if (ascBool == true) {
            this.state.currentList.items.sort((a,b) => a.description > b.description);
        } 
        else if (ascBool != true) {
            this.state.currentList.items.sort((a,b) => a.description < b.description);
        }
    }
    else if (criteria == "due_date") {
        if (ascState != criteria) {
            ascState = criteria; 
            ascBool = true;
        }
        else {
            ascBool = !ascBool;
        }
        if (ascBool == true) {
            this.state.currentList.items.sort((a,b) => a.due_date > b.due_date);
        } 
        else if (ascBool != true) {
            this.state.currentList.items.sort((a,b) => a.due_date < b.due_date);
        }
    }
    else if (criteria == "status") {
        if (ascState != criteria) {
            ascState = criteria; 
            ascBool = true;
        }
        else {
            ascBool = !ascBool;
        }
        if (ascBool == true) {
            this.state.currentList.items.sort((a,b) => a.completed < b.completed);
        } 
        else if (ascBool != true) {
            this.state.currentList.items.sort((a,b) => a.completed > b.completed);
        }
    }
    for (var i = 0; i < this.state.currentList.items.length; i++) {
        this.state.currentList.items[i].key = i;
    }
  }

  redo() {
    this.state.tps.doTransaction();
    console.log('REDO');
    this.setState({currentList: this.state.currentList});
    console.log(this.state.currentList.items);
  }
  undo() {
    this.state.tps.undoTransaction();
    console.log('UNDO');
    this.setState({currentList: this.state.currentList});
    console.log(this.state.currentList.items);
  }
  detectKeyPress = (e) => {
    if(this.state.currentScreen == 'LIST_SCREEN') {
      if(e.ctrlKey && e.key == 'z') {
        this.undo();
      }
      else if(e.ctrlKey && e.key == 'y') {
        this.redo();
      }
    }
  }

  render() {
    document.body.addEventListener('keydown', this.detectKeyPress);
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
          loadList={this.loadList.bind(this)} 
          todoLists={this.state.todoLists} 
          addNewList={this.addNewList}
          />;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList} 
          removeList={this.removeList}
          editListItem={this.editListItem}
          addNewItem={this.addNewItem}
          moveUp={this.moveUp}
          moveDown={this.moveDown}
          deleteItem={this.deleteItem}
          setListName={this.setListName}
          getListName={this.getListName}
          setListOwner={this.setListOwner}
          getListOwner={this.getListOwner}
          sortItem={this.sortItem}
          />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
          currentScreen={this.state.currentScreen}
          todoItem={this.state.currentItem}
          goBack={this.goBack}
          changeItem={this.changeItem}
          />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;