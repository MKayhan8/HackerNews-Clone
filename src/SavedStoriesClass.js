class SavedStoriesClass {

    static myarray=[];
    constructor(story) {
        this.story = story

    }
    static addStorytoArray(inputtedStory){
        this.myarray.push(inputtedStory)
    }
    static getSavedStoriesArray(){

        return this.myarray
    }

}
//const savedStories = new SavedStories()
export default SavedStoriesClass;
