import React from 'react'
import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Image, Input } from 'react-native-elements'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import colors from '../assets/colors/colors'
import { auth } from '../firebase'

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [imageUrl, setImageUrl] = React.useState('')
    const handleSubmit = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                authUser.user.updateProfile({
                    displayName: username,
                    photoURL: imageUrl ||
                        "https://i.pinimg.com/236x/6a/d1/ba/6ad1bab4289429482586ac72ed30c8f8.jpg"

                })
            }).catch((err) => alert(err.message));
    }

    return (
        <View style={styles.container}>
            <View style={styles.welcomeWrapper}>
                <Text style={styles.welcome}>Create your account ! </Text>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'position'} >
                <View style={styles.formCard}>
                    <Input placeholder=" User name" style={styles.Input} value={username} onChangeText={text => setUsername(text)} />
                    <Input placeholder="Email" style={styles.Input} value={email} onChangeText={text => setEmail(text)} />
                    <Input placeholder="Password" style={styles.Input} value={password} onChangeText={text => setPassword(text)} />
                    <Input placeholder="Profile picture URL (Optional)" style={styles.Input} value={imageUrl} onChangeText={text => setImageUrl(text)} onSubmitEditing={() => handleSubmit()} />
                    <Button title="Sign Up" color={colors.darkPurple} onPress={() => handleSubmit()} />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.green,
        justifyContent: 'flex-start',
    },
    welcomeWrapper: {
        width: widthPercentageToDP("80%"),
        height: heightPercentageToDP("15%"),
        marginLeft: widthPercentageToDP("5"),
        marginVertical: widthPercentageToDP("10")

    },
    welcome: {
        fontFamily: "Laila-Bold",
        fontSize: heightPercentageToDP("5%"),
        color: colors.white
    },
    formCard: {
        padding: widthPercentageToDP("10"),
        margin: widthPercentageToDP("5"),
        backgroundColor: colors.white,
        borderRadius: widthPercentageToDP("5"),
        elevation: 5
    },
    Input: {
        fontFamily: "Laila-Light",
        color: colors.darkPurple,
    },

})
