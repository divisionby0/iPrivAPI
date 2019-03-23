///<reference path="FollowersView.ts"/>
///<reference path="FollowingAccountListRenderer.ts"/>
class SelfFollowingView extends FollowersView{

    protected createRenderer(parentContainer:any, data:any):void{
        console.log("SelfFollowingView.create renderer");
        new FollowingAccountListRenderer(parentContainer, data);
    }
}
