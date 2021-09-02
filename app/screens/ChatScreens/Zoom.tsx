import React from 'react'
import { View, Text, Image, Dimensions } from 'react-native'
import { useNavigation, useRoute } from "@react-navigation/native"
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Zoom() {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const TYPE: string = route.params.type;
    const URI: string = route.params.data;
    const [pause, setPause] = React.useState(false)
    function BackArrow() {
        return (
            <View style={{ position: 'absolute', top: 10, left: 10 }}>
                <Ionicons
                    name='arrow-back-sharp'
                    size={30}
                    color='#fff'
                    onPress={() => navigation.goBack()} />
            </View>
        )
    }

    if (TYPE == 'image') {
        return (
            <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
                <BackArrow />
                <Image source={{ uri: URI }} style={{ width: '100%', height: 550 }} />
            </View>
        )
    } else {
        if (TYPE == 'video') {
            return (
                <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
                    <BackArrow />
                    <Video
                        source={{ uri: URI }}
                        controls={true}
                        resizeMode="cover"
                        style={{ width: '100%', height: 550 }}
                    />
                </View>
            )
        } else {
            return <View><Text>Empty</Text></View>
        }
    }

}