import React, { useState, useRef } from "react"
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Animated, TouchableHighlight } from "react-native"
import Modal from 'react-native-modal';
import { HEIGHT, WIDTH } from "../../theme/scale";
import RBSheet from "react-native-raw-bottom-sheet";
import { useEffect } from "react";
import { BottomView } from "../../components";


let Banks = [
    { name: 'AXIS bank', img: 'https://d2cyt36b7wnvt9.cloudfront.net/exams/wp-content/uploads/2017/01/20162320/image1.jpg' },
    { name: 'Kotak Mahindra Bank.', img: 'https://d2cyt36b7wnvt9.cloudfront.net/exams/wp-content/uploads/2020/02/28200639/kotak-mahindra-300x300.png' },
    { name: 'HDFC Bank.', img: 'https://d2cyt36b7wnvt9.cloudfront.net/exams/wp-content/uploads/2017/01/20162113/365599-hdfc-bank.jpg' },
    { name: 'ICICI Bank.', img: 'https://d2cyt36b7wnvt9.cloudfront.net/exams/wp-content/uploads/2017/01/20162137/ICICI-Bank_0-300x221.jpg' },
    { name: 'Bank of Baroda', img: 'https://d2cyt36b7wnvt9.cloudfront.net/exams/wp-content/uploads/2017/01/20162516/bob-300x225.jpg' },
    { name: 'SBI Bank', img: 'https://d2cyt36b7wnvt9.cloudfront.net/exams/wp-content/uploads/2017/01/20161047/thumb.jpg' },
    { name: 'Yes Bank', img: 'https://d2cyt36b7wnvt9.cloudfront.net/exams/wp-content/uploads/2020/02/28203144/yes-bank.jpg' },
    { name: 'Bank Of India', img: 'https://d2cyt36b7wnvt9.cloudfront.net/exams/wp-content/uploads/2017/01/20162757/284344-bank-of-india-logo-300x300.jpg' }
]
export const Bank = ({ flag, backing }) => {
    //bounceValue: new Animated.Value(100),  //This is the initial position of the subview
    //buttonText: "Show Subview"
    const [bounceValue, setBounceValue] = useState(new Animated.Value(100))
    const [buttonText, setButtonText] = useState('show')
    const [mode, setMode] = useState(true)
    var isHidden = flag == 'UPI/Netbanking' ? false : true;

    function _toggleSubview() {
        setButtonText(!isHidden ? "Show Subview" : "Hide Subview")
        var toValue = 550;

        if (isHidden) {
            toValue = 0;
        }

        //This will animate the transalteY of the subview between 0 & 100 depending on its current state
        //100 comes from the style below, which is the height of the subview.
        Animated.spring(bounceValue, {
            toValue: toValue,
            velocity: 3,
            tension: 2,
            friction: 8,
            useNativeDriver: true
        }).start();

        isHidden = !isHidden;
    }
    const refRBSheet = useRef();

    useEffect(() => {
        refRBSheet.current.open()
        _toggleSubview()
    }, [])
    function boom() {
    }
    function Anime() {
        return (

            <Animated.View
                style={[styles.subView,
                { transform: [{ translateY: bounceValue }] }]}
            >
                <Text style={{ fontSize: 20 }}>XXXXXXXXXXXXXXX</Text>
            </Animated.View>
        )
    }
    return (
        // <View>
        //     {flag == 'UPI/Netbanking' && isHidden == false &&

        //         <View>

        //             <Animated.View
        //                 style={[styles.subView,
        //                 { transform: [{ translateY: bounceValue }] }]}
        //             >
        //                 <View>
        //                     <Text style={{ fontSize: 20}}>XXXXXXXXXXXXXXX</Text>
        //                 </View>
        //                 <View style={{ flexDirection: 'row' }}>
        //                     <View style={{ height: 50, width: '50%', backgroundColor: mode ? "#fff" : '#f1f1f1', alignItems: 'center', justifyContent: 'center' }}>
        //                         <TouchableOpacity onPress={() => setMode(true)}>
        //                             <Text style={{ fontSize: 20 }}>Amazon Pay UPI</Text>
        //                         </TouchableOpacity>
        //                     </View>
        //                     <View style={{ height: 50, width: '50%', backgroundColor: !mode ? "#fff" : '#f1f1f1', alignItems: 'center', justifyContent: 'center' }}>
        //                         <TouchableOpacity onPress={() => setMode(false)}>
        //                             <Text style={{ fontSize: 20 }}>Other Ways</Text>
        //                         </TouchableOpacity>
        //                     </View>
        //                 </View>
        //                 <View>
        //                     {mode && <View>
        //                         <Text>First</Text>
        //                     </View>}
        //                     {!mode && <View>
        //                         <Text>Second</Text>
        //                     </View>}
        //                 </View>
        //             </Animated.View>
        //         </View>
        //     }
        // </View >
        <View>
            <RBSheet
                ref={refRBSheet}
                closeOnPressMask={false}
                closeOnDragDown={true}
                height={HEIGHT(450)}
                openDuration={250}
                customStyles={{
                    wrapper: {
                        background: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "#fff"
                    }
                }}
            >
                <View style={{ position: 'absolute' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ height: 50, width: '50%', backgroundColor: mode ? "#fff" : '#f1f1f1', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => setMode(true)}>
                                <Text style={{ fontSize: 20 }}>Amazon Pay UPI</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 50, width: '50%', backgroundColor: !mode ? "#fff" : '#f1f1f1', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => setMode(false)}>
                                <Text style={{ fontSize: 20 }}>Other Ways</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        {mode && <View style={{ height: 400 }}>
                            <Text style={{ fontSize: 20, alignSelf: 'center' }}>Top Banks</Text>
                            <FlatList
                                data={Banks}
                                renderItem={({ item, index }) => (
                                    <View style={{ marginTop: 10, marginLeft: 10, flexDirection: 'row' }}>
                                        <Image source={{ uri: item.img }} style={{ width: index != 2 ? 140 : 100, height: 100 }} />
                                        <Text style={{ textAlignVertical: 'center', fontSize: 18, marginLeft: 10 }}>{item.name}</Text>
                                    </View>
                                )}
                                keyExtractor={item => item.img}
                            />
                        </View>}
                        {!mode &&
                            <View>
                                <TouchableOpacity onPress={() => {
                                    refRBSheet.current.close()
                                    backing()
                                }}>
                                    <Text>Second</Text>
                                </TouchableOpacity>
                            </View>}

                    </View>
                </View>
            </RBSheet>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginTop: 66
    },
    button: {
        padding: 8,
    },
    buttonText: {
        fontSize: 17,
        color: "#007AFF"
    },
    subView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        height: 550,
    }
});