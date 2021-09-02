import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { HeaderCommon } from '../../components';
import { useNavigation } from "@react-navigation/native"
import { WIDTH } from '../../theme/scale';


export const AddCard = ({ navigation }) => {
    const [num, setNum] = React.useState('')
    return (
        <View>
            <HeaderCommon
                LEFT={'back'}
                onLeft={() => {
                    navigation.goBack();
                }}
            />
            <View>
                <Text style={{ fontSize: 20 }}>Enter your credit card information.we will save {'\n'} this card so you can use it later</Text>
                <View style={{ alignSelf: 'center', marginTop: 20 }}>
                    <View style={{ width: WIDTH(370), height: 50, backgroundColor: 'pink', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20 }}>Malhar Pandya</Text>
                    </View>
                    <View style={{ width: WIDTH(370), height: 50, backgroundColor: '#fff' }}>
                        <TextInput
                            value={num}
                            placeholder='enter card number'
                            onChangeText={data => setNum(data)}
                            style={{ fontSize: 20 }}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}