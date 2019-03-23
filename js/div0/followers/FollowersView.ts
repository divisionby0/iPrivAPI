///<reference path="FollowerListRenderer.ts"/>
///<reference path="../User.ts"/>
class FollowersView{
    protected parentContainer:any;
    protected collection:any[];
    protected j:any;

    constructor(parentContainer:any, collection:User[]){
        this.j = jQuery.noConflict();
        this.parentContainer = parentContainer;
        this.collection = collection;

        this.showCount();

        for(var i:number = 0; i<this.collection.length; i++){
            this.createRenderer(this.parentContainer, this.collection[i]);
        }
    }
    protected showCount():void{
        this.j("#totalFollowingContainer").text("Total followers: "+this.collection.length);
    }
    
    protected createRenderer(parentContainer:any, data:User):void{
        new FollowerListRenderer(parentContainer, data);
    }
}
