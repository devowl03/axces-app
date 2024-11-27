import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import colors from '../../utils/colors'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';
import { getAccessToken, getUserId } from '../../utils';

const { width, height } = Dimensions.get('window');

const Splash = () => {
    const navigation = useNavigation()

    const getData = async () => {
        await getAccessToken() && await getUserId() ?
            navigation.navigate('Dashboard') : navigation.navigate('Onboard')
    }

    setTimeout(() => {
        getData()
    }, 1000)

    return (
        <View style={styles.container}>
            <FastImage style={styles.imgStyle} resizeMode='contain' source={require('../../../assets/logo.png')} />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        position: 'relative'
    },
    imgStyle: {
        width: width / 2,
        height: height / 2
    }
})