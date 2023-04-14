import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from './product';

@Injectable()
export class ProductService {

    //status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

    roles: string[] = ['Admin', 'HrManager', 'User Standard'];

    productNames: string[] = [
        "aaaaaaaaaaaaaa",
        "Black aaaaaaaaaaaaaa",
        "Blue aaaaaaaaaaaaaa",

    ];
    emails: string[] = [
        "aaaaaaaaaaaaaa",
        "Black aaaaaaaaaaaaaa",
        "Blue aaaaaaaaaaaaaa",

    ];

    constructor(private http: HttpClient) { }

    getProductsSmall() {
        return this.http.get<any>('assets/products-small.json')
        .toPromise()
        .then(res => <Product[]>res.data)
        .then(data => { return data; });
    }

    getProducts() {
        return this.http.get<any>('assets/product.json')
        .toPromise()
        .then(res => <Product[]>res.data)
        .then(data => { return data; });
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/products-orders-small.json')
        .toPromise()
        .then(res => <Product[]>res.data)
        .then(data => { return data; });
    }

    generatePrduct(): Product {
        const product: Product =  {
            id: this.generateId(),
            name: this.generateName(),
            description: "Product Description",
            price: this.generatePrice(),
           //// quantity: this.generateQuantity(),
           // category: "Product Category",
           // inventoryStatus: this.generateStatus(),
            //rating: this.generateRating()
        };

        //product.image = product.name.toLocaleLowerCase().split(/[ ,]+/).join('-')+".jpg";;
        return product;
    }

    generateId() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    generateName() {
        return this.productNames[Math.floor(Math.random() * Math.floor(30))];
    }

    generatePrice() {
       return this.roles[Math.floor(Math.random() * Math.floor(3))];
}

    generateQuantity() {
        return Math.floor(Math.random() * Math.floor(75)+1);
    }

    // generateStatus() {
    //     return this.status[Math.floor(Math.random() * Math.floor(3))];
    // }

    generateRating() {
        return Math.floor(Math.random() * Math.floor(5)+1);
    }
}
