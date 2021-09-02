import React, { } from "react"
import { View, Text, FlatList, Image, TouchableOpacity, Animated } from "react-native"
import { useStores } from "../../models"
import { HEIGHT, WIDTH } from "../../theme/scale"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from "./Header"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import moment from 'moment';
export default function ChatScreen() {
    const [load, setLoad] = React.useState<boolean>();
    const navigation = useNavigation()
    const { chatStore } = useStores()
    const isFocused = useIsFocused()
    React.useEffect(() => {
        if (isFocused) {
            setLoad(true)
            chatStore.getChatList()
            setLoad(false)
        }
    }, [isFocused]);
    React.useEffect(() => {
        let intervalId = setInterval(checkingDT, 60000)
        return (() => {
            clearInterval(intervalId)
        })
    }, [])
    function checkingDT() {
        chatStore.sendFromSchedule(moment().format('h:mm a'), moment().format('D MMMM YYYY'))
    }

    // React.useEffect(() => {
    //     if (isFocused) {
    //         setFour(chatStore.isforward)
    //     }
    // }, [isFocused]);
    const length = React.useRef(new Animated.Value(0)).current;
    //const HEADER_MAX_HEIGHT = 120;
    //const HEADER_MIN_HEIGHT = 40;
    //const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View>
                <Header length={length} name='chating' />
            </View>
            {load && <Text style={{ alignSelf: 'center' }}>Loading...</Text>}
            {load == false && <FlatList
                key={1}
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { y: length } } }
                ],
                    { useNativeDriver: false }
                )}
                showsVerticalScrollIndicator={false}
                data={chatStore.chatlists.toJSON()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('chatdetail', { data: item })
                    }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                height: 90,
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderBottomColor: '#f1f1f1'
                            }}>
                            <Image
                                source={{ uri: item.avatar }}
                                style={{ width: WIDTH(80), height: HEIGHT(80), borderRadius: 40 }}
                            />
                            <Text style={{ fontSize: 18, marginLeft: 10 }}>
                                {item.first_name} {item.last_name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />}
            <View style={{
                position: 'absolute', right: 20, bottom: 20, width: 50, height: 50, borderRadius: 25, backgroundColor: '#04877a', justifyContent: 'center', alignItems: 'center'
            }}>
                <MaterialCommunityIcons
                    name='android-messages'
                    size={30}
                    color='#fff'
                    onPress={() => navigation.navigate('allcontact')}
                />
            </View >

        </View >
    )
}