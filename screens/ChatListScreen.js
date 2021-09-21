import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import ChatItem from '../components/ChatItem'
import profiles from '../assets/Data/profiles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../assets/colors/colors';
import { db } from '../firebase';


const ChatListScreen = ({ navigation }) => {

    const [chats, setChats] = useState([])

    useEffect(() => {
        const unsubscribed = db
            .collection('chats')
            .onSnapshot(snapshot => {
                setChats(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        return unsubscribed;
    }, [])
    const renderItem = ({ item }) => (
        <ChatItem item ={item} navigation={navigation} />
    );
    return (
        <SafeAreaView style={styles.chatListWrapper}>
            <FlatList
                data={chats}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                 />
            <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate("AddChat")}>
                <Icon name='feather' size={24} color={colors.white} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ChatListScreen

const styles = StyleSheet.create({
    chatListWrapper: {
        flex: 1,
        paddingHorizontal: wp("3"),
        paddingVertical: hp("1"),
        backgroundColor: colors.white
    },
    iconWrapper: {
        width: wp("15"),
        height: wp("15"),
        borderRadius: hp("5"),
        top: 30 - wp("15"),
        left: wp("100%") - 100,
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
