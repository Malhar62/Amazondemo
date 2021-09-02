// import React, { useRef } from "react"
// import { View, Text, FlatList, Image, TouchableOpacity, Animated, Dimensions, StyleSheet, StatusBar } from "react-native"
// import { HEIGHT, WIDTH } from "../../theme/scale"
// import ChatScreen from "./chat"
// import StatusScreen from "./status"
// import CallsScreen from "./calls"

// import { TabView, SceneMap } from 'react-native-tab-view';

// export default function Main() {
//     const [index, setIndex] = React.useState(0);
//     const [routes] = React.useState([
//         { key: 'first', title: 'Chats' },
//         { key: 'second', title: 'Status' },
//         { key: 'third', title: 'Calls' },
//     ]);
//     const renderScene = SceneMap({
//         first: ChatScreen,
//         second: StatusScreen,
//         third: CallsScreen
//     });
//     const initialLayout = { width: Dimensions.get('window').width };

//     const renderTabBar = (props: { navigationState: { routes: any[] }; jumpTo: (arg0: any) => void }) => {
//         const [name, setName] = React.useState('');
//         const length = React.useRef(new Animated.Value(0)).current;
//         const HEADER_MAX_HEIGHT = 100;
//         const HEADER_MIN_HEIGHT = 40;
//         const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
//         return (
//             <Animated.View
//                 elevation={5}
//                 style={{
//                     height: 120,
//                     backgroundColor: '#075e55',
//                     paddingTop: 20,
//                 }}>
//                 <Animated.View
//                     style={{
//                         justifyContent: 'center',
//                         backgroundColor: '#075e55',
//                         width: '100%',
//                         height: length.interpolate({
//                             inputRange: [0, HEADER_SCROLL_DISTANCE],
//                             outputRange: [40, 0],
//                             extrapolate: 'clamp',
//                         }),
//                     }}>
//                     <View
//                         style={{
//                             justifyContent: 'space-between',
//                             flexDirection: 'row',
//                         }}>
//                         <Text style={{ color: '#fff', fontSize: 20, marginLeft: 10 }}>
//                             Whatsapp
//                         </Text>
//                     </View>
//                 </Animated.View>
//                 <Animated.View
//                     style={{
//                         backgroundColor: '#075e55',
//                         flexDirection: 'row',
//                         width: '100%',
//                         height: 30,
//                         marginTop: length.interpolate({
//                             inputRange: [0, HEADER_SCROLL_DISTANCE],
//                             outputRange: [30, 0],
//                             extrapolate: 'clamp',
//                         }),
//                         justifyContent: 'space-between',
//                     }}>
//                     {props.navigationState.routes.map((route, i: any) => {
//                         return (
//                             <View
//                                 style={{
//                                     bottom: 10,
//                                     width: '34%',
//                                     height: 40,
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     borderBottomColor: 'white',
//                                     borderBottomWidth: name == route.title ? 3 : 0,
//                                 }}>
//                                 <TouchableOpacity
//                                     onPress={() => {
//                                         setName(route.title);
//                                         props.jumpTo(route.key)
//                                     }}>
//                                     <Text
//                                         style={{
//                                             color: name == route.title ? '#fff' : '#b5d1cf',
//                                         }}>
//                                         {route.title}
//                                     </Text>
//                                 </TouchableOpacity>
//                             </View>
//                         );
//                     })}
//                 </Animated.View>
//             </Animated.View>
//         );
//     };
//     return (
//         <TabView
//             navigationState={{ index, routes }}
//             renderScene={renderScene}
//             onIndexChange={setIndex}
//             renderTabBar={renderTabBar}
//             initialLayout={initialLayout}
//         />
//     )
// }
import React from "react"
import ChatScreen from "./chat"
import StatusScreen from "./status"
import AllContact from './allContact'
import CallsScreen from "./calls"
import { ChatDetailScreen } from './chatdetail'
import { createStackNavigator } from "@react-navigation/stack"
import { UserDetailScreen } from "./userdetail"
import ForwardScreen from "./forward"
import { SavedScreen } from "./saved"
import { ScheduleScreen } from "./schedule"
import Zoom from "./Zoom"
import { MediaScreen } from "./media"

const Stack = createStackNavigator();

export default function Main() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name='chating' component={Chating} />
            <Stack.Screen name='status' component={StatusScreen} />
            <Stack.Screen name='calls' component={CallsScreen} />
        </Stack.Navigator>
    )
}
function Chating() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name='chat' component={ChatScreen} />
            <Stack.Screen name='allcontact' component={AllContact} />
            <Stack.Screen name='chatdetail' component={ChatDetailScreen} />
            <Stack.Screen name='userdetail' component={UserDetailScreen} />
            <Stack.Screen name='forward' component={ForwardScreen} />
            <Stack.Screen name='saved' component={SavedScreen} />
            <Stack.Screen name='schedule' component={ScheduleScreen} />
            <Stack.Screen name='zoom' component={Zoom} />
            <Stack.Screen name='media' component={MediaScreen}/>
        </Stack.Navigator>
    )
}