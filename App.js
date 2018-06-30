import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      todoList: []
    }
  }

  componentDidMount(){
    this._retrieveData();
  }
  
  _removeAll = async () => {
    try {
        await AsyncStorage.removeItem('todoList');
      } catch (error) {
        alert(error)
        // Error saving data
      }
  }
  
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('todoList', JSON.stringify(this.state.todoList));
    } catch (error) {
      alert(error)
      // Error saving data
    }
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('todoList');
      
      if (value !== null) {
        this.setState({todoList:JSON.parse(value)})
      }
      } catch (error) {
        alert(error)
        // Error retrieving data
      }
  }

  render() {
    const todoList = this.state.todoList.map((item, index) => {
      return !item.done ?
              <View key={index} style={styles.listItem}>
                <Text>> {item.value}</Text>
                <Button
                  onPress={() => this.onDoneTodo(item,index)}
                  title="Done?"
                />
              </View>
          : false;
    });

    const doneList = this.state.todoList.map((item, index) => {
      return item.done ?
              <View key={index} style={styles.listItem}>
                <Text >> {item.value}</Text>
                <Button
                  onPress={() => this.onRedoTodo(item,index)}
                  title="Redo?"
                  color="#841584"
                />
              </View>
        : false;
    });

    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.appTitle}>ToDo App</Text>
        </View>
        <TextInput
          style={{padding:3,borderWidth:1,borderColor:'green',margin:6}}
          value={this.state.text}
          placeholder="Type something"
          onChangeText={(text) => {this.setState({text: text})}}
        />
        {
          this.state.todoList &&
            <View style={{alignItems:'center'}}>
              <Button
                  onPress={this.onAddTodo}
                  title="Add"
                  color="green"
              />
            </View>
        }
        <View style={styles.listContainer}>
          <View style={styles.listContainerTitle}><Text>Todo</Text></View>
          <View style={styles.list}>
            {todoList}
          </View>
        </View>

        <View style={styles.listContainer}>
          <View style={styles.listContainerTitle}><Text>Done</Text></View>
          <View style={styles.list}>
            {doneList}
          </View>
        </View>
      </View>
    );
  }

  onRedoTodo = (item, index) => {
    let todoList = this.state.todoList;
    todoList[index] = {...item, done:false}
    this.setState({
      ...this.setState,
      todoList: todoList
    }, () => {
      this._storeData();
    });
  } 

  onAddTodo = () => {
    if(this.state.todoList) {
      this.setState({
        ...this.state,
        todoList: [{value:this.state.text,done:false}, ...this.state.todoList],
        text:''
      }, () => {
        this._storeData()
      })
    } else {
      alert('Please enter something');
    }
  }

  onDoneTodo = (item, index) => {
    let todoList = this.state.todoList;
    todoList[index] = {...item, done:true}
    this.setState({
      ...this.setState,
      todoList: todoList
    }, () => {
      this._storeData();
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    padding: 3,
    marginBottom: 4,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center'
  },
  appTitle: {
    fontWeight:"bold",
    fontSize:22
  },
  listContainer: {
    marginTop:10,
    marginLeft:4,
    marginRight:4
  },
  listContainerTitle:{
    borderBottomWidth:2
  },
  list: {
    marginTop:2
  },
  listItem: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:2
  }
});
