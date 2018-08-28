///<reference path="div0/followers/FollowersView.ts"/>
///<reference path="div0/like/LikeRequestCollectionListView.ts"/>
///<reference path="div0/like/service/MassLikeService.ts"/>
///<reference path="div0/followers/SelfFollowingView.ts"/>
///<reference path="div0/UsersParser.ts"/>
class MyApplication{
    private j:any;

    private server:string = "http://instagramprivateapi:3000";
    private loginRoute:string = "/instaLogin";
    private getFollowersRoute:string = "/getFollowers";
    private massLikeService:MassLikeService;

    private accountId:number = 0;

    private socketUrl:string = "http://instagramprivateapi:8080";
    private socket:any;
    
    private myFollowersCollection:any[];
    private imFollowingCollection:any[];
    
    constructor(){
        this.j = jQuery.noConflict();
        console.log("Im Application j=",this.j);

        this.createSocketConnection();
    }

    private createSocketConnection():void{
        this.socket = io(this.socketUrl);

        this.socket.on('connect', ()=>this.onSockedConnected());

        this.socket.on('message', (message)=>this.onSockedMessage(message));
        this.socket.on('event', (data)=>this.onSockedEvent(data));
        this.socket.on('disconnect', ()=>this.onSockedDisconnected());
    }

    private startApp():void{
        this.massLikeService = new MassLikeService(this.server);
        var loginButton:any = this.j("#instaLoginButton");
        loginButton.click(()=>this.onLoginButtonClicked());
        EventBus.addEventListener(LikeEvent.MASS_LIKE_REQUEST, (data)=>this.onMassLikeRequest(data));
    }

    private parseSocketMessage(message):void{
        console.log("parsing message ",message);
        var response = message.response;
        switch(response){
            case "loginError":
                var errorText = message.data.message;
                this.onInstaLoginError(errorText);
                break;
            case "loginComplete":
                this.onLoginComplete(message);
                break;
            case "onFollowingAccountsLoadComplete":
                this.onFollowingAccountsLoadComplete(message);
                break;
        }
    }
    
    private onLoginButtonClicked():void{
        var loginInput = this.j("#userName");
        var passInput = this.j("#userPass");

        var login:string = loginInput.val();
        var pass:string = passInput.val();

        this.socket.send({'message': {command:'login', login:login,password:pass}});
    }

    private onFollowingAccountsLoadComplete(data):void{
        var parser:UsersParser = new UsersParser(data.data);
        this.imFollowingCollection = parser.parse();
        new SelfFollowingView(this.j("#meFollowing"), this.imFollowingCollection);
        
        this.showNotMyFollowers();
    }
    
    private showNotMyFollowers():void{
        
    }
    
    private onLoginComplete(message:any):void{
        this.accountId = message.data;
        this.j("#selfNameContainer").html("<a target='_blank' href='https://instagram.com/"+message.name+"'>"+message.name+"</a>");
        this.j("#selfImageContainer").html("<img src='"+message.image+"'/>");

        alert("Login to insta complete. Self id="+this.accountId);
        this.clearInstaLoginInputs();
        this.hideLoginContainer();

        var getFollowersButton = this.j("#getFollowersButton");
        getFollowersButton.show();
        getFollowersButton.click(()=>this.onGetSelfFollowersClicked());

        var getFollowingCollectionButton = this.j("#getFollowingCollectionButton");
        getFollowingCollectionButton.show();
        getFollowingCollectionButton.click(()=>this.onGetFollowingCollectionClicked());
    }

    private onGetFollowingCollectionClicked():void{
        this.socket.send({'message': {command:'getFollowingCollection', id:this.accountId}});
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
        
        //this.myFollowersCollection = response.data;

        var parser:UsersParser = new UsersParser(response.data);
        this.myFollowersCollection = parser.parse();
        
        new FollowersView(this.j("#selfFollowers"), this.myFollowersCollection);
        new LikeRequestCollectionListView();
    }
    private onGetFollowersError(error:any):void{
        console.error("onGetFollowersError:",error);
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

    private onSockedConnected():void {
        console.log("socket connected");
        this.startApp();
    }

    private onSockedMessage(message:any):void {
        console.log("on message from server: ",message);
        this.parseSocketMessage(message);
    }

    private onSockedEvent(data:any):void {
        console.log("on event ",data);
    }

    private onSockedDisconnected():void {
        console.log("on disconnect");
    }
}
