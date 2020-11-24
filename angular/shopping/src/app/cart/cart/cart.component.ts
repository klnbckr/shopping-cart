import { Component, OnInit, Inject } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { DataService } from 'src/app/services/data.service';
import { CartItem } from 'src/app/models/CartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public loading = true;
  public errorMsg: string;
  public successMsg: string;
  public cartItems: CartItem[];



  public price: number;
  public vat: number;
  public pricetotal: number;
  public priceloading = true;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCartItems()
      .subscribe((cartItems: CartItem[]) => {
        this.cartItems = cartItems;
        this.loading = false;
        this.updatePrice();
      }, (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      })
  }

  changeQuantity(OrderID: any, Quantity: any) {
    return this.dataService.changeQuantity(OrderID, Quantity);
  }

  deleteItem(OrderID: any) {
    return this.dataService.deleteCartItem(OrderID);
  }

  changeEvent(event: any) {
    this.changeQuantity(event.OrderID, event.Quantity)
      .subscribe(
        data => { this.responseMessage(data[0].Status); this.updatePrice(); }, (error) => { this.responseMessage(error.status); }
      );
  }

  deleteEvent(event: any) {
    const inputValue = event.OrderID
    this.deleteItem(inputValue)
      .subscribe(
        data => { this.responseMessage(1); this.filterCartItems(inputValue); this.updatePrice(); }, (error) => { this.responseMessage(error.status); }
      );
  }

  filterCartItems(id: any): void {
    this.cartItems = this.cartItems.filter(({ OrderID }) => OrderID !== id);
  }

  responseMessage(status: number) {
    this.resetMessage();
    switch (status) {
      case 1: this.successMsg = "Produkt wurde entfernt!"; break;
      case 2: this.successMsg = "Menge wurde aktualisiert!"; break;
      case 400: this.errorMsg = "Ungültige Eingabe"; break;
    }
  }
  resetMessage() {
    this.errorMsg = null;
    this.successMsg = null;
  }

  updatePrice() {
    this.priceloading = true;
    let tprice = 0;
    let tvat = 0;
    this.cartItems.forEach(cartItem => {
      let value = cartItem.Price * cartItem.Quantity;
      tprice += value;
      tvat += value * cartItem.Vat;
    })
    this.price = tprice;
    this.vat = tvat;
    this.pricetotal = this.price + this.vat;
    this.priceloading = false;

  }


}

