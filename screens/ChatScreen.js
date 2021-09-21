import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import Header from '../components/Header'
import image from '../assets/images/try.jpg'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../assets/colors/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import firebase from 'firebase/app';
import { db, auth } from '../firebase';
import { Avatar } from 'react-native-elements';



const ChatScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection('chats')
            .doc(item.id).collection('messages')
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: message,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoUrl: auth.currentUser.photoURL,
            });
        setMessage("")

    }
    useEffect(() => {
        const unsubscribed = db
            .collection("chats")
            .doc(item.id)
            .collection("messages")
            .orderBy("timestamp")
            .onSnapshot((snapshot) =>
                setMessages(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                )
            )
        return unsubscribed;
    }, [route])
    return (
        <View style={{ flex: 1, height: hp("100"), backgroundColor: colors.white, }}>
            <Header navigation={navigation} goback name={item.data.chatName} image={messages.length!=0?messages[messages.length-1].data.photoUrl:"https://i.pinimg.com/236x/6a/d1/ba/6ad1bab4289429482586ac72ed30c8f8.jpg"} icon1="camera" icon2="phone" />

            <KeyboardAwareScrollView style={{ paddingBottom: hp("5") , borderTopWidth:1,borderTopColor:colors.green}}>
               
                <View style={{paddingBottom:hp("5")}}>
                     {messages.map(({ id, data }) => {
                    if (data.email === auth.currentUser.email) {
                        return (
                            <>
                                <View key={id} style={styles.send}>
                                    <Text style={styles.textSend}>{data.message}</Text>
                                    <Avatar
                                        position="absolute"
                                        bottom={hp("-2")}
                                        right={wp("-3")}
                                        source={{ uri: data.photoUrl }}
                                        rounded
                                        size={30} />
                                </View>
                            </>
                        )

                    } else {
                        return (
                            <View key={id} style={styles.recieve}>
                                <Avatar source={{ uri: data.photoUrl }}
                                    rounded
                                    position="absolute"
                                    bottom={hp("-2")}
                                    left={wp("-3")}
                                    size={30} />
                                <Text style={styles.nameRecieve}>{data.displayName}</Text>
                                <Text style={styles.textRecieve}>{data.message}</Text>
                            </View>
                        )
                    }


                })}
                </View>

            </KeyboardAwareScrollView>
            <View style={styles.bottomWrapper}>
                <TextInput placeholder="send a message" style={styles.input} value={message} onChangeText={(mssg) => setMessage(mssg)} onSubmitEditing={sendMessage} />
                <TouchableOpacity style={styles.iconWrapper} onPress={() => sendMessage()}>
                    <Icon name='send' size={24} color={colors.white} />
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default ChatScreen

const styles = StyleSheet.create({
    image: {
        height: hp("80%"),
    },
    recieve: {
        marginVertical: wp("3"),
        backgroundColor: colors.darkPurple,
        padding: wp("3"),
        borderRadius: wp("3"),
        maxWidth: wp("60"),
        alignSelf: "flex-start",
        margin: wp("4"),
        position: 'relative',
        alignItems: 'center',

    },
    textRecieve: {
        fontFamily: "Laila-Light",
        fontSize: hp("1.5"),
        color: colors.white

    },
    nameRecieve: {
        fontFamily: "Laila-Bold",
        fontSize: hp("1.5"),
        color: colors.white,
        alignSelf: "flex-start"

    },

    send: {
        marginVertical: wp("3"),
        backgroundColor: colors.lightPurple,
        padding: wp("3"),
        borderRadius: wp("3"),
        maxWidth: wp("60"),
        alignSelf: "flex-end",
        margin: wp("4"),
        position: 'relative',
        alignItems: 'center',



    },
    textSend: {
        fontFamily: "Laila-Light",
        fontSize: hp("1.5"),
        color: colors.black,
        marginRight: wp("3")
    },
    senderAvatar: {

    },
    bottomWrapper: {
        marginHorizontal: wp("3"),
        marginVertical: hp("1"),
        flexDirection: 'row',
        justifyContent: 'space-around',


    },
    input: {
        fontFamily: "Laila-Light",
        fontSize: hp("2"),
        backgroundColor: "#ECECEC",
        padding: hp("1"),
        flex: 1,
        borderRadius: wp("7"),
        color: colors.black,
        elevation: 5
    },
    iconWrapper: {
        width: wp("15"),
        height: wp("15"),
        borderRadius: hp("5"),
        marginLeft: wp("1"),
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.green,
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10
    }

})
