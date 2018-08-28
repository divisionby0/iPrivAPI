class User{
    private username:string;
    private image:string;
    private description:string;
    
    constructor(username:string, image:string, description:string){
        this.username = username;
        this.image = image;
        this.description = description;
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
