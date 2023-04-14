// export interface Product {
//     id?:string;
//     code?:string;
//     name?:string;
//     description?:string;
//     price?:number;
//     quantity?:number;
//     inventoryStatus?:string;
//     category?:string;
//     image?:string;
//     rating?:number;
// }

export interface User {
    _id?:string;

    username?:string;
    email?:string;
    password?:string;
    //roles?: string[];   
    roles?: {
        name: string[];
                //name: ["admin","user","HrManager"];

    }[];  

}
