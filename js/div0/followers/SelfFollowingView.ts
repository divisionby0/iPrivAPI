///<reference path="FollowersView.ts"/>
///<reference path="FollowingAccountListRenderer.ts"/>
class SelfFollowingView extends FollowersView{
    protected createRenderer(parentContainer:any, data:any):void{
        new FollowingAccountListRenderer(parentContainer, data);
    }
}
