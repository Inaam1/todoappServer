import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Platform, StatusBar, Image, TouchableOpacity, LogBox } from 'react-native';
import bin from './assets/bin.png';
import send from './assets/send.png';
import axios from 'axios';

const HomeScreen = () => {

    LogBox.ignoreAllLogs();

    const [data, setData] = useState([]);
    const [todo, setTodo] = useState("");

    useEffect(() => {
        axios({
            method: 'get',
            url: "http://192.168.8.167:5000/all"
        }).then((response) => {
            console.log(response.data)
            setData(response.data)
        })
    })

    const addTodo = async () => {
        const data = {
            name: todo
        }
        axios.post('http://192.168.8.167:5000/add', data)
        .then(response => {
            console.log(response.data);
            setTodo("");
        })
        .catch(error => {
            console.error("Error sending data: ", error);
        });
    }


    const handleDelete = async ({_id}) => {
        try {
        const response = await axios.delete(`http://192.168.8.167:5000/delete/${_id}`);
        if (response.status === 200) {
            Alert.alert('Success', 'Data deleted successfully');
        }
        } catch (error) {
        Alert.alert('Error', 'Failed to delete data');
        console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                {data.map((item) => {
                    return (
                        <View key={item._id} style={styles.todoItem}>
                            <Text style={styles.txt}>{item.name}</Text>
                            <TouchableOpacity onPress={() => handleDelete({_id: item._id})}>
                                <Image style={styles.icon} source={bin} />
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>
            <View style={styles.inputBar}>
                <TextInput value={todo} placeholder='Enter To-Do to List' onChangeText={(n) => setTodo(n)} />
                <TouchableOpacity onPress={addTodo}>
                    <Image style={styles.icon2} source={send} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: "#181818",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    scrollView: {
        width: '100%'
    },
    inputBar: {
        width: '95%',
        height: 50,
        borderWidth: 1,
        borderRadius: 30,
        alignItems :'center',
        paddingLeft: 10,
        paddingRigh: 10,
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "white"
    },
    todoItem: {
        width: 300,
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        margin: 20,
        borderRadius: 10,
        flexDirection: 'row',
        padding:10,
        backgroundColor: "white"
    },
    txt: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    icon: {
        width: 20,
        height: 20
    },
    icon2: {
        marginRight: 10
    }
})

export default HomeScreen;
