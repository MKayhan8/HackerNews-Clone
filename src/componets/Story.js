import React, {useEffect, useState} from 'react';
import {getStory} from '../services/hackerNewsApi';
import Icon from 'react-native-vector-icons/Ionicons';
import relativeTime from 'dayjs/plugin/relativeTime';

import * as dayjs from 'dayjs';
dayjs.extend(relativeTime);
const myIcon = <Icon name="chatbox-ellipses" size={20} color="#d32f2f" />;
import {

    View,
    Text,
    StyleSheet, Linking,TouchableOpacity,TouchableHighlight,Alert


} from 'react-native';

// <Text style={{color: '#d32f2f',fontSize:11,marginStart:5}}>{(story.kids  !== undefined) ? story.kids.length :''}</Text>
const Story = (props) => {
    let [story, setStory] = useState({});


    useEffect(()=>{
        getStory(props.storyId).then( data => data && data.url && setStory(data))
    },[])

    var relativeTime= require('dayjs/plugin/relativeTime')


    return story && story.url ? (
        <TouchableOpacity activeOpacity={0.2} onPress={()=> props.navigation.navigate('Details',{
            selectedStory: story} )  } onLongPress={props.onLongPress}>
            <View style={styles.card}>
                <View style={styles.storyIndex}>
                    <Text style={{color: '#212121'}}>{props.index+1}</Text>
                    <Text style={{color: '#9e9e9e'}}>{story.score}p</Text>
                </View>
                <View style={styles.Textcontainer}>
                    <Text style={{color: '#000'}}>
                        {story.title}
                    </Text>
                    <Text style={styles.Texturl}>{(story.url !== undefined) ? story.url.split('/')[2].trim() : ''}</Text>
                    <View style={{flexDirection:'row',flex:1,justifyContent:'flex-end'}}>
                        <Text style={{color: '#9e9e9e', fontSize:14,flex:8,justifyContent:'flex-start'}}>{dayjs.unix(story.time).fromNow(true)} -  {story.by} </Text>
                        <View style={{marginEnd:40,flexDirection:'row',flex:2}}>
                            {myIcon}
                            <Text style={{color: '#d32f2f',fontSize:11,marginStart:5}}>{story.descendants}</Text>
                        </View>
                    </View>
                </View>

            </View>

        </TouchableOpacity>


    ): null;

}
const  styles = StyleSheet.create({
    card:{flexDirection: 'row',
            flex:1,
        borderRadius:30,
        marginBottom:1,
    },
    storyIndex:{
        flex:1.5,
        backgroundColor:'#ffb241',
        alignItems:'center',
        justifyContent: 'center',

    },
    Textcontainer:{
        flex:8,
      flexDirection:'column',
        justifyContent: 'space-around',
        backgroundColor: '#E0E0E0',
        padding:5,
    },
    Texturl:{
        color:'#9e9e9e',
        fontStyle:'italic'
    },


})

export default Story;
