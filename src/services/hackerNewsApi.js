import axios from 'axios';
import SavedStoriesClass from '../SavedStoriesClass';
import AsyncStorage from '@react-native-community/async-storage';
import {ToastAndroid} from 'react-native';

export const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
export const topStoriesUrl = baseUrl + 'topstories.json?print=pretty&orderBy="$key"&limitToFirst=75';
export const newStoriesUrl = baseUrl + 'newstories.json?print=pretty&orderBy="$key"&limitToFirst=75';
export const storyUrl = baseUrl + 'item/';
export const getStoryIds = async (storyType) =>{

    if(storyType === "TopStories"){
        const result = await axios.get(topStoriesUrl).then( ({data}) => data);
        return result;
    }
    if(storyType =="NewStories"){
        const result = await axios.get(newStoriesUrl).then( ({data}) => data);
        return result;
    }
    if(storyType ==="SavedStories"){
        try {
            const value = await AsyncStorage.getItem('@localStoredStoriesArray')
            if(value !== null && value !== undefined) {
                return  JSON.parse(value)
            }

        } catch(e) {
            alert("Error reading the localStoredStoriesArray")
        }
    }

}
export const RemoveFromAsyncStorage = async (id) => {
    try {
        const value = await AsyncStorage.getItem('@localStoredStoriesArray')
        if(value !== null && value !== undefined) {
            const filteredData = JSON.parse(value).filter(item => item !== id);
            try {
                await AsyncStorage.setItem('@localStoredStoriesArray', JSON.stringify(filteredData))
                ToastAndroid.showWithGravityAndOffset(
                    "Data removed",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );


            } catch (e) {
                ToastAndroid.showWithGravityAndOffset(
                    "Error when removing data.",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );

            }
        }

    } catch(e) {
        alert("Error reading the localStoredStoriesArray")
    }

}


export const getComment = async (commentId)=>{
    const result = await  axios.get(storyUrl+commentId.toString()+'.json').then( ({data}) => data)
    return result
}
export  const getStory = async (storyId) =>{
    const result = await  axios.get(storyUrl+storyId.toString()+'.json').then( ({data}) => data)
        return result
}


