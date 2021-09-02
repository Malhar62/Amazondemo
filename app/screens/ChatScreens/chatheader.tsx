
import React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { HEIGHT, WIDTH } from "../../theme/scale"
import ModalDropdown from 'react-native-modal-dropdown';
import { useNavigation } from "@react-navigation/native"


export default function ChatHeader({ onMedia, onBack, obj, onNext, flag, active, onDelete, onCancel, onForward, onComment, onSaved, onInfo }) {
    //const navigation = useNavigation()
    const model_1 = React.useRef()
    let dropdownArray = ['media'];

    function giveHeight() {

        var value = (dropdownArray.length) * HEIGHT(50);

        return value;
    }

    if (flag == false) {
        return (
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name='arrow-back-sharp' size={25} color='#fff' onPress={() => {
                        onBack()
                    }} />
                    <Image source={{ uri: obj.avatar }} style={{ width: 50, height: 50, borderRadius: 25, marginHorizontal: 7 }} />
                    <TouchableOpacity onPress={() => onNext()}>
                        <Text style={{ fontSize: 20, color: '#fff' }}>{obj.first_name} {obj.last_name}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <ModalDropdown
                        ref={model_1}
                        disabled={false}
                        defaultValue={'king'}
                        dropdownTextStyle={{ fontSize: 20, borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}
                        dropdownStyle={{ height: giveHeight() }}
                        onSelect={(index: number) => onMedia(dropdownArray[index])}
                        options={dropdownArray}>
                        <Entypo name='dots-three-vertical' size={18} color='#fff'
                            onPress={() => { model_1.current.show() }} />
                    </ModalDropdown>
                </View>
            </View>
        )
    } else {
        return (
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name='arrow-back-sharp' size={25} color='#fff' onPress={onCancel} />
                    <Text style={{ fontSize: 25, color: '#fff', marginLeft: 7 }}>{active}</Text>
                </View>
                <View style={{ width: WIDTH(150), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    {active == 1 && <Entypo name='forward' size={25} style={{ transform: [{ scaleX: -1 }] }} color='#fff' onPress={onComment} />}
                    <FontAwesome5 name='star' color='gold' size={20} onPress={onSaved} />
                    {active == 1 && <Ionicons name='information-circle-outline' size={25} color='#fff' onPress={onInfo} />}
                    <FontAwesome5 name='trash' size={20} color='#fff' onPress={onDelete} />
                    <Entypo name='forward' size={25} color='#fff' onPress={() => onForward()} />
                </View>
            </View>
        )
    }
}