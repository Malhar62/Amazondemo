import React, { useRef, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Animated, StatusBar, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScrollView } from "react-native-gesture-handler"
import { HEIGHT } from "../../theme/scale"
import { background } from "@storybook/api/node_modules/@storybook/theming"

export const UserDetailScreen = observer(function UserDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute<any>();
    var obj: any = route.params.data;
    console.log(obj)
    let array = [obj]
    function Detail(data: any) {
        return (
            <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
                <Text style={{ fontSize: 30 }}>{data.data.toString()}</Text>
            </View>
        )
    }
    const length = React.useRef(new Animated.Value(0)).current;
    const HEADER_MAX_HEIGHT = 400;
    const HEADER_MIN_HEIGHT = 60;
    const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Animated.View style={[styles.main, {
                height: length.interpolate({
                    inputRange: [0, HEADER_SCROLL_DISTANCE],
                    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
                    extrapolate: 'clamp'
                }),
                backgroundColor: length.interpolate({
                    inputRange: [0, (HEADER_SCROLL_DISTANCE - 1), HEADER_SCROLL_DISTANCE],
                    outputRange: ['#d9d3c3', '#d9d1ba', '#075e55'],
                    extrapolate: 'clamp'
                }),
                //#d9d3c3
            }]}>
                <View style={{}}>
                    <Animated.Image source={{ uri: obj.avatar }} style={{
                        opacity: length.interpolate({
                            inputRange: [0, HEADER_SCROLL_DISTANCE],
                            outputRange: [1, 0],
                            extrapolate: 'clamp'
                        }),
                        width: '100%', height: 400
                    }} />
                </View>
                <Animated.View style={{
                    position: 'absolute', bottom: 0,
                    transform: [{
                        translateY: length.interpolate({
                            inputRange: [0, (HEADER_SCROLL_DISTANCE - 1), HEADER_SCROLL_DISTANCE],
                            outputRange: [0, -10, -20],
                            extrapolate: 'clamp'
                        })
                    },
                    {
                        translateX: length.interpolate({
                            inputRange: [0, (HEADER_SCROLL_DISTANCE - 1), HEADER_SCROLL_DISTANCE],
                            outputRange: [0, 10, 50],
                            extrapolate: 'clamp'
                        })
                    }
                    ]
                }}>
                    <Animated.Text style={{
                        fontSize: length.interpolate({
                            inputRange: [0, HEADER_SCROLL_DISTANCE],
                            outputRange: [30, 20],
                            extrapolate: 'clamp'
                        }), color: '#fff'
                    }}>
                        {route.params.data.first_name} {route.params.data.last_name}</Animated.Text>
                </Animated.View>
                <View style={{ position: 'absolute', top: 15, left: 10 }}>
                    <Ionicons name='arrow-back-sharp' size={25} color='#fff' onPress={() => navigation.goBack()} />
                </View>
            </Animated.View>

            <Animated.View style={{
                height: length.interpolate({
                    inputRange: [0, HEADER_SCROLL_DISTANCE],
                    outputRange: [HEIGHT(350), 750],
                    extrapolate: 'clamp'
                }), backgroundColor: '#fff'
            }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event([
                        { nativeEvent: { contentOffset: { y: length } } }
                    ],
                        { useNativeDriver: false }
                    )}
                    data={array}
                    renderItem={({ item, index }) => (
                        <View>
                            <Detail data={item.id} />
                            <Detail data={item.email} />
                            <Detail data={item.first_name} />
                            <Detail data={item.last_name} />
                            <Detail data={'Address'} />
                            <Detail data={'Place'} />
                        </View>
                    )}
                />
            </Animated.View>
        </View>
    )
})
const styles = StyleSheet.create({
    main: {
        width: '100%'
    }
})