import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'

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
    currentItem: null
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    var index = this.state.todoLists.indexOf(this.state.currentList);
    this.state.todoLists.splice(index, 1);
    this.state.todoLists.unshift(this.state.currentList);
    for(var i = 0; i < this.state.todoLists.length; i++) {
      this.state.todoLists[i].key = i;
    }
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
    this.state.currentItem.description = document.getElementById("item_description_textfield").value;
    this.state.currentItem.assigned_to = document.getElementById("item_assigned_to_textfield").value;
    this.state.currentItem.due_date = document.getElementById("item_due_date_picker").value;
    this.state.currentItem.completed = document.getElementById("item_completed_checkbox").value;
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
  }

  addNewItem = () => {
    var obj = {
      assigned_to: "",
      description: "",
      due_date: "",
      completed: false,
      key: this.state.currentList.items.length
    };
    this.state.currentList.items.push(obj);
    console.log(this.state.currentList.items[this.state.currentList.items.length - 1]);
    this.setState({currentItem: this.state.currentList.items[this.state.currentList.items.length - 1]});
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
  }
  render() {
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