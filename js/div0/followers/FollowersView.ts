///<reference path="FollowerListRenderer.ts"/>
class FollowersView{
    private parentContainer:any;
    private collection:any[];
    private j:any;

    constructor(parentContainer:any, collection:any[]){
        this.j = jQuery.noConflict();
        this.parentContainer = parentContainer;
        this.collection = collection;

        this.j("#totalSelfFollowersContainer").text("Total followers: "+collection.length);

        for(var i:number = 0; i<this.collection.length; i++){
            new FollowerListRenderer(this.parentContainer, this.collection[i]);
        }
    }
}
