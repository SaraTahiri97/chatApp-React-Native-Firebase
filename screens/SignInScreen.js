import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacityBase } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../assets/colors/colors';
import image from '../assets/images/opening.jpg'
import { auth } from '../firebase';

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home");
            }
        });
        return unsubscribed;
    }, [])

    const handleSubmit = () => {
        auth.signInWithEmailAndPassword(email,password).catch(err=>alert(err.message))
    }
    return (
        <KeyboardAwareScrollView style={styles.container} >
            <ImageBackground source={image} style={styles.image}>
                <View style={styles.welcomeWrapper}>
                    <Text style={styles.welcome}>WELCOME BACK</Text>
                </View>
            </ImageBackground>
            <View style={styles.formCard} >
                <TouchableOpacity style={styles.forwardIconWrapper} onPress={() => handleSubmit()} activeOpacity={0.5}>
                    <Icon name='arrow-right' size={20} color={colors.white} />
                </TouchableOpacity>

                <Text style={styles.tilte}>Please Sign In</Text>
                <View style={styles.formWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder='type your email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}

                    />
                    <TextInput
                        placeholder='type your password'
                        style={styles.input}
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => setPassword(text)}

                    />
                    <TouchableOpacity style={styles.inputIcon}>

                        <Icon
                            name='eye'
                            size={24}
                            color={colors.lightPurple}
                        />
                    </TouchableOpacity>

                </View>
                <View style={styles.optionsWrapper}>
                    <Text style={styles.option}>Forgot password?</Text>
                    <Text style={styles.option} onPress={() => navigation.navigate("Register")}>Sign up</Text>
                </View>
            </View>

        </KeyboardAwareScrollView>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: colors.lightPurple,
        paddingBottom: '-5%'

    },
    image: {
        height: hp("63%")

    },
    welcomeWrapper: {
        width: wp("60%"),
        height: hp("20%"),
        marginLeft: wp("10"),
        top: hp("5"),
    },
    welcome: {
        fontFamily: "Laila-Bold",
        fontSize: hp("5%"),
        color: colors.green
    },
    formCard: {
        backgroundColor: colors.white,
        borderTopLeftRadius: hp("5"),
        borderTopRightRadius: hp("5"),

    },
    forwardIconWrapper: {
        width: wp("15"),
        height: wp("15"),
        borderRadius: hp("5"),
        top: 30,
        left: wp("100%") - 80,
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tilte: {
        fontFamily: 'Laila-Regular',
        fontSize: hp("2.5"),
        paddingLeft: wp("14"),
        top: 40 - wp("15"),
        color: colors.darkPurple
    },
    formWrapper: {
        marginHorizontal: wp("15"),
        marginVertical: hp("2")
    },
    input: {
        fontFamily: "Laila-Light",
        fontSize: hp("2"),
        borderBottomColor: colors.gray,
        borderBottomWidth: 1,
        marginBottom: hp("3.6")
    },
    inputIcon: {
        position: "absolute",
        top: wp("13"),
        left: wp("100%") - 160,
    },
    optionsWrapper: {
        marginHorizontal: wp("15"),
        marginBottom: hp("5"),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    option: {
        fontFamily: "Laila-Light",
        fontSize: hp("2"),
        color: colors.darkPurple,
        textDecorationLine: "underline"
    }

})
