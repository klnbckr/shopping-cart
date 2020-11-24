import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit {

  @Input("product") product: Product;
  @Output() added = new EventEmitter;

  public quantity: number;




  constructor() { }

  ngOnInit(): void {
    this.quantity = 1;
  }

  addItem() {
    if (this.quantity > this.product.Quantity) {
      this.quantity = this.product.Quantity;
    }
    else {
      this.added.emit({ "product": this.product, "quantity": this.quantity });
    }

  }

}
