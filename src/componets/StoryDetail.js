
import React,{useEffect,useState} from 'react';
import {getStory, getLocalData, getStoryIds} from '../services/hackerNewsApi';
import Share from "react-native-share";
import { StyleSheet, Text, View,ActivityIndicator,ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ProgressWebView from 'react-native-progress-webview';

import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as dayjs from 'dayjs';
import SavedStoriesClass from '../SavedStoriesClass';
import Icon from 'react-native-vector-icons/Ionicons';
import CommentsContainer from '../containers/CommentsContainer';
const Tab = createMaterialTopTabNavigator();





export const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('@localStoredStoriesArray', JSON.stringify(value))
        ToastAndroid.showWithGravityAndOffset(
            "Data Stored.",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );


    } catch (e) {
        ToastAndroid.showWithGravityAndOffset(
            "Error when stored data.",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );

    }
}
const StoryDetail =(props)=>{


    const [saved,setSaved] = useState(false);
    useEffect(() =>{


            getStoryIds("SavedStories").then(stories => { if(stories.indexOf(props.selectedStoryProps.id) !== -1) setSaved(true)});




    },[])
    const concatAndStore =(_stories)=>{
        SavedStoriesClass.myarray.push(props.selectedStoryProps.id)
        if(_stories !== null && _stories !== undefined ){
            if(Array.from(_stories).length !== 0 ){
                storeData(SavedStoriesClass.myarray.concat(Array.from(_stories)))
            }else{ storeData(SavedStoriesClass.myarray)}
        }else{ storeData(SavedStoriesClass.myarray)}

        SavedStoriesClass.myarray=[];
        setSaved(true)

    }
    function ArticleScreen(){
        return(

            <ProgressWebView
                source={{ uri: props.selectedStoryProps.url }}
               color={'#7CB342'}
            />

        )
    }
    function CommentScreen(){
        return(
           <CommentsContainer  kidsIDs={props.selectedStoryProps.kids}  />
        )
    }

    const alreadySavedButton =()=>{
        return(
            <Icon name="bookmark" size={20} color="#000" style={{marginEnd:10}} onPress={()=>

                ToastAndroid.showWithGravityAndOffset(
                    "Already Stored.",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                )} />
        )
    }
    const notSavedyetButton = ()=>{
        return(
            <Icon name="bookmark-outline" size={20} color="#000" style={{marginEnd:10}} onPress={()=>{
                getStoryIds("SavedStories").then(stories => concatAndStore(stories))

            }}  />
        )
    }
    const myCustomShare = async ()=>{
        const shareOptions = {
            message: props.selectedStoryProps.url
        }
        try {
            const ShareResponse = await Share.open(shareOptions);
        }catch (error){
            alert(error);
        }
    }
    return(
        <>
        <View style={styles.Text_StoryDetail}>
            <Text style={{color: '#000',fontSize:18}}>
                {props.selectedStoryProps.title}
            </Text>
            <Text style={styles.Texturl}>{(props.selectedStoryProps.url !== undefined) ? props.selectedStoryProps.url.split('/')[2].trim() : ''}</Text>
            <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                <Text style={{color: '#c62828', fontSize:14,flex:8,justifyContent:'flex-start'}}>{dayjs.unix(props.selectedStoryProps.time).fromNow(true)} -  {props.selectedStoryProps.by} </Text>
                {saved
                ? alreadySavedButton()
                : notSavedyetButton()
                }
                <Icon name="share-social" size={20} color="#000" style={{marginEnd:15}} onPress={myCustomShare}/>


            </View>

        </View>
        <NavigationContainer independent={true}>
            <Tab.Navigator tabBarOptions={{
                labelStyle: { fontSize: 12 },
                style: { backgroundColor: '#FFA827' },
                activeTintColor:'#000'
            }}>
                <Tab.Screen name="Article" component={ArticleScreen} />
                <Tab.Screen name="Comment" component={CommentScreen} />
        </Tab.Navigator>
        </NavigationContainer>

    </>

    );
}
const styles = StyleSheet.create(
    {

        ActivityIndicatorStyle:{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'

        },
        viewPager: {
            flex: 1,
        },
        Text_StoryDetail:{
             flexDirection:'column',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            backgroundColor: '#FFA827',
            padding:10
        },
        Texturl:{
            color:'#424242',
            fontStyle:'italic'
        },
        tabBarStyle:{
            backgroundColor: '#FFA827'
        }

    });

export default StoryDetail;
