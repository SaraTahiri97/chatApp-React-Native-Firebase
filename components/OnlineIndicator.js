import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const OnlineIndicator =({online}) => {
    return (
        online?<View style={styles.dotGreen}></View>:<View style={styles.dotGray}></View>
    )
}

export default OnlineIndicator

const styles = StyleSheet.create({
    dotGreen:{
        width: wp("2.5"), height: wp("2.5"), borderRadius: wp("2"), backgroundColor: "green",   
    },
    dotGray:{
        width: wp("2.5"), height: wp("2.5"), borderRadius: wp("2"), backgroundColor: "grey",   
    }
})
