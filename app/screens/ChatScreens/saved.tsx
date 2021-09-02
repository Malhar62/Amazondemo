import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ImageBackground } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { HEIGHT, WIDTH } from "../../theme/scale"
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import ModalDropdown from 'react-native-modal-dropdown';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
//moment().format('MMMM Do YYYY, h:mm:ss a')
export const SavedScreen = observer(function SavedScreen() {
    const navigation = useNavigation()
    const { chatStore } = useStores()
    const model_1 = React.useRef()
    const URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbhtILGKrNOcv9kmmkB_otRRqP1HP4eKphvA&usqp=CAU'
    function HeaderTop() {

        if (chatStore.selectedsaved == 0) {
            return (
                <View style={styles.top}>
                    <Ionicons name='arrow-back-sharp' size={25} color='#fff' onPress={() => {
                        navigation.goBack();
                    }} style={{}} />
                    <Text style={{ fontSize: 20, color: '#fff' }}>Saved Messages</Text>
                    <ModalDropdown
                        ref={model_1}
                        disabled={false}
                        defaultValue={'king'}
                        dropdownTextStyle={{ fontSize: 20, marginHorizontal: 5 }}
                        dropdownStyle={{ height: HEIGHT(50), borderBottomWidth: 1 }}
                        onSelect={(index: number) => { chatStore.deleteAll() }}
                        options={['unstar all']}>
                        <Entypo name='dots-three-vertical' size={18} color='#fff'
                            onPress={() => { model_1.current.show() }} />
                    </ModalDropdown>
                </View>
            )
        } else {
            return (
                <View style={styles.top}>
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons name='arrow-back-sharp' size={25} color='#fff' onPress={() => {
                            chatStore.setSelectedAsItIs()
                        }} />
                        <Text style={{ fontSize: 20, color: '#fff', marginLeft: 7 }}>{chatStore.selectedsaved}</Text>
                    </View>
                    <FontAwesome5 name='trash' size={20} color='#fff' onPress={() => chatStore.deleteFromSaved()} />
                </View>
            )
        }
    }

    return (
        <ImageBackground source={{ uri: 'https://i.pinimg.com/originals/ab/ab/60/abab60f06ab52fa7846593e6ae0c9a0b.png' }} style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
            <View style={{ flex: 1 }}>
                <HeaderTop />
                <View style={{ height: HEIGHT(670) }}>
                    {chatStore.saved.length == 0 && <Text style={{ fontSize: 20, alignSelf: 'center', marginTop: 20 }}>Nothing to show</Text>}
                    <FlatList
                        data={chatStore.saved.toJSON()}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity

                                onLongPress={() => {
                                    chatStore.selectSaved(index)
                                }}

                                onPress={() => {
                                    if (chatStore.selectedsaved != 0) {
                                        chatStore.selectSaved(index)
                                    }
                                }}>
                                <View style={{
                                    borderBottomWidth: (index != (chatStore.saved.length - 1)) ? 1 : 0,
                                    borderBottomColor: '#f1f1f1',
                                    backgroundColor: item.flag ? '#a1c8cc' : 'transparent',
                                    paddingVertical: 5, opacity: item.flag ? 0.5 : 1
                                }}>
                                    <View style={{ justifyContent: 'center' }}>
                                        <View style={{ marginHorizontal: 7, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image source={{ uri: item.flag ? URL : item.dp }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                                                <Text style={[styles.text, { marginLeft: 5 }]}>{item.title}</Text>
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: 15 }}>{item.date}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={styles.msg}>

                                                {item.image ?
                                                    <Image source={{ uri: item.image }}
                                                        style={{ height: 250, width: 200 }} />
                                                    : <View />}

                                                {item.text ?
                                                    <View>
                                                        <Text style={styles.text}>{item.text}</Text>
                                                    </View>
                                                    : <View />}

                                            </View>
                                            <View style={{ justifyContent: 'flex-end', marginBottom: HEIGHT(7), marginLeft: WIDTH(5) }}>
                                                <Text>{item.time}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => 'index' + index.toString()}
                    />
                </View>
            </View>
        </ImageBackground>
    )
})
const styles = StyleSheet.create({
    top: {
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#075e55',
        paddingHorizontal: 10
    },
    text: {
        fontSize: 18,
        textAlignVertical: 'center'
    },
    msg: {
        backgroundColor: '#d9f3b5',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: '5%',
        maxWidth: '55%',
        minWidth: '20%',
        alignSelf: 'flex-start',
        borderTopEndRadius: 5,
        borderTopStartRadius: 5,
        borderBottomLeftRadius: 5
    }
})