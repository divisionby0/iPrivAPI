///<reference path="FollowerListRenderer.ts"/>
class FollowingListRenderer extends FollowerListRenderer{
    protected createNameElement():any{
        return this.j("<div class='col-md-4 followerListRendererText small'><a href='"+this.data.getUrl()+"' target='_blank' >"+this.data.getUsername()+"  <span style='color: #1c7430;'><b>"+this.data.isFollowingMe()+"</b></span>"+"</a></div>");
    }
}
