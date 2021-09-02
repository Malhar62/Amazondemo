
import React from 'react';
import { View, Text, TouchableOpacity, Animated, FlatList, Dimensions } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import Entypo from 'react-native-vector-icons/Entypo'
import ModalDropdown from 'react-native-modal-dropdown';
import { HEIGHT } from '../../theme/scale';

export default function Header({ length, name }) {
    const navigation = useNavigation()
    const HEADER_MAX_HEIGHT = 120;
    const HEADER_MIN_HEIGHT = 40;
    const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
    const [flag, setFlag] = React.useState<boolean>(false)
    const model_1 = React.useRef()

    let array = [
        { title: 'chating' },
        { title: 'status' },
        { title: 'calls' }
    ]
    let dropdownArray = ['saved', 'later', 'schedule'];

    function giveHeight() {

        var value = (dropdownArray.length) * HEIGHT(50);

        return value;
    }
    return (
        // <Animated.View
        //     elevation={5}
        //     style={{
        //         height: HEADER_MAX_HEIGHT,
        //         backgroundColor: '#075e55',
        //         position: 'absolute',
        //         top: 0,
        //         left: 0,
        //         right: 0,
        //     }}>
        //     <Animated.View
        //         style={{
        //             justifyContent: 'center',
        //             backgroundColor: '#075e55',
        //             width: '100%',
        //             height: length.interpolate({
        //                 inputRange: [0, HEADER_SCROLL_DISTANCE],
        //                 outputRange: [40, 0],
        //                 extrapolate: 'clamp',
        //             }),
        //         }}>
        //         <View
        //             style={{
        //                 justifyContent: 'space-between',
        //                 flexDirection: 'row',
        //             }}>
        //             <Text style={{ color: '#fff', fontSize: 20, marginLeft: 10 }}>
        //                 Whatsapp
        //             </Text>
        //         </View>
        //     </Animated.View>
        //     <Animated.View
        //         style={{
        //             backgroundColor: '#075e55',
        //             flexDirection: 'row',
        //             width: '100%',
        //             height: 100,
        //             marginTop: length.interpolate({
        //                 inputRange: [0, HEADER_SCROLL_DISTANCE],
        //                 outputRange: [30, 0],
        //                 extrapolate: 'clamp',
        //             }),
        //             justifyContent: 'space-between',
        //         }}>
        //         <FlatList
        //             data={array}
        //             horizontal={true}
        //             renderItem={({ item, index }) => (
        //                 <View
        //                     style={{
        //                         width: '34%',
        //                         height: 40,
        //                         alignItems: 'center',
        //                         justifyContent: 'center',
        //                         borderBottomColor: 'white',
        //                         borderBottomWidth: name == item.title ? 3 : 0,
        //                     }}>
        //                     <TouchableOpacity
        //                         onPress={() => {
        //                             setName(item.title);
        //                             navigation.navigate(item.title)
        //                         }}>
        //                         <Text
        //                             style={{
        //                                 color: '#fff',
        //                             }}>
        //                             {item.title}
        //                         </Text>
        //                     </TouchableOpacity>
        //                 </View>
        //             )}
        //             keyExtractor={(item, index) => index.toString()}
        //         />
        //     </Animated.View>
        // </Animated.View>
        <View style={{ width: '100%', backgroundColor: '#075e55' }}>
            <Animated.View style={{
                height: length.interpolate({
                    inputRange: [0, HEADER_SCROLL_DISTANCE],
                    outputRange: [50, 0],
                    extrapolate: 'clamp',
                }),
                opacity: length.interpolate({
                    inputRange: [0, HEADER_SCROLL_DISTANCE],
                    outputRange: [1, 0],
                    extrapolate: 'clamp',
                }),
                width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10
            }}>
                <Text
                    style={{
                        color: '#fff', fontSize: 20
                    }}>Whatsapp</Text>
                {/* {flag == false && <Entypo name='dots-three-vertical' size={18} color='#fff' onPress={() => setFlag(true)} />}
                {flag && <ModalDropdown defaultValue={'king'} options={['option 1', 'option 2']} />} */}
                <ModalDropdown
                    ref={model_1}
                    disabled={false}
                    defaultValue={'king'}
                    dropdownTextStyle={{ fontSize: 20, borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}
                    dropdownStyle={{ height: giveHeight() }}
                    onSelect={(index: number) => navigation.navigate(dropdownArray[index])}
                    options={dropdownArray}>
                    <Entypo name='dots-three-vertical' size={18} color='#fff'
                        onPress={() => { model_1.current.show() }} />
                </ModalDropdown>
            </Animated.View>
            <Animated.View style={{
                height: 70, width: '100%'
            }}>
                <FlatList
                    data={array}
                    horizontal={true}
                    renderItem={({ item, index }) => (
                        <Animated.View style={{
                            transform: [{
                                translateY: length.interpolate({
                                    inputRange: [0, HEADER_SCROLL_DISTANCE],
                                    outputRange: [0, 0],
                                    extrapolate: 'clamp',
                                }),
                            }], width: (Dimensions.get('window').width / 3), height: 70, borderBottomWidth: name == item.title ? 4 : 0, borderBottomColor: '#fff', justifyContent: 'center'
                        }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(item.title)} >
                                <Text
                                    style={{
                                        color: name == item.title ? '#fff' : '#f1f1f1', fontSize: 18, alignSelf: 'center'
                                    }}>
                                    {item.title.toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    )}
                    keyExtractor={item => item.title}
                />
            </Animated.View>
        </View>
    )
}