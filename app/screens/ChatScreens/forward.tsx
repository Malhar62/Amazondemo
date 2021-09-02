import React, { useRef } from "react"
import { View, Text, FlatList, Image, TouchableOpacity, Animated, Alert, Dimensions } from "react-native"
import { useStores } from "../../models"
import { HEIGHT, WIDTH } from "../../theme/scale"
import moment from "moment"
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native"
import Ionicons from 'react-native-vector-icons/Ionicons'
export default function ForwardScreen() {
    const [load, setLoad] = React.useState<boolean>();
    const [four, setFour] = React.useState<boolean>()
    const navigation = useNavigation()
    const { chatStore } = useStores()
    const route = useRoute<any>()
    const isFocused = useIsFocused()
    const oldTitle = route.params.old
    React.useEffect(() => {
        setLoad(true)
        chatStore.getChatList()
        setLoad(false)
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{
                height: 70, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#075e55',
            }}>
                <View style={{ position: 'absolute', left: 10 }}>
                    <Ionicons name='arrow-back-sharp' size={25} color='#fff' onPress={() => {
                        navigation.goBack();
                    }} />
                </View>
                <View>
                    <Text style={{ fontSize: 20, color: '#fff' }}>Forward to...</Text>
                </View>

            </View>
            {load && <Text style={{ alignSelf: 'center' }}>Loading...</Text>}
            {load == false && <FlatList
                key={1}
                showsVerticalScrollIndicator={false}
                data={chatStore.chatlists.toJSON()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => {
                        if (route.params.plan = 'schedule') {
                            let TEXT = item.first_name.concat(item.last_name)
                            navigation.navigate('schedule', { Name: TEXT, Img: item.avatar })
                        } else {
                            let date = moment().format('Do MMMM YYYY')
                            let time = moment().format('h:mm a')
                            let TEXT = item.first_name.concat(item.last_name)
                            chatStore.forwardChat(oldTitle, TEXT, date, time)
                            navigation.navigate('chat')
                        }
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


        </View >
    )
}