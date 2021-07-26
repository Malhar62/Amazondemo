import React from "react"
import { View, ViewStyle, TextStyle, Image } from "react-native"
import { HeaderProps } from "./header.props"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { spacing } from "../../theme"
import { translate } from "../../i18n/"
import { useStores } from "../../models"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native"

// static styles
const ROOT: ViewStyle = {
  width: '100%',
  flexDirection: "row",
  paddingHorizontal: spacing[4],
  alignItems: "center",
  paddingTop: spacing[5],
  paddingBottom: spacing[5],
  justifyContent: "space-between",
  borderBottomWidth: 1,
  height: 60,
  backgroundColor: 'black'
}
const TITLE: TextStyle = { textAlign: "center", fontSize: 20 }
const TITLE_MIDDLE: ViewStyle = { alignSelf: 'center' }
const LEFT: ViewStyle = { width: 32 }
const RIGHT: ViewStyle = { width: 32 }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    headerText,
    headerTx,
    style,
    flag,
    titleStyle,
    URL
  } = props
  const header = headerText || (headerTx && translate(headerTx)) || ""
  const { cartStore } = useStores()
  const navigation = useNavigation()
  return (
    <View style={{ width: '100%', justifyContent: 'space-between' }}>
      <View style={[ROOT, style]}>
        {leftIcon && (
          <View style={{ left: 0 }}>
            <Button preset="link" onPress={onLeftPress}>
              <Icon icon={leftIcon} style={{ width: 25, height: 25 }} />
            </Button>
          </View>
        )}
        <View style={TITLE_MIDDLE}>
          {flag == true && <Image source={{ uri: URL }} style={{ width: 100, height: 35, alignSelf: 'center' }} />}
        </View>
        {rightIcon && (
          <View style={{ flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center' }}>
              <Ionicons name='search' size={25} color='#fff' onPress={() => navigation.navigate('search')} />
            </View>
            <View style={{ right: 0, height: 40, flexDirection: 'row' }}>
              <Ionicons name='cart-outline' size={40} color='#fff' style={{ position: 'absolute' }} onPress={onRightPress} />
              <View style={{ width: 20, height: 25, backgroundColor: 'black', marginLeft: 18 }}>
                <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'gold', alignSelf: 'center' }}>{cartStore.carts.length}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}
