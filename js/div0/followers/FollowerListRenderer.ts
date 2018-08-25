///<reference path="../../lib/events/EventBus.ts"/>
///<reference path="events/FollowerEvent.ts"/>
class FollowerListRenderer{
    private element:any;
    protected j:any;
    protected parentElement:any;

    private addToLikeCollectionButton:any;
    protected data:any;


    constructor(parentElement:any, data:any){
        this.j = jQuery.noConflict();
        this.data = data;
        this.parentElement = parentElement;
        var name:string = data.name;
        var image:string = data.image;
        var description = data.description;

        this.element = this.j("<div class='row'></div>");
        var nameElement = this.j("<div class='col-md-4'><a href='https://www.instagram.com/"+name+"/' target='_blank'>"+name+"</a></div>");
        var imageElement = this.j("<div class='col-md-2'><img src='"+image+"' style='width: 100%;'></div>");
        var descriptionElement = this.j("<div class='col-md-4'>"+description+"</div>");

        nameElement.appendTo(this.element);
        imageElement.appendTo(this.element);
        descriptionElement.appendTo(this.element);

        this.createChildren();

        this.element.appendTo(parentElement);

        this.createListeners();
    }

    protected createChildren():void{
        var addToLikeCollectionButtonContainer = this.j("<div class='col-md-2'></div>");
        this.addToLikeCollectionButton = this.j("<button id='addToLikeCollectionButton'>Like</button>");

        addToLikeCollectionButtonContainer.appendTo(this.element);
        this.addToLikeCollectionButton.appendTo(addToLikeCollectionButtonContainer);
    }

    protected createListeners():void {
        this.addToLikeCollectionButton.click(()=>this.onAddToLikeCollectionButtonClicked());
    }
    private onAddToLikeCollectionButtonClicked():void{
        EventBus.dispatchEvent(FollowerEvent.ADD_TO_LIKE_COLLECTION, this.data);
    }

    public destroy():void{

    }
}
