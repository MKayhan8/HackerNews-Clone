import React,{useEffect,useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList, AsyncStorage, ActivityIndicator, Alert,

} from 'react-native';
import {getStoryIds} from '../services/hackerNewsApi';
import Story from '../componets/Story';
import Comment from '../componets/Comment';

const CommentsContainer = (props) =>{
    const [commentIds, setCommentIds] = useState(props.kidsIDs);


    const renderItem = ({item, index})=>{

        return(
            <Comment  key={item} commentId={item} index={index}  />

        );

    }

    return(

        <>
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#FFA827" translucent = {true}/>
            <FlatList

                data={commentIds}
                key={"flat-list-comment-key"}
                renderItem ={renderItem}
                keyExtractor={(item) => item.id}

            />
        </>
    )

}

export  default CommentsContainer;
