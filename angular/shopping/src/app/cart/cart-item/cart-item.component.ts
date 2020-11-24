import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from 'src/app/models/CartItem';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input('cartItem') cartItem: CartItem;
  @Output() changed = new EventEmitter;
  @Output() deleted = new EventEmitter;


  constructor() { }

  ngOnInit(): void {
  }

  changeQuantity(event) {
    const inputValue = event.target.value;
    if (inputValue > this.cartItem.MaxQuantity || inputValue <= 0) {
      event.target.value = this.cartItem.Quantity;
    }
    else {
      this.cartItem.Quantity = inputValue;
      this.changed.emit({ "OrderID": this.cartItem.OrderID, "Quantity": this.cartItem.Quantity })
    }
  }

  deleteItem(event) {
    this.deleted.emit({ "OrderID": this.cartItem.OrderID });
  }

}
