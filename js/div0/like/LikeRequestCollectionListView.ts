///<reference path="../../lib/events/EventBus.ts"/>
///<reference path="../followers/events/FollowerEvent.ts"/>
///<reference path="../followers/FollowerListRenderer.ts"/>
///<reference path="LikeListRenderer.ts"/>
///<reference path="../../lib/collections/Map.ts"/>
///<reference path="LikeEvent.ts"/>
class LikeRequestCollectionListView{
    private j:any;
    private element:any;
    private listContainer:any;
    private headerElement:any;
    private createMassLikeRequestButton:any;

    private collection:Map<any> = new Map<any>("colection");

    constructor(){
        this.j = jQuery.noConflict();
        this.element = this.j("#addToLikeContainer");
        this.listContainer = this.j("#addToLikeCollectionContainer");
        this.headerElement = this.j("#addToLikeCollectionListHeader");
        this.createMassLikeRequestButton = this.j("#createMassLikeRequestButton");
        this.onCollectionChanged();

        this.element.show();

        this.createMassLikeRequestButton.click(()=>this.onCreateMassLikeButtonClicked());

        EventBus.addEventListener(FollowerEvent.ADD_TO_LIKE_COLLECTION, (data)=>this.onAddToLikeCollectionRequest(data));

    }

    private onAddToLikeCollectionRequest(data:any):void{
        var name:string = data.name;
        if(!this.collection.has(name)){
            this.collection.add(data.name, data);
            new LikeListRenderer(this.listContainer, data);
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
        console.log("onCreateMassLikeButtonClicked collection:",data);
        EventBus.dispatchEvent(LikeEvent.MASS_LIKE_REQUEST, data);
    }

    private buildData():any[]{
        var data:any[] = [];
        var iterator:MapIterator = this.collection.getIterator();
        while(iterator.hasNext()){
            var item:any = iterator.next();
            var name:string = item.name;
            data.push(name);
        }
        return data;
    }
}
