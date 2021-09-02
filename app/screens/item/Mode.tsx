import React from "react"
import { View, Text, TouchableOpacity, TextStyle, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { RangeSlider } from "../../components"
import Modal from 'react-native-modal';
import { HEIGHT, WIDTH } from "../../theme/scale"
import { useState } from "react"

const TEXT: TextStyle = { fontSize: 20, alignSelf: 'center', marginTop: HEIGHT(5) }
const MODAL: ViewStyle = { width: '100%', height: HEIGHT(120), backgroundColor: 'white', justifyContent: 'space-between', borderTopEndRadius: 10, borderTopStartRadius: 10, position: 'absolute', bottom: -10 }

export default function Mode({ isModalVisible, falsing }) {
    const { shoppingStore } = useStores()
    const navigation = useNavigation()
    const [flag, setFlag] = React.useState<boolean>(false)
    const [part, setPart] = useState<boolean>(false)
    const [start, setStart] = useState<number>(0)
    const [end, setEnd] = useState<number>(start)

    return (
        <View>
            <View>
                <Modal isVisible={isModalVisible}>
                    <View style={MODAL}>
                        <TouchableOpacity onPress={() => {
                            falsing()
                            setFlag(true)
                            setStart(0)
                            setEnd(start)
                        }}>
                            <Text style={TEXT}>{'-Sort by range -'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                falsing()
                                shoppingStore.sortUp();
                                navigation.navigate('itemlist')
                            }}>
                            <Text style={TEXT}>{'- Price Low to High -'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            falsing()
                            shoppingStore.sortDown();
                            navigation.navigate('itemlist')
                        }}><Text style={TEXT}>{'- Price High to Low -'}</Text></TouchableOpacity>

                    </View>
                </Modal>
            </View>
            <View>
                <RangeSlider
                    onComplete={(min: number, max: number) => {
                        setPart(false)
                        setFlag(false)
                        shoppingStore.sortRange(min, max)
                    }}
                    flag={flag}
                    part={part}
                    set_Part={() => { setPart(true); setEnd(start) }}
                    start={start}
                    end={end}
                    set_start={(data: any) => setStart(data)}
                    set_end={(data: any) => setEnd(data)}
                />
            </View>
        </View>
    )
}