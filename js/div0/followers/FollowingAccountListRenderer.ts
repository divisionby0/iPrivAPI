///<reference path="FollowerListRenderer.ts"/>
///<reference path="FollowingListRenderer.ts"/>
class FollowingAccountListRenderer extends FollowerListRenderer{
    protected createNameElement():any{
        var color:string = "red";
        if(this.data.isFollowingMe() == true){
            color = "green";
        }
        return this.j("<div class='col-md-4 followerListRendererText small'><a href='"+this.data.getUrl()+"' target='_blank' >"+this.data.getUsername()+"  <span style='color: "+color+";'><b>"+this.data.isFollowingMe()+"</b></span>"+"</a></div>");
    }
}
