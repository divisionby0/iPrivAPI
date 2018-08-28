///<reference path="../../lib/events/EventBus.ts"/>
///<reference path="events/FollowerEvent.ts"/>
///<reference path="../User.ts"/>
class FollowerListRenderer{
    private element:any;
    protected j:any;
    protected parentElement:any;

    private addToLikeCollectionButton:any;
    protected data:User;


    constructor(parentElement:any, user:User){
        this.j = jQuery.noConflict();
        this.data = user;
        this.parentElement = parentElement;
        var name:string = user.getUsername();
        var image:string = user.getImage();
        var description = user.getDescription();
        var url = user.getUrl();

        this.element = this.j("<div class='row followerListRenderer'></div>");
        var nameElement = this.j("<div class='col-md-4 followerListRendererText small'><a href='"+url+"' target='_blank' >"+name+"</a></div>");
        var imageElement = this.j("<div class='col-md-2'><img src='"+image+"' style='width: 100%;'></div>");
        var descriptionElement = this.j("<div class='col-md-4 small followerListRendererText'>"+description+"</div>");

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
