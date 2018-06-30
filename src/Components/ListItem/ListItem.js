import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default class ListItem extends Component{
    render() {
        return <View style={styles.listItem}>
                    <Text>> {this.props.item.value}</Text>
                    {
                        this.props.type == "todo" ?
                            <Button
                                onPress={() => this.props.onDoneTodo(this.props.item, this.props.index)}
                                title="Done?"
                            />
                        :
                            <Button
                                onPress={() => this.props.onRedoTodo(this.props.item, this.props.index)}
                                title="Redo?"
                                color="#841584"
                            />
                    }
                </View>
    }
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:2
    }
})