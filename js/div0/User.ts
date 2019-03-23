class User{
    private username:string;
    private image:string;
    private description:string;
    private _isFollowingMe:boolean = false; 
    
    constructor(username:string, image:string, description:string, isFollowingMe:boolean = false){
        this.username = username;
        this.image = image;
        this.description = description;
        this._isFollowingMe = isFollowingMe;
    }
    
    public isFollowingMe():boolean{
        return this._isFollowingMe;
    }
    public setIsFollowingMe(value:boolean):void{
        this._isFollowingMe = value;
    }
    
    public getUsername():string{
        return this.username;
    }
    public getImage():string{
        return this.image;
    }
    public getDescription():string{
        return this.description;
    }
    public getUrl():string{
        return "https://instagram.com/"+this.username+"/";
    }
}
