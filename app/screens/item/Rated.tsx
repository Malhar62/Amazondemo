
import React from "react"
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native"
import { HeaderCommon } from "../../components"
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native"
import { useStores } from "../../models"
import { WIDTH } from "../../theme/scale"
import { typography } from "../../theme"
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function Rated() {
    const { commentStore, shoppingStore } = useStores()
    const route = useRoute<any>()
    // Pull in navigation via hook
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const [list, setList] = React.useState([])
    const [load, setLoad] = React.useState<boolean>()
    const CATEGORY_NAME: string = route.params.NAME
    React.useEffect(() => {
        if (isFocused) {
            setLoad(true)
            var array = [];
            for (var i = 0; i < commentStore.ratings.length; i++) {
                if (commentStore.ratings[i].category == CATEGORY_NAME) {
                    array.push(commentStore.ratings[i])
                }
            }
            array.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
            setList(array)
            setLoad(false)
        }
    }, [isFocused])
    let stars = [1, 2, 3, 4, 5]

    function FiveStar({ VALUE }) {
        return (
            <FlatList
                horizontal={true}
                data={stars}
                renderItem={({ item, index }) => (
                    <View>
                        <FontAwesome
                            name={(item <= VALUE) ? 'star' : 'star-o'}
                            size={20}
                            color={(item <= VALUE) ? 'gold' : 'black'}
                            style={{ marginLeft: 5 }} />
                    </View>
                )}
                keyExtractor={index => String(index)}
            />
        )
    }

    function TopRated({ item, index }) {

        return (
            <View style={{ marginHorizontal: 10, marginTop: 20, borderBottomWidth: 1, height: 140, borderBottomColor: 'grey' }}>
                <TouchableOpacity onPress={() => navigation.navigate('itemdetail', { user: item })}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignSelf: 'center' }}>
                            <Image source={{ uri: item.image }} style={{ width: WIDTH(100), height: 100 }} />
                        </View>
                        <View style={{ marginLeft: 10, width: 310 }}>
                            <Text numberOfLines={2} style={{ fontSize: 18, fontFamily: typography.primary, color: shoppingStore.dark ? '#fff' : 'black' }}>{item.title}</Text>
                            <Text style={{ color: 'grey', fontSize: 15 }}>{item.category}</Text>
                            <Text style={{ fontSize: 18, color: shoppingStore.dark ? '#fff' : 'black' }}>Rs.{item.price}</Text>
                            {<FiveStar VALUE={item.value} />}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <HeaderCommon
                LEFT={'back'}
                RIGHT={'cart'}
                onLeft={() => {
                    navigation.goBack()
                }}
                onRight={() => navigation.navigate('cart')}
            />
            {load == false && <View style={{ marginTop: 20 }}>
                <View style={{ width: 400, height: 45, alignItems: 'center', alignSelf: 'center', justifyContent: 'center', backgroundColor: 'purple' }}>
                    <Text style={{ fontSize: 20, color: '#fff' }}>top  rated  {CATEGORY_NAME.toUpperCase()}  products</Text>
                </View>
                <FlatList
                    data={list}
                    renderItem={({ item, index }) => (
                        <TopRated item={item} index={index} />
                    )}
                    keyExtractor={item => item.title}
                />
            </View>}
        </View>
    )
}
//FontAwesome name={(item <= list) ? 'star' : 'star-o'} size={20} color={(item <= item.value) ? 'star' : 'star-o'} style={{marginLeft:5}} />