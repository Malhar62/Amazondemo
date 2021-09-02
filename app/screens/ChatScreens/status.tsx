import React, { useRef } from "react"
import { View, Text, FlatList, Image, TouchableOpacity, Animated } from "react-native"
import Header from "./Header";

export default function StatusScreen() {
    const length = React.useRef(new Animated.Value(0)).current;

    return (
        <View>
            <Header name='status' length={length} />
            <Text style={{ marginTop: 10 }}>status</Text>
        </View>
    )
}