///<reference path="div0/followers/FollowersView.ts"/>
///<reference path="div0/like/LikeRequestCollectionListView.ts"/>
///<reference path="div0/like/service/MassLikeService.ts"/>
class MyApplication{
    private j:any;

    private server:string = "http://instagramprivateapi:3000";
    private loginRoute:string = "/instaLogin";
    private getFollowersRoute:string = "/getFollowers";
    private massLikeService:MassLikeService;

    private accountId:number = 0;

    constructor(){
        this.j = jQuery.noConflict();
        console.log("Im Application j=",this.j);

        this.massLikeService = new MassLikeService(this.server);

        var loginButton:any = this.j("#instaLoginButton");
        loginButton.click(()=>this.onLoginButtonClicked());

        EventBus.addEventListener(LikeEvent.MASS_LIKE_REQUEST, (data)=>this.onMassLikeRequest(data));
    }

    private onLoginButtonClicked():void{
        var loginInput = this.j("#userName");
        var passInput = this.j("#userPass");

        var login:string = loginInput.val();
        var pass:string = passInput.val();

        this.j.ajax({
            type: "POST",
            url: this.server+this.loginRoute,
            data: {login:login, pass:pass},
            success: (response)=>this.onInstaLoginResponse(response),
            error:(error)=>this.onInstaLoginError(error),
            dataType: "json"
        });
    }

    private onLoginComplete():void{
        var getFollowersButton = this.j("#getFollowersButton");
        getFollowersButton.show();
        getFollowersButton.click(()=>this.onGetSelfFollowersClicked());
    }

    private onGetSelfFollowersClicked():void {
        console.log("onGetSelfFollowersClicked this.accountId="+this.accountId);
        this.j.ajax({
            type: "POST",
            url: this.server+this.getFollowersRoute,
            data: {accountId:this.accountId},
            success: (response)=>this.onGetFollowersResponse(response),
            error:(error)=>this.onGetFollowersError(error),
            dataType: "json"
        });
    }

    private onGetFollowersResponse(response:any):void{
        console.log("onGetFollowersResponse:",response);
        new FollowersView(this.j("#selfFollowers"), response.data);
        new LikeRequestCollectionListView();
    }
    private onGetFollowersError(error:any):void{
        console.error("onGetFollowersError:",error);
    }

    private onInstaLoginResponse(response:any):void{
        console.log("login response:",response);
        var result:string = response.result;
        if(result == "loginComplete"){

            this.accountId = response.accountId;

            alert("Login to insta complete. Self id="+this.accountId);
            this.clearInstaLoginInputs();
            this.hideLoginContainer();
            this.onLoginComplete();
        }
        else{
            var errorText:string = response.error.message;
            this.clearInstaLoginInputs();
            alert(errorText);
        }
    }
    private onInstaLoginError(error):void{
        console.error("login error:",error);
        this.clearInstaLoginInputs();
    }

    private clearInstaLoginInputs():void{
        this.j("userName").val("");
        this.j("userPass").val("");
    }
    private hideLoginContainer():void{
        this.j("#loginContainer").hide();
    }

    private onMassLikeRequest(data:any[]):void {
        this.massLikeService.createRequest(data);
    }
}
