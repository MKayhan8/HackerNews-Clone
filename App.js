

import React,{useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import StoriesContainer from './src/containers/StoriesContainer';
import StoryDetail from './src/componets/StoryDetail';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
    Button,
    Image
} from 'react-native';








const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const StackSaved = createStackNavigator();
const renderTopStories=({navigation})=>{
    return(
        <StoriesContainer navigation={navigation} storyType={"TopStories"}/>
    );
}
function TopStories({navigation}){

  return(
      <Stack.Navigator initialRouteName="renderTopStories">
          <Stack.Screen name={"renderTopStories"} component={renderTopStories}
                        options={{
                            title: 'Top Stories',
                            headerStyle: {
                                backgroundColor: '#FFA827',
                            },
                            headerTintColor: '#000',
                            headerTitleAlign:'center',
                            headerLeft:()=>( <Icon name="menu-outline" size={35} color="#000" style={{marginStart:10}} onPress={()=>navigation.toggleDrawer()} />),
                            gestureEnabled: true, // If you want to swipe back like iOS on Android
                            ...TransitionPresets.SlideFromRightIOS
                        }}
          />
          <Stack.Screen name={"Details"} component={DetailsScreen} options={{
              title: 'Details',
              headerStyle: {
                  backgroundColor: '#FFA827',
              },
              headerTintColor: '#000',
              headerTitleAlign:'center',
              gestureEnabled: true, // If you want to swipe back like iOS on Android
              ...TransitionPresets.SlideFromRightIOS


          }} />
      </Stack.Navigator>

  );
}
function DetailsScreen({route, navigation}) {
    const { selectedStory } = route.params;

    return(
      <StoryDetail  selectedStoryProps={selectedStory} />
    );
}
const renderNewStories=({navigation})=>{
    return(
        <StoriesContainer navigation={navigation} storyType={"NewStories"}/>
    );
}
function NewStories({navigation}) {

    return(
        <Stack.Navigator initialRouteName="renderNewStories">
            <Stack.Screen name={"renderNewStories"} component={renderNewStories}
                          options={{
                              title: 'New Stories',
                              headerStyle: {
                                  backgroundColor: '#FFA827',
                              },
                              headerTintColor: '#000',
                              headerTitleAlign:'center',
                              headerLeft:()=>( <Icon name="menu-outline" size={35} color="#000" style={{marginStart:10}} onPress={()=>navigation.toggleDrawer()} />),
                              gestureEnabled: true, // If you want to swipe back like iOS on Android
                              ...TransitionPresets.SlideFromRightIOS
                          }}
            />
            <Stack.Screen name={"Details"} component={DetailsScreen} options={{
                title: 'Details',
                headerStyle: {
                    backgroundColor: '#FFA827',
                },
                headerTintColor: '#000',
                headerTitleAlign:'center',
                gestureEnabled: true, // If you want to swipe back like iOS on Android
                ...TransitionPresets.SlideFromRightIOS


            }} />
        </Stack.Navigator>
    );

}

const renderSavedStories =({navigation})=>{
    return(
        <StoriesContainer navigation={navigation} storyType={"SavedStories"} />
    );
}
function SavedStories({navigation}) {


    return(
        <Stack.Navigator initialRouteName="renderSavedStories">
            <StackSaved.Screen name={"renderSavedStories"} component={renderSavedStories}
                          options={{
                              title: 'Saved Stories',
                              headerStyle: {
                                  backgroundColor: '#FFA827',
                              },
                              headerTintColor: '#000',
                              headerTitleAlign:'center',
                              headerLeft:()=>( <Icon name="menu-outline" size={35} color="#000" style={{marginStart:10}} onPress={()=>navigation.toggleDrawer()} />),
                                 ...TransitionPresets.SlideFromRightIOS

                          }

                          }
            />
            <StackSaved.Screen name={"Details"} component={DetailsScreen} options={{
                title: 'Details',
                headerStyle: {
                    backgroundColor: '#FFA827',
                },
                headerTintColor: '#000',
                headerTitleAlign:'center',



            }} />
        </Stack.Navigator>
    );

}
function AboutScreen({navigation}) {

    return(
        <View style={{justifyContent:'center',flex:1,alignItems:'center'}}><Text>AboutScreen</Text></View>

    )

}


const CustomDrawerContent = (props) => {
    return(
        <View style={{flex:1,backgroundColor:'#FFA827'}}>
            <DrawerContentScrollView {...props} style={{flex:1}}>
                <View style={{flex:2,justifyContent:'center',alignItems:'center',marginVertical:30}}>

                    <Text style={{fontStyle:'normal',color:'#000',fontSize:25}}>Hacker News Clone</Text>
                    <Text style={{fontStyle:'italic',color:'#000'}}>on development process</Text>
                </View>
                <View style={{borderBottomColor: 'black', borderBottomWidth: 0.4}}/>
               <View style={{flex:8,justifyContent:'center',flexDirection:'column'}}>
                   <DrawerItem label={"Top Stories"} inactiveTintColor={'#000'}  activeBackgroundColor={'#FFC107'} onPress={()=>props.navigation.navigate("Top Stories")}
                   icon={()=><Icon name="trending-up" size={20} color="#000"/>}
                   />
                   <DrawerItem label={"New Stories"} inactiveTintColor={'#000'} activeBackgroundColor={'#FFC107'} onPress={()=>props.navigation.navigate("New Stories")}
                   icon={()=> <Icon name="earth" size={20} color="#000" />}/>
                   <DrawerItem label={"Saved Stories"} inactiveTintColor={'#000'} activeBackgroundColor={'#FFC107'} onPress={()=>props.navigation.navigate("Saved Stories")}
                               icon={()=> <Icon name="bookmark" size={20} color="#000" />}/>

                   <DrawerItem label={"About"} inactiveTintColor={'#000'} activeBackgroundColor={'#FFC107'} onPress={()=>props.navigation.navigate("About")}
                               icon={()=> <Icon name="apps" size={20} color="#000"/>}/>
               </View>
            </DrawerContentScrollView>

        </View>

    )
}
const App = () => {

    const [splash, setSplash] = useState(true);
    const [initRender, setInitRender] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setSplash(false);
            setInitRender(false);
        }, 1750);



    }, [initRender])

    return splash ?
        (<View style={styles.container}>
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#FFA827" translucent = {true}/>
            <Text style={{fontStyle:'normal',color:'#000',fontSize:30}}>Hacker News Clone</Text>
            <Text style={{fontStyle:'italic',color:'#000'}}>on development process</Text>
        </View>) : (
            <NavigationContainer>
                <Drawer.Navigator  initialRouteName={"Top Stories"}   drawerStyle={{ width: initRender ? null : "80%" }} drawerContent={props =><CustomDrawerContent {...props}/>}>
                    <Drawer.Screen name="Top Stories" component={TopStories} options={{unmountOnBlur:true}}/>
                    <Drawer.Screen name="New Stories" component={NewStories} options={{unmountOnBlur:true}} />
                    <Drawer.Screen name="Saved Stories" component={SavedStories}  options={{unmountOnBlur:true}}/>
                    <Drawer.Screen name="About" component={AboutScreen} />
                </Drawer.Navigator>


            </NavigationContainer>
        );





}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFA827'
    }

});

export  default App;
