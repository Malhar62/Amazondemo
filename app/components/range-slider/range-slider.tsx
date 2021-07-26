import * as React from "react"
import { StyleProp, View, ViewStyle, TouchableOpacity, Text } from "react-native"
import { observer } from "mobx-react-lite"
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';
import { WIDTH } from "../../theme/scale";
import { typography } from "../../theme";
import { useStores } from "../../models"

const MODAL1: ViewStyle = { height: 150, width: WIDTH(250), backgroundColor: '#fff', borderRadius: 10, alignSelf: 'center', justifyContent: 'center' }

export interface RangeSliderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  flag
  onComplete
  part
  set_Part
  start
  end
  set_start
  set_end
}

/**
 * Describe your component here
 */
export const RangeSlider = observer(function RangeSlider(props: RangeSliderProps) {
  const { flag, onComplete, part, set_Part, start, end, set_start, set_end } = props
  //const [start, setStart] = useState<number>(0)
  //const [end, setEnd] = useState<number>(start)
  //const [part, setPart] = useState<boolean>(false)
  const { shoppingStore } = useStores()
  function findMax() {
    var max = 0;
    for (var i = 0; i < shoppingStore.items.length; i++) {
      if (shoppingStore.items[i].price > max) {
        max = shoppingStore.items[i].price
      }
    }
    return max;
  }
  return (
    <View>
      <Modal isVisible={flag}>
        <View style={MODAL1}>
          {part == false && <View style={{ justifyContent: 'space-between' }}>
            <View style={{ alignSelf: 'center' }}>
              <Text style={{ fontSize: 20, fontFamily: typography.secondary }}>SET MINIMUM</Text>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={findMax()}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                step={1}
                onValueChange={value => set_start(value)}
              />
              <Text style={{ fontSize: 20 }}>Rs.{start}</Text>
            </View>
            <View style={{ alignSelf: 'center', backgroundColor: 'blue', width: 60, alignItems: 'center' }}>
              <TouchableOpacity onPress={() => { set_Part() }}>
                <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>DONE</Text>
              </TouchableOpacity>
            </View>
          </View>}
          {part == true && <View style={{}}>
            <View style={{ alignSelf: 'center' }}>
              <Text style={{ fontSize: 20, fontFamily: typography.secondary }}>SET MAXIMUM</Text>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={start}
                maximumValue={findMax()}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                step={1}
                onValueChange={value => set_end(value)}
              />
              <Text style={{ fontSize: 20 }}>Rs.{end}</Text>
            </View>
            <View style={{ alignSelf: 'center', backgroundColor: 'blue', width: 60, alignItems: 'center' }}>
              <TouchableOpacity onPress={() => { onComplete(start, end) }}>
                <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>DONE</Text>
              </TouchableOpacity>
            </View>
          </View>}
        </View>
      </Modal>
    </View>
  )
})
