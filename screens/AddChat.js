import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import colors from '../assets/colors/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { db } from '../firebase';

const AddChat = ({ navigation }) => {
    const [input, setInput] = useState("")
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new chat",
            headerBackTitle: "Chats",
            styleTitle: {
                fontFamily: "Laila-Regular",

            }
        });
    }, [navigation])
    const createChat = async() =>{
        await db
        .collection("chats")
        .add({chatName:input})
        .then(()=>navigation.goBack())
        .catch(err=>alert(err))
    }
    return (
        <View style={styles.container}>
            <Input
                placeholder="enter a chat name"
                value={input}
                onChangeText={(text) => setInput(text)}
                style={styles.txt}
                leftIcon={
                    <Icon name="wechat" size={20} color={colors.green} />
                }
            />
            <TouchableOpacity style={styles.btn} onPress={() => createChat()}>
                <Text style={styles.txt}>Create a new chat</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: widthPercentageToDP("5"),
        backgroundColor: colors.white
    },
    btn: {
        padding: widthPercentageToDP("3"),
        margin: widthPercentageToDP("5"),
        backgroundColor: colors.lightPurple,
        justifyContent: 'center',
        alignItems: "center"
    },
    txt: {
        fontFamily: "Laila-Light",
        fontSize: heightPercentageToDP("2.4")
    }
})
