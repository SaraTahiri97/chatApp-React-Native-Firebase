import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../assets/colors/colors';
import { auth, db } from '../firebase';
import OnlineIndicator from './OnlineIndicator';

const ContactName = ({ name, online }) => {
    return (
        <View style={[{ top: hp("1"), right: wp("15") }]}>
            <Text style={{ fontFamily: "Laila-Medium", fontSize: hp("2") }}>{name}</Text>
        </View>

    )
}


const Header = ({ icon1, icon2, name, online, goback, navigation, image }) => {
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.navigate("SignIn");

        });
    }

    return (
        <View
            style={styles.headerWrapper}>





            {goback ?
                <>
                    <TouchableOpacity style={{ justifyContent: 'center', right: wp("5"), }} onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color={colors.darkPurple} /></TouchableOpacity>
                    <Avatar
                        right={wp("10")}
                        rounded
                        source={{ uri: image }} />
                </>
                 :
                <TouchableOpacity onPress={() => signOutUser()} style={[goback ? { right: wp("9"), } : undefined,]}>
                    <Avatar
                        rounded
                        source={{ uri: auth?.currentUser?.photoURL }} />
                </TouchableOpacity>

            }

            {name ? < ContactName name={name} online={online} /> : undefined}


            <View style={styles.IconsWrapper}>
                <TouchableOpacity onPress={() => { alert(icon1); }}>
                    <Icon name={icon1} size={24} color={colors.lightPurple} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { alert(icon2); }}>
                    <Icon name={icon2} size={24} color={colors.lightPurple} />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp("8"),
        paddingVertical: hp("2"),
        backgroundColor: 'white',

    },
    IconsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp("15%")
    }
})
