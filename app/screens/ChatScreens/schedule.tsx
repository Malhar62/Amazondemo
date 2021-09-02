import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, Text, FlatList, Image, TextStyle, TouchableOpacity, Animated, TextInput, ImageBackground, PermissionsAndroid, ViewStyle } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
//moment().format('MMMM Do YYYY, h:mm:ss a')
import moment from "moment"
import DatePicker from 'react-native-date-picker'
import { typography } from "../../theme"
import { HEIGHT, WIDTH } from "../../theme/scale"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { launchImageLibrary, launchCamera } from "react-native-image-picker"
import Entypo from 'react-native-vector-icons/Entypo'
import Modal from 'react-native-modal'

const TEXT: TextStyle = {
    fontSize: 18, fontFamily: typography.code
}

//const VIEW: ViewStyle = { width: WIDTH(150), height: 50, backgroundColor: '#f1f1f1', marginRight: 5, marginTop: 10, alignItems: 'center', justifyContent: 'center' }

const VIEW1: ViewStyle = { flexDirection: 'row', alignItems: 'center', marginTop: 10 }

export const ScheduleScreen = observer(function ScheduleScreen() {
    const navigation = useNavigation()
    const { chatStore } = useStores()
    const [show, setShow] = useState(false)
    const route = useRoute<any>()
    //const [realtime, setRealtime] = useState(moment().format('h:mm a'))
    //const [realdate, setRealdate] = useState(moment().format('D MMMM YYYY'))
    const [date, setDate] = useState(new Date())
    const [name, setName] = useState('')
    const [list, setList] = useState([])
    const [flag, setFlag] = useState(false)
    const [img, setImg] = useState('')
    const [vid, setVid] = useState('')
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const [isModalVisible, setModalVisible] = React.useState<boolean>(false);

    useEffect(() => {
        let intervalId = setInterval(checkingDT, 60000)
        setList(chatStore.schedules.toJSON())
        return (() => {
            clearInterval(intervalId)
        })
    }, [])
    useEffect(() => {
        fadeIn()
    }, [chatStore.changes])
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
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Cam('camera')
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };
    function checkingDT() {
        chatStore.sendFromSchedule(moment().format('h:mm a'), moment().format('D MMMM YYYY'))
        setList(chatStore.schedules.toJSON())
    }
    console.log(moment().format('D MMMM YYYY'))
    function HeaderTop() {
        return (
            <View style={{
                height: 70, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#075e55',
            }}>
                <Ionicons style={{ position: 'absolute', left: 10 }}
                    name='arrow-back-sharp' size={25} color='#fff' onPress={() => {
                        if (show) {
                            setShow(false)
                        } else {
                            navigation.goBack();
                        }
                    }} />
                <Text style={{ fontSize: 20, color: '#fff' }}>Schedule a message</Text>
            </View>
        )
    }
    function Flatdata() {
        return (
            <View style={{ height: HEIGHT(680) }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={list}
                    renderItem={({ item, index }) => (
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#2d4544', paddingVertical: 7 }}>
                            <View>
                                <Text style={TEXT}>Date : {item.date}</Text>
                                <Text style={TEXT}>Time : {item.time}</Text>
                                <Text style={TEXT}>To   : {item.whom}</Text>
                                <Text style={TEXT}>Msg  : {item.text}</Text>
                                {item.image != '' && <View style={{ flexDirection: 'row' }}>
                                    <Text style={TEXT}>Files:</Text>
                                    <Ionicons name='image' size={25} style={{ marginLeft: 5 }} />
                                </View>}
                            </View>
                            <View style={{ position: 'absolute', right: 7, bottom: 7 }}>
                                <AntDesign name='delete' size={25} onPress={() => {
                                    chatStore.deleteSchedule(index);
                                    setList(chatStore.schedules.toJSON())
                                }} />
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View elevation={5} style={{ position: 'absolute', bottom: 10, right: 10 }}>
                    <Ionicons
                        onPress={() => {
                            setFlag(true)
                        }}
                        name='md-add-circle' size={60} color='#6389c2' />
                </View>
                <Animated.View elevation={5} style={{ opacity: fadeAnim, position: 'absolute', bottom: HEIGHT(20), alignSelf: 'center', backgroundColor: 'grey', borderRadius: 4 }}>
                    <Text style={{ marginHorizontal: 7, marginVertical: 7, fontSize: 15, color: '#fff' }}>SEND</Text>
                </Animated.View>
            </View>
        )
    }

    const Cam = (value: string) => {
        let options = {
            mediaType: value == 'IMAGE' ? 'image' : 'video',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        if (value == 'camera') {
            launchCamera(options, (response) => {
                console.log('Response = ', response);
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorMessage) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else {
                    // let source = response;
                    // console.log(source)
                    console.log('response', JSON.stringify(response.assets[0].uri));
                    setImg(response.assets[0].uri)
                }
            });
        } else {
            launchImageLibrary(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorMessage) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else {
                    // const source = { uri: response.uri };
                    console.log('response', JSON.stringify(response.assets[0].uri));
                    if (value == 'IMAGE') {
                        console.log('TOP')
                        setImg(response.assets[0].uri)
                        setVid('')
                    } else {
                        console.log('BOTTOM')
                        setVid(response.assets[0].uri)
                        setImg('')
                    }
                }
            });
        }
        setModalVisible(false)
    }
    function Media() {
        return (
            <View style={{ alignSelf: 'center' }}>
                <View style={VIEW1}>
                    <TouchableOpacity onPress={() => {
                        setModalVisible(true)
                    }}>
                        <Text style={{ fontSize: 20, textDecorationLine: 'underline', fontFamily: typography.code }}>Upload Image</Text>
                        <Text style={{ alignSelf: 'center' }}>{img}</Text>
                    </TouchableOpacity>
                </View>
                <View style={VIEW1}>
                    <TouchableOpacity onPress={() => Cam('video')}>
                        <Text style={{ fontSize: 20, textDecorationLine: 'underline', fontFamily: typography.code }}>Upload Video</Text>
                        <Text>{vid}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    function ModalView() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Modal
                    onDismiss={() => setModalVisible(false)}
                    onBackdropPress={() => setModalVisible(false)}
                    isVisible={isModalVisible}>
                    <View style={{ backgroundColor: '#fff', width: 300, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 10 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Entypo name='folder-images' size={30} onPress={() => Cam('IMAGE')} />
                            <Text style={{ fontSize: 18, fontFamily: typography.code }}>Open Gallery</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <AntDesign name='camera' size={30} onPress={() => requestCameraPermission()} />
                            <Text style={{ fontSize: 18, fontFamily: typography.code }}>Open Camera</Text>
                        </View>
                    </View>
                </Modal>
            </View >
        )
    }
    return (
        <ImageBackground source={{ uri: 'https://i.pinimg.com/originals/ab/ab/60/abab60f06ab52fa7846593e6ae0c9a0b.png' }} style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
            <View style={{ flex: 1 }}>
                <HeaderTop />
                {flag ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ alignSelf: 'center', backgroundColor: '#f1f1f1' }}>
                            {show && <DatePicker
                                is24hourSource={'device'}
                                date={date}
                                minimumDate={new Date()}
                                onDateChange={setDate}
                            />}
                        </View>
                        {show && <View style={{ marginTop: 20, width: WIDTH(200), height: HEIGHT(40), backgroundColor: 'navy', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                /**if (formatDate(date) == moment().format('D MMMM YYYY')) {
                                    var dt2 = new Date(formatTime(date));
                                    var dt1 = new Date(moment().format());
                                    var value = diff_minutes(dt2, dt1)
                                    if (value > 0) {
                                        setShow(false)
                                    } else {
                                        Alert.alert('select proper time !')
                                    }
                                } else {
                                    setShow(false)
                                } */
                                setShow(false)
                            }}>
                                <Text style={{ fontSize: 20, alignSelf: 'center', color: '#fff', fontFamily: typography.code }}>DONE</Text>
                            </TouchableOpacity>
                        </View>}
                        <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                            <TouchableOpacity onPress={() => setShow(true)}>
                                <Text style={{ fontSize: 20, alignSelf: 'center', textDecorationLine: 'underline' }}>Select date and time</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                                <View style={{ width: 150, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f1f1' }}>
                                    <MaterialCommunityIcons name='calendar-month' size={20} />
                                    <Text>{formatDate(date)}</Text>
                                </View>
                                <View style={{ width: 10, height: 50, backgroundColor: 'transparent' }}></View>
                                <View style={{ width: 150, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f1f1' }}>
                                    <MaterialCommunityIcons name='clock-time-eight-outline' size={20} />
                                    <Text>{formatAMPM(date)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignSelf: 'center', marginTop: 20 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('forward', { plan: 'schedule' })}>
                                <Text style={{ fontSize: 20, alignSelf: 'center', textDecorationLine: 'underline' }}>
                                    Whom to forward ?
                                </Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', marginTop: 20, width: 200, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f1f1' }}>
                                <Image source={{ uri: route.params ? route.params.Img : 'https://m.media-amazon.com/images/I/51UW1849rJL._AC_SX679_.jpg' }} style={{ width: 30, height: 30, borderRadius: 15, opacity: route.params ? (route.params.Img ? 1 : 0) : 0 }} />
                                <Text style={{ fontSize: 20, alignSelf: 'center' }}>{route.params ? route.params.Name : ''}</Text>
                            </View>
                        </View>
                        <View style={{ alignSelf: 'center', marginTop: 20 }}>
                            <TextInput
                                value={name}
                                placeholder='enter message...'
                                onChangeText={data => setName(data)}
                                style={{ width: 200, height: 50, backgroundColor: '#f1f1f1', alignSelf: 'center' }}
                            />
                        </View>
                        <Media />
                        <TouchableOpacity
                            style={{ marginTop: 20 }}
                            onPress={() => {
                                chatStore.addSchedule(formatDate(date), formatAMPM(date), route.params.Name, name, img, vid)
                                setShow(false)
                                setName('')
                                setDate(new Date())
                                setFlag(false)
                                setList(chatStore.schedules.toJSON())
                                setImg('')
                                setVid('')
                            }}>
                            <Text style={{ fontSize: 20, alignSelf: 'center', backgroundColor: 'navy', color: '#fff' }}>DONE</Text>
                        </TouchableOpacity>
                        <ModalView />
                    </View>
                    : <Flatdata />}
            </View>
        </ImageBackground>
    )
})
const formatDate = (date: Date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    // var DATE=date.getDate();
    var MONTH = (date.getMonth());
    return `${date.getDate()} ${monthNames[MONTH]} ${date.getFullYear()} `;
};

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
