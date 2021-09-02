/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { FormScreen, ThirdScreen, SecondScreen, FirstScreen, HistoryScreen, HomeScreen, ItemScreen, ItemDetailScreen, CartScreen, FavouriteScreen, WelcomeScreen, OfferScreen, OfferDetailScreen, OrderScreen, AddressScreen, ConfirmScreen, SearchScreen, UserInfoScreen, VisitedScreen, SelectAddressScreen, FeedbackScreen } from "../screens"
import { FlatList, View, Text, TouchableOpacity, Dimensions, Image, Switch } from "react-native"
import { DrawerActions, useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import { useEffect } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { AddCard } from "../screens/confirm/AddCard"
import Rated from "../screens/item/Rated"
import { HEIGHT, WIDTH } from '../theme/scale'
import Main from "../screens/ChatScreens/main"
/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
//const HEIGHT = Dimensions.get('window').height;

export type PrimaryParamList = {
  welcome: undefined
  //demo: undefined
  //demoList: undefined
  //list: undefined
  //form: undefined
  first: undefined
  second: undefined
  third: undefined
  form: undefined
  history: undefined
  dashboard: undefined
  profile: undefined
  home: undefined
  itemlist: undefined
  itemdetail: undefined
  cart: undefined
  favourite: undefined
  offer: undefined
  offerdetail: undefined
  order: undefined
  address: undefined
  search: undefined
  confirm1: undefined
  confirm: undefined
  userinfo: undefined
  visit: undefined
  select: undefined
  addcard: undefined
  feedback: undefined
  rated: undefined
  chat: undefined
}

// Documentation: https://reactnavigation.org/docs/Drawer-navigator/
const Drawer = createDrawerNavigator<PrimaryParamList>()
const Tab = createBottomTabNavigator<PrimaryParamList>()
const Stack = createStackNavigator<PrimaryParamList>()
export function MainNavigator() {
  const navigation = useNavigation()
  const { cartStore, shoppingStore } = useStores()
  let DATA = [
    { name: 'HOME', path: 'home' },
    { name: 'SHOP BY CATEGORY', path: 'welcome' },
    { name: 'TOP OFFERS', path: 'offer' },
    { name: 'YOUR CART', path: 'cart' },
    { name: 'YOUR ORDERS', path: 'order' },
    { name: 'TOP RATED', path: 'rated' },
    { name: 'MY FAVOURITES', path: 'favourite' },
    { name: 'MESSAGES', path: 'chat' }
  ]
  function ShoppingDrawer() {
    useEffect(() => {
      shoppingStore.getShop()
    })
    const [isEnabled, setIsEnabled] = React.useState(shoppingStore.dark);
    const [more, setMore] = React.useState<boolean>()
    const toggleSwitch = () => {
      setIsEnabled(previousState => !previousState);
      shoppingStore.setTheme(!isEnabled)
      //navigation.dispatch(DrawerActions.Drawer())
    }
    return (
      <View style={{ height: '100%' }}>
        <View style={{ alignSelf: 'center' }}>
          <Image source={{ uri: 'https://purepng.com/public/uploads/large/amazon-logo-s3f.png' }} style={{ width: 180, height: 100 }} />
          <Text style={{ fontSize: 20 }}>Welcome To Amazon</Text>
        </View>
        <FlatList
          data={DATA}
          renderItem={({ item, index }) => (
            <View style={{ width: WIDTH(278), height: (item.name == 'TOP RATED' && more) ? 180 : 60, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f1f1f1', justifyContent: 'center' }}>
              <View style={{ flexDirection: (item.name == 'TOP RATED' && more) ? 'column' : 'row' }}>
                <TouchableOpacity onPress={() => {
                  if (item.name == 'TOP RATED') {
                    setMore(!more)
                  } else {
                    navigation.navigate(item.path)
                  }
                }}>
                  <Text style={{ fontSize: 20, alignSelf: 'center' }}>{item.name}</Text>
                </TouchableOpacity>
                {more && item.name == 'TOP RATED' &&
                  <View style={{ height: 100, width: 200 }}>
                    <FlatList
                      data={shoppingStore.categories}
                      renderItem={({ item, index }) => (
                        <View style={{ alignSelf: 'center', marginTop: 7 }}>
                          <TouchableOpacity onPress={() => navigation.navigate('rated', { NAME: item })}>
                            <Text style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>{item}</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                      keyExtractor={item => item}
                    />
                  </View>
                }
                <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: item.path == 'favourite' ? 'pink' : (item.path == 'cart' ? 'pink' : '#fff') }}>
                  <Text style={{ fontSize: 20 }}>{item.path == 'favourite' ? cartStore.favs.length : (item.path == 'cart' ? cartStore.carts.length : '')}</Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.name}
        />
        <View style={{ flexDirection: 'row', bottom: 10, left: 10 }}>
          <Switch
            trackColor={{ false: "#cae0d0", true: "#cae0d0" }}
            thumbColor={shoppingStore.dark ? "blue" : "grey"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={{ fontSize: 20 }}>Dark Theme</Text>
        </View>
      </View>
    )
  }
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props: any) => <ShoppingDrawer {...props} />}>
      <Drawer.Screen name='home' component={HomeScreen} />
      <Drawer.Screen name='itemlist' component={ItemScreen} />
      <Drawer.Screen name='itemdetail' component={ItemDetailScreen} />
      <Drawer.Screen name='cart' component={CartScreen} />
      <Drawer.Screen name='welcome' component={WelcomeScreen} />
      <Drawer.Screen name='favourite' component={FavouriteScreen} />
      <Drawer.Screen name='offer' component={OfferScreen} />
      <Drawer.Screen name='offerdetail' component={OfferDetailScreen} />
      <Drawer.Screen name='order' component={OrderScreen} />
      <Drawer.Screen name='address' component={AddressScreen} />
      <Drawer.Screen name='confirm1' component={Confirm} />
      <Drawer.Screen name='search' component={SearchScreen} />
      <Drawer.Screen name='userinfo' component={UserInfoScreen} />
      <Drawer.Screen name='visit' component={VisitedScreen} />
      <Drawer.Screen name='select' component={SelectAddressScreen} />
      <Drawer.Screen name='feedback' component={FeedbackScreen} />
      <Drawer.Screen name='rated' component={Rated} />
      <Drawer.Screen name='chat' component={Main} />
    </Drawer.Navigator>
    ///  below is BOXING app navigator
    /*<Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen name="dashboard" component={DashBoardScreen} />
      <Tab.Screen name="profile" component={HistoryScreen} />
    </Tab.Navigator>*/
  )
}
function Confirm() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name='confirm' component={ConfirmScreen} />
      <Stack.Screen name='addcard' component={AddCard} />
    </Stack.Navigator>
  )
}
function MyTabBar({ state, navigation }) {
  const { index, routes } = navigation.dangerouslyGetState();
  const currentRoute = routes[index].name;
  console.log('current screen', currentRoute);
  return (
    <View>
      <View
        style={{
          height: 90,
          width: '100%',
          bottom: 0,
          position: 'absolute',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {state.routes.map((route, index) => {
            //const isFocused = state.index === index;

            const onPress = () => {
              navigation.navigate(route.name);
            };

            return (
              <View key={index}>
                {currentRoute == route.name && (
                  <View
                    style={{
                      width: 0,
                      height: 0,
                      backgroundColor: 'transparent',
                      borderStyle: 'solid',
                      borderLeftWidth: 100,
                      borderRightWidth: 105,
                      borderBottomWidth: 40,
                      borderLeftColor: 'transparent',
                      borderRightColor: 'transparent',
                      borderBottomColor: 'red',
                    }}></View>
                )}
                <TouchableOpacity
                  onPress={() => {
                    onPress();
                  }}>
                  <View
                    style={{
                      height: 50,
                      width: '50%',
                      marginTop: currentRoute == route.name ? 0 : 40,
                      backgroundColor: currentRoute == route.name ? 'red' : 'yellow',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{ fontSize: 15, color: "#fff" }}>{route.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
function DashBoardScreen() {
  const { characterStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  useEffect(() => {
    characterStore.getData(0)
  }, [])
  function CustomDrawerContent() {

    return (
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ height: 200 }}>
          <TouchableOpacity
            onPress={() => {
              characterStore.activePath('DASHBOARD')
              navigation.navigate('first')
            }}
          ><Text style={{ color: characterStore.path == 'DASHBOARD' ? 'gold' : '#fff', fontSize: 20 }}>{'DASHBOARD'}</Text></TouchableOpacity>
          <FlatList
            data={characterStore.users}
            renderItem={({ item, index }) => (
              <View style={{ marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('second', { id: item.id, name: item.name })}
                ><Text style={{ color: characterStore.path == item.name ? 'gold' : '#fff', fontSize: 20 }}>{item.name}</Text></TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('profile')}
          ><Text style={{ color: '#fff', fontSize: 20 }}>{'HISTORY'}</Text></TouchableOpacity>

        </View>
      </View>
    )
  }
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name='first' component={FirstScreen} />
      <Drawer.Screen name='second' component={SecondScreen} />
      <Drawer.Screen name='third' component={ThirdScreen} />
      <Drawer.Screen name='form' component={FormScreen} />
    </Drawer.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
