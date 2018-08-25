class MassLikeService{
    private j:any;
    private server:string;
    private route:string = "/massLike";

    constructor(server:string){
        this.j = jQuery.noConflict();
        this.server = server;
    }

    public createRequest(collection:any[]):void{
        console.log("create request collection:",collection);
        this.j.ajax({
            type: "POST",
            url: this.server+this.route,
            data: {data:JSON.stringify(collection)},
            success: (response)=>this.onResponse(response),
            error:(error)=>this.onError(error),
            dataType: "json"
        });
    }

    private onResponse(response:any):void{
        console.log("MassLikeService onResponse:",response);
    }
    private onError(error:any):void{
        console.log("MassLikeService onError:",error);
    }
}
