import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../assets/colors/colors';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import OnlineIndicator from '../components/OnlineIndicator';
import { db } from '../firebase';


const ChatItem = ({ item, navigation }) => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const unsubscribed = db
            .collection("chats")
            .doc(item.id)
            .collection("messages")
            .orderBy("timestamp")
            .onSnapshot((snapshot) => setMessages(
                snapshot.docs.map(doc => doc.data())
            ))
        return unsubscribed
    }, [])
    return (
        <TouchableOpacity key ={item.id} style={styles.chatItem} onPress={() => navigation.navigate("Chat", { item })} >
            <Avatar source={{ uri: messages.length!=0?messages[messages.length-1].photoUrl :
                "https://i.pinimg.com/236x/6a/d1/ba/6ad1bab4289429482586ac72ed30c8f8.jpg" }} rounded />
            <View style={styles.rightWrapper}>
                <Text style={styles.name}>{item.data.chatName}</Text>
               {messages.length!=0?  <Text style={styles.content} numberOfLines={1}>{messages[messages.length-1].message} </Text> :
               <Text style={styles.content} numberOfLines={1}>Start Chatting with your friends now</Text>
               }
            </View>
        </TouchableOpacity>
    )
}

export default ChatItem

const styles = StyleSheet.create({
    chatItem: {
        width: wp("90"),
        paddingVertical: hp("1"),
        paddingHorizontal: wp("3"),
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.lightPurple
    },
    rightWrapper: {
        width: wp("70"),
        marginHorizontal: wp("5")
    },
    name: {
        fontFamily: "Laila-Medium"
    },
    content: {
        fontFamily: "Laila-Light",
        color: colors.darkPurple
    }
})
