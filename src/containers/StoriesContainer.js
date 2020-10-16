
import {getStoryIds,RemoveFromAsyncStorage} from '../services/hackerNewsApi';
import Story from '../componets/Story';
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
import SavedStoriesClass from '../SavedStoriesClass';




const StoriesContainer = (props) => {

    const [storyIds, setStoryIds] = useState([]);
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(true)
    const renderFooter=()=>{
        if(!loading) return null;
        return(

            <View>
                <ActivityIndicator size={"large"} />
            </View>
        );
    }
    const deleteItemById = id =>{
        RemoveFromAsyncStorage(id).then(r => {
            const filteredData = storyIds.filter(item => item !== id);
            setStoryIds(filteredData);
        })

    }
    const alertDelete=(itemid)=>{

        if(props.storyType === "SavedStories"){
            Alert.alert(
                'Attention',
                'Dou you want to delete this story on Saved Stories?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    { text: 'Delete', onPress: () => deleteItemById(itemid) }
                ],
                { cancelable: true,
                    onDismiss: () => {}}
            )
        }






    }
    const renderItem = ({item, index})=>{

            return(
                <Story onLongPress={()=>alertDelete(item)} key={item} storyId={item} index={index} navigation={props.navigation} _storyType={props.storyType} data={storyIds}/>
            );

    }
    const onRefresh = ()=>{

            setRefreshing(true);
            getApiData()





    }; //for pull to refresh
    const getApiData = ()=>{
        getStoryIds(props.storyType).then( stories =>  {
            setStoryIds(stories)
            setRefreshing(false)
            setLoading(false)
        })

    }

    useEffect(() =>{

             getApiData()



    },[])
    return (
        <>
        <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#FFA827" translucent = {true}/>
        <FlatList
            ListFooterComponent={renderFooter}
        data={storyIds}
            key={"flat-list-key"}
        renderItem ={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        />
        </>
    );
};

const styles = StyleSheet.create({

});

export default StoriesContainer;
