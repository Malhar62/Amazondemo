import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { HEIGHT, WIDTH } from '../../theme/scale';

export default function AllContact() {
    const [list, setList] = React.useState([]);
    const navigation = useNavigation()
    React.useEffect(() => {
        const url = 'https://reqres.in/api/users?page=1';
        const url1 = 'https://reqres.in/api/users?page=2';
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                const response1 = await fetch(url1);
                const json1 = await response1.json();
                var array = [...json.data, ...json1.data];
                setList(array);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchData();
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.view}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons name='arrow-back-sharp' size={25} color='#fff' onPress={() => navigation.goBack()} />
                        <Text style={{ fontSize: 18, color: '#fff', marginLeft: 20 }}>Select Contact</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons name='search' size={20} onPress={() => { }} color='#fff' style={{ marginRight: 20 }} />
                        <Entypo name='dots-three-vertical' size={20} color='#fff' />
                    </View>
                </View>
            </View>
            <View style={{ height: HEIGHT(750) }}>
                <FlatList
                    key={1}
                    showsVerticalScrollIndicator={false}
                    data={list}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => { }}>
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
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    view: {
        height: 70,
        width: '100%',
        backgroundColor: '#04877a',
        justifyContent: 'center'
    }
})