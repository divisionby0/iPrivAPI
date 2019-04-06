///<reference path="../../lib/events/EventBus.ts"/>
///<reference path="../followers/events/FollowerEvent.ts"/>
///<reference path="../followers/FollowerListRenderer.ts"/>
///<reference path="LikeListRenderer.ts"/>
///<reference path="../../lib/collections/Map.ts"/>
///<reference path="LikeEvent.ts"/>
///<reference path="../User.ts"/>
class LikeRequestCollectionListView{
    private j:any;
    private element:any;
    private listContainer:any;
    private headerElement:any;
    private createMassLikeRequestButton:any;
    private createMassLikeFromStringRequestButton:any;

    private collection:Map<User> = new Map<User>("colection");

    constructor(){
        this.j = jQuery.noConflict();
        this.element = this.j("#addToLikeContainer");
        this.listContainer = this.j("#addToLikeCollectionContainer");
        this.headerElement = this.j("#addToLikeCollectionListHeader");
        this.createMassLikeRequestButton = this.j("#createMassLikeRequestButton");
        this.createMassLikeFromStringRequestButton = this.j("#createMassLikeFromStringRequestButton");
        this.onCollectionChanged();

        this.element.show();

        this.createMassLikeRequestButton.click(()=>this.onCreateMassLikeButtonClicked());
        this.createMassLikeFromStringRequestButton.click(()=>this.createMassLikeFromStringButtonClicked());

        EventBus.addEventListener(FollowerEvent.ADD_TO_LIKE_COLLECTION, (data)=>this.onAddToLikeCollectionRequest(data));
    }

    private onAddToLikeCollectionRequest(user:User):void{
        var name:string = user.getUsername();
        if(!this.collection.has(name)){
            this.collection.add(name, user);
            new LikeListRenderer(this.listContainer, user);
            this.onCollectionChanged();
        }
    }

    private onCollectionChanged():void {
        var size:number = this.collection.size();
        this.headerElement.text("Total to like: "+size);
        if(size > 0){
            this.createMassLikeRequestButton.show();
        }
        else{
            this.createMassLikeRequestButton.hide();
        }
    }

    private onCreateMassLikeButtonClicked():void {
        var data:any[] = this.buildData();
        //console.log("onCreateMassLikeButtonClicked collection:",data);
        EventBus.dispatchEvent(LikeEvent.MASS_LIKE_REQUEST, data);
    }
    private createMassLikeFromStringButtonClicked():void{
        var userData:string = this.j("#followersToLikeInput").val();

        var data:string[] = userData.split(",");
        console.log("data:",data);
        data = data.reverse();
        EventBus.dispatchEvent(LikeEvent.MASS_LIKE_REQUEST, data);
    }

    private buildData():string[]{
        var data:string[] = [];
        var iterator:MapIterator = this.collection.getIterator();
        while(iterator.hasNext()){
            var item:User = iterator.next();
            var name:string = item.getUsername();
            data.push(name);
        }
        return data;
    }
}
