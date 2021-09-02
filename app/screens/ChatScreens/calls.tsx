import React, { useRef } from "react"
import { View, Text, FlatList, Image, TouchableOpacity, Animated } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Header from "./Header"

export default function CallsScreen() {
    const navigation = useNavigation()
    const length = useRef(new Animated.Value(0)).current
    return (
        <View>
            <Header length={length} name='calls' />
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ marginTop: 10 }}>calls</Text>
            </TouchableOpacity>
        </View>
    )
}