


import React, { useRef, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions, ViewStyle, ImageStyle } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import { HEIGHT, WIDTH } from "../../theme/scale"

import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons'
//moment().format('MMMM Do YYYY, h:mm:ss a')
export const MediaScreen = observer(function MediaScreen() {
    const { chatStore } = useStores()
    const navigation = useNavigation();
    const route = useRoute<any>();
    const Name: string = route.params.info;
    const [list, setList] = useState([])
    useEffect(() => {
        settingup()
    }, [])
    const STYLE: ImageStyle = {
        height: 180, width: Dimensions.get('window').width / 3
    }
    function settingup() {
        var full = chatStore.chats.toJSON()
        var array = full.find(x => x.title == Name)
        console.log(array.msg[0].msgs[0])
        setList(array.msg)
    }

    function Header() {
        return (
            <View style={{ justifyContent: 'center', height: 60, backgroundColor: '#5f89a3' }}>
                <Ionicons name='arrow-back-sharp' size={25} color='#fff' onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 10 }} />

                <Text style={{ fontSize: 18, alignSelf: 'center', color: '#fff' }}>{Name}</Text>
            </View>
        )
    }
    function Rendering({ item, index }) {
        if (item.image != '' || item.video != '') {
            return (
                <View>
                    {item.image != '' ?
                        <TouchableOpacity onPress={() => navigation.navigate('zoom', { data: item.image, type: 'image' })}>
                            <Image source={{ uri: item.image }} style={STYLE} />
                        </TouchableOpacity>
                        : <View />
                    }
                    {item.video != '' ?
                        <TouchableOpacity onPress={() => navigation.navigate('zoom', { data: item.video, type: 'video' })} >
                            <View style={STYLE}>
                                <Video
                                    resizeMode={'cover'}
                                    source={{ uri: item.video }}
                                    style={STYLE} />
                                <View style={{ position: 'absolute', alignSelf: 'center', marginTop: 60 }}>
                                    <Ionicons name='play-circle' size={50} color="#fff" />
                                </View>
                            </View>
                        </TouchableOpacity>
                        : <View />
                    }
                </View >
            )
        } else {
            return null;
        }
    }
    function Insider({ item, index }) {
        return (
            <FlatList
                key={1}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                data={item.msgs.slice()}
                renderItem={({ item, index }) => (
                    <Rendering item={item} index={index} />
                )}
                keyExtractor={(item, index) => 'index' + index.toString()}
            />
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header />
            <FlatList
                data={list.slice()}
                renderItem={({ item, index }) => (
                    <View>
                        <Text style={{ fontSize: 18, backgroundColor: '#f1f1f1', paddingHorizontal: 5, paddingVertical: 5 }}>{item.date}</Text>
                        <Insider item={item} index={index} />
                    </View>
                )}
                keyExtractor={(item, index) => 'index' + index.toString()}
            />
        </View>
    )
})
/**
 *
 */