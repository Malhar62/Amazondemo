import React from "react"
import { observer } from "mobx-react-lite"
import { View, ImageBackground } from "react-native"
import { Header } from "../../components"
import { useNavigation, useRoute } from "@react-navigation/native"
import YoutubePlayer from 'react-native-youtube-iframe';


export const FormScreen = observer(function FormScreen() {
  // Pull in one of our MST stores

  //const { characterStore } = useStores()
  const navigation = useNavigation()
  const route = useRoute<any>()
  const id = route.params.id;
  const index = route.params.index
  const title = route.params.title
  const name = route.params.name
  const URL1 = route.params.URL
  const ICON = route.params.icon
  return (
    <ImageBackground source={require('../demo/mainback.png')} style={{ flex: 1 }}>
      <Header
        headerText={'VIDEO EXPLAINATION'}
        leftIcon={'back'}
        onLeftPress={() => navigation.navigate('third', { id, title, index, name, icon: ICON })}
      />
      <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
        <YoutubePlayer
          width={300}
          height={180}
          play={false}
          videoId={URL1}
        />
      </View>
    </ImageBackground>
  )
})
