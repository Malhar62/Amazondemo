import React, { useRef, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, StatusBar, TextInput, ImageBackground, Keyboard, Animated } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { launchImageLibrary } from "react-native-image-picker"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import moment from "moment"
import ChatHeader from "./chatheader"
import { HEIGHT, WIDTH } from "../../theme/scale"
import Modal from 'react-native-modal'
import { typography } from "../../theme"
import Video from 'react-native-video';
//moment().format('MMMM Do YYYY, h:mm:ss a')
export const ChatDetailScreen = observer(function ChatDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const { chatStore } = useStores()
    const obj: any = route.params.data;
    var TITLE = obj.first_name.concat(obj.last_name)
    const [name, setName] = useState('')
    const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
    const [list, setList] = useState<any>(chatStore.chats.toJSON())
    const [load, setLoad] = useState<boolean>()
    const [ind, setInd] = useState<number>(0)
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [value, setValue] = React.useState('no')
    const scroll = React.createRef<FlatList>();
    const [com, setCom] = React.useState('')
    const [img, setImg] = React.useState('')
    const [show, setShow] = React.useState<boolean>()
    const [mode, setMode] = React.useState<string>()
    const [select, setSelect] = React.useState(false)
    const [vid, setVid] = React.useState<string>('')
    let TODAY = moment().format('Do MMMM YYYY')
    const [run, setRun] = React.useState(false)
    const [object, setObject] = useState<any>({
        date: '',
        item: {
            time: '', text: ''
        }
    })
    useEffect(() => {
        setLoad(true)
        setList(chatStore.chats.toJSON())
        setLoad(false)
    }, [])
    React.useEffect(() => {
        let intervalId = setInterval(checkingDT, 60000)
        return (() => {
            clearInterval(intervalId)
        })
    }, [])
    function checkingDT() {
        chatStore.sendFromSchedule(moment().format('h:mm a'))
        setList(chatStore.chats.toJSON())
    }
    function Extra() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Modal
                    onDismiss={() => setModalVisible(false)}
                    onBackdropPress={() => setModalVisible(false)}
                    isVisible={isModalVisible}>
                    <View style={{ backgroundColor: '#fff', width: 350, alignSelf: 'center' }}>
                        <Text style={{ fontSize: 18 }}>{object.date}</Text>
                        <Text style={{ fontSize: 18 }}>{object.item.time}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{object.item.text}</Text>
                    </View>
                </Modal>
            </View >
        )
    }
    function Message({ item, index, date }) {

        return (
            <View style={{ width: '100%', marginTop: 10, backgroundColor: item.flag ? '#a1c8cc' : 'transparent', opacity: item.flag ? 0.5 : 1 }}>
                <TouchableOpacity
                    onLongPress={() => {
                        setSelect(false)
                        console.log('pressed-----------------------')
                        chatStore.editChat(TITLE, date, item.text, item.time, index)
                        setList(chatStore.chats.toJSON())
                        if (chatStore.numbers == 1) {
                            setObject({
                                date: date,
                                item: {
                                    time: item.time,
                                    text: item.text
                                }
                            })
                        }
                    }}

                    onPress={() => {
                        if (chatStore.numbers == 0) {
                            if (item.image != '') {
                                console.log(item.image)
                                navigation.navigate('zoom', { data: item.image, type: 'image' })
                            } else {
                                if (item.video != '') {
                                    console.log(item.video)
                                    navigation.navigate('zoom', { data: item.video, type: 'video' })
                                }
                            }
                        } else {
                            if (chatStore.numbers != 0) {
                                console.log('pressed-----------------------')
                                chatStore.editChat(TITLE, date, item.text, item.time, index)
                                setList(chatStore.chats.toJSON())

                            } else {
                                setInd(index)
                                //animation
                            }
                        }
                        setSelect(false)
                    }}>
                    <View style={styles.main}>
                        {(item.commentof) ? <View style={{ height: 50, backgroundColor: '#f1f1f1', borderLeftWidth: 3, borderLeftColor: 'blue' }}>
                            <Text style={{ fontSize: 18 }}>{item.commentof}</Text>
                        </View>
                            :
                            <View></View>
                        }
                        {(item.image != '') && <Image source={{ uri: item.image }} style={{ width: 180, height: 200, marginBottom: 10 }} />}
                        {(item.video != '') && <Video source={{ uri: item.video }} resizeMode={'cover'} style={{ width: 180, height: 200, marginBottom: 10 }} />}
                        {(item.text) ? <Text numberOfLines={100} style={{ fontSize: 18, color: 'black', marginBottom: 10 }}>{item.text}</Text> : <View></View>}

                        <Text style={{ right: 2, bottom: 2, position: 'absolute' }}>{item.time}</Text>


                    </View>
                </TouchableOpacity>
            </View >
        )
    }

    const selectFile = (value: string) => {
        let options = {
            mediaType: value == 'Image' ? 'image' : 'video',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                // const source = { uri: response.uri };
                console.log('response', JSON.stringify(response.assets[0].uri));
                if (value == 'Image') {
                    setImg(response.assets[0].uri)
                    setVid('')
                } else {
                    setVid(response.assets[0].uri)
                    setImg('')
                }
            }
        });
        setSelect(false)
    }
    function Adding() {
        if ((name != '') || (img != '') || (vid != '')) {
            let TEXT = obj.first_name.concat(obj.last_name)
            let DATE = moment().format('Do MMMM YYYY')
            let TIME = moment().format('h:mm a')
            chatStore.addChat(TEXT, name, DATE, TIME, com, img, vid)
            setList(chatStore.chats.toJSON())
            setName('')
            setCom('')
            setImg('')
            setVid('')
            chatStore.setAsItIs(TITLE)
            Keyboard.dismiss()
            //scroll.current.scrollToOffset({ animated: true, offset: 0 })
        }
    }
    function Insider({ item, index, date }) {
        return (
            <FlatList
                data={item.msgs}
                renderItem={({ item, index }) => (
                    <Message item={item} index={index} date={date} />
                )}
                keyExtractor={(item, index) => 'index' + index.toString()}
            />
        )
    }
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 100;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false
        }).start();
        setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: false
            }).start();
        }, 1500)
    };
    function ModalView() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Modal
                    onDismiss={() => setSelect(false)}
                    onBackdropPress={() => setSelect(false)}
                    isVisible={select}>
                    <View style={{ backgroundColor: '#fff', width: 300, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 10 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Entypo name='folder-images' size={30} onPress={() => selectFile('Image')} />
                            <Text style={{ fontSize: 18, fontFamily: typography.code }}>Image</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Entypo name='video' size={30} onPress={() => selectFile('Video')} />
                            <Text style={{ fontSize: 18, fontFamily: typography.code }}>Video</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
    // const onViewableItemsChanged = ({ viewableItems, changed }) => {
    //     console.log("Visible items are", viewableItems);
    //     console.log("Changed in this iteration", changed);
    // }
    const onViewRef = React.useRef((viewableItems: any) => {
        console.log(viewableItems.viewableItems[0].index);
        var ID = list.findIndex((x: { title: any }) => x.title == TITLE);
        // if (ID != -1) {
        //     setValue(list[ID].msg[INDEX].date == 'undefined' ? 'right' : list[ID].msg[INDEX].date)
        // }
    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })
    return (
        <ImageBackground source={{ uri: 'https://i.pinimg.com/originals/ab/ab/60/abab60f06ab52fa7846593e6ae0c9a0b.png' }} style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
            <StatusBar backgroundColor='#124c45' />
            {load == false && <View style={styles.view}>

                <ChatHeader
                    onMedia={(data: any) => {
                        navigation.navigate(data, { info: TITLE })
                    }}
                    onInfo={() => setModalVisible(true)}
                    onSaved={() => {
                        setMode('Saved')
                        chatStore.addToSaved(TITLE, obj.avatar)
                        fadeIn()
                    }}
                    onComment={() => {
                        var commentText = chatStore.addComment(TITLE)
                        console.log(commentText)
                        setCom(commentText)
                        chatStore.setAsItIs(TITLE)
                    }}
                    onBack={() => {
                        var Ind = chatStore.chats.findIndex(x => x.title === TITLE)
                        if (Ind != -1) {
                            chatStore.setAsItIs(TITLE)
                        }
                        setList(chatStore.chats.toJSON())
                        navigation.goBack()
                        setCom('')
                        setImg('')
                    }}
                    onForward={() => {
                        chatStore.setForwarding()
                        navigation.navigate('forward', { old: TITLE })
                        setCom('')
                    }}
                    obj={route.params.data}
                    active={chatStore.numbers}
                    flag={chatStore.numbers == 0 ? false : true}
                    onCancel={() => {
                        chatStore.setAsItIs(TITLE)
                        setList(chatStore.chats.toJSON())
                        setCom('')
                    }}
                    onDelete={() => {
                        setMode('Deleted')
                        chatStore.deleteChat(TITLE)
                        setList(chatStore.chats.toJSON())
                        setCom('')
                        fadeIn()
                    }}
                    onNext={() => navigation.navigate('userdetail', { data: obj })}
                />
            </View>}

            <View style={{ height: HEIGHT(610) }}>
                <FlatList
                    ref={scroll}
                    onViewableItemsChanged={onViewRef.current}
                    viewabilityConfig={viewConfigRef.current}
                    onScrollBeginDrag={() => setRun(true)}
                    onScrollEndDrag={() => setRun(false)}
                    showsVerticalScrollIndicator={false}
                    // onViewableItemsChanged={onViewableItemsChanged}
                    // viewabilityConfig={{
                    //     itemVisiblePercentThreshold: 50
                    // }}
                    // onScroll={(e) => {
                    //     console.log(e.nativeEvent.contentOffset.y)
                    //     if (e.nativeEvent.contentOffset.y == last) {
                    //         setShow(false)
                    //     } else {
                    //         setShow(true)
                    //     }
                    // }}
                    onScroll={({ nativeEvent }) => {
                        if (isCloseToBottom(nativeEvent)) {
                            setShow(false)
                        } else {
                            setShow(true)
                        }
                    }}
                    data={list}
                    renderItem={({ item, index }) => (
                        <View style={{ marginTop: 0 }}>
                            {(item.title == TITLE) && <FlatList
                                data={item.msg}
                                renderItem={({ item, index }) => (
                                    <View style={{ marginTop: 10 }}>
                                        <View style={{ alignSelf: 'center', backgroundColor: '#f1f1f1', borderRadius: 10 }}>
                                            {
                                                (item.msgs.length != 0) &&
                                                <Text style={{ fontSize: 15, marginHorizontal: 5, marginVertical: 5 }}>{item.date == TODAY ? 'Today' : item.date}</Text>
                                            }
                                        </View>

                                        <Insider item={item} index={index} date={item.date} />
                                    </View>
                                )}
                                keyExtractor={(item, index) => 'index' + index.toString()}
                            />}

                        </View>
                    )}
                    keyExtractor={(item, index) => 'index' + index.toString()}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => console.log('end')}
                />
                <ModalView />
                {show && <View elevation={5} style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40, backgroundColor: '#f1f1f1', borderRadius: 20, position: 'absolute', bottom: 0, left: 10 }}>

                    <FontAwesome name='angle-double-down' size={30}
                        onPress={() => {
                            //scroll.current.scrollToIndex({ animated: true, index: 0 })
                            scroll.current.scrollToEnd({ animated: true })
                        }} />
                </View>}
                {run && <View style={{ position: 'absolute', top: 0, alignSelf: 'center', backgroundColor: '#d1dde3', borderRadius: 10 }}>
                    <Text style={{ fontSize: 18, paddingVertical: 5, paddingHorizontal: 5 }}>{value}</Text>
                </View>}

                <Animated.View style={{ opacity: fadeAnim, position: 'absolute', bottom: 0, alignSelf: 'center', backgroundColor: '#f1f1f1', borderRadius: 5 }}>
                    <Text style={{ fontSize: 18, marginHorizontal: 7, marginVertical: 7 }}>{mode}</Text>
                </Animated.View>
                <Extra />
            </View>
            <View style={styles.bottom}>
                {((com != '') || (img != '') || (vid != '')) && <View style={{
                    width: WIDTH(220),
                    minHeight: 50,
                    alignSelf: 'center',
                    backgroundColor: '#f1f1f1',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{ width: WIDTH(200), backgroundColor: '#f1f1f1', borderLeftWidth: 4, borderLeftColor: 'blue' }}>
                        {(com != '') && <Text numberOfLines={2} style={{ fontSize: 18 }}>{com}</Text>}
                        {vid != '' && <Entypo name='video' size={20} style={{ marginLeft: 20 }} />}
                        {(img != '') && <FontAwesome name='image' size={20} style={{ marginLeft: 20 }} />}
                    </View>
                </View>}


                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.icon}>
                        <Feather name='smile' size={30} />
                    </View>
                    <View style={styles.txtip}>
                        {/* {select &&
                            <Animated.View style={{ position: 'absolute', right: 0, bottom: 50, height: 100 }}>
                                <TouchableOpacity onPress={() => selectFile('Image')}>
                                    <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'maroon', justifyContent: 'center', alignItems: 'center' }}>
                                        <Entypo name='image' size={30} color='#fff' />
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'maroon', justifyContent: 'center', alignItems: 'center' }}>
                                    <Entypo name='video' size={30} color='#fff' onPress={() => selectFile('Video')} />
                                </View>
                            </Animated.View>} */}
                        <TextInput
                            placeholder='send message...'
                            value={name}
                            onChangeText={data => setName(data)}
                            style={{ width: (name == '') ? 200 : 250 }}
                        />
                        {(name == '' && com == '') && <Entypo name='attachment' size={24} onPress={() => {
                            setSelect(!select)
                        }}
                            style={{ right: 10, position: 'absolute' }} />}
                    </View>

                    {(name == '' && img == '' && vid == '') ?
                        <Ionicons name='md-mic-circle-sharp' size={58} color='#075e55' />
                        : <MaterialCommunityIcons name={'send-circle'} color='#075e55' size={58}
                            onPress={() => {
                                Adding()
                            }}
                        />}
                </View>
            </View>
        </ImageBackground>
    )
})
const styles = StyleSheet.create({
    view: {
        height: 70,
        width: '100%',
        backgroundColor: '#075e55',
        justifyContent: 'center'
    },
    bottom: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    txtip: {
        width: 280, height: 50, borderRadius: 30,
        backgroundColor: '#fff', borderWidth: 1,
        marginHorizontal: 7, paddingLeft: 10, flexDirection: 'row',
        alignItems: 'center'
    },
    main: {
        backgroundColor: '#d9f3b5',
        padding: 10,
        marginLeft: '45%',
        borderRadius: 5,
        marginTop: 7,
        marginBottom: 7,
        marginRight: '5%',
        maxWidth: '50%',
        minWidth: '20%',
        alignSelf: 'flex-end',
    },
    rightArrow: {
        position: 'absolute',
        backgroundColor: 'transparent',
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomLeftRadius: 25,
        right: -10,
    },

    rightArrowOverlap: {
        position: 'absolute',
        backgroundColor: "transparent",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomLeftRadius: 18,
        right: -20,
    },
    icon: {
        width: 50, height: 50, borderRadius: 25, borderWidth: 1,
        justifyContent: 'center', alignItems: 'center',
        backgroundColor: '#fff'
    }
})
//scroll to bottom icon