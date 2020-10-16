import React, {useEffect, useState} from 'react';
import {getComment} from '../services/hackerNewsApi';
import HTMLView from 'react-native-htmlview';
import relativeTime from 'dayjs/plugin/relativeTime';
import * as dayjs from 'dayjs';
dayjs.extend(relativeTime);

import {

    View,
    Text,
    StyleSheet,TouchableOpacity


} from 'react-native';

const Comment = (props) => {
    let [comment, setComment] = useState({});


    useEffect(()=>{
        getComment(props.commentId).then( data => data && data.text && setComment(data))
    },[])



    return comment  ? (

            <View style={styles.card}>
                <View style={styles.coloredView}></View>
                <View style={styles.textContainer}>
                    <Text style={styles.timeUserTextArea}>{dayjs.unix(comment.time).fromNow(true)} -  {comment.by} </Text>
                    <View style={styles.CommentTextArea}>
                        <HTMLView
                            value={comment.text}
                            stylesheet={styles}
                        />
                    </View>

                </View>
            </View>



    ): null;

}
const  styles = StyleSheet.create({
    coloredView:{
        borderTopLeftRadius:4,
        borderBottomLeftRadius:4,
        width:3,
        backgroundColor: '#AA00FF'
    },
    card:{flexDirection: 'row',
        flex:1,
        borderWidth:0.3,
        borderColor:'#e57373',
        borderRadius:4,
        marginHorizontal:8,
        marginVertical:3,
        backgroundColor:'#EEEEEE',
        elevation:4,
    },
    CommentTextArea:{
        flex:1,
        marginHorizontal:8,
        marginVertical:2,

        paddingHorizontal:8,
        paddingVertical:5
    },
    timeUserTextArea:{
        flex:1,
        paddingHorizontal:8,
        marginHorizontal:8,
        marginVertical:3,
        color:'#AA00FF',
        fontSize:13
    },
    a: {
        fontWeight: '300',
        color: '#ff1744', // make links coloured
    },


})

export default Comment;
