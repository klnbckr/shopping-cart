import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { DataService } from 'src/app/services/data.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  public loading = true;
  public errorMsg: string;
  public successMsg: string;
  public products: Product[];

  public searchTerm: string;
  public pagination: number = 0;
  public nextpage: number;
  public previouspage: number;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {


    this.route.queryParams
      .subscribe(params => {
        this.searchTerm = params.q;
        this.pagination = parseInt(params.p);
        if (isNaN(this.pagination)) {
          this.pagination = 0;
        }
      });

    this.updateProducts();

    this.router.events.pipe(debounceTime(250)).subscribe((val) => {
      this.updateProducts();
    });
  }

  updateProducts() {
    this.dataService.getProducts(this.searchTerm, this.pagination)
      .subscribe((products: Product[]) => {
        this.products = products;
        this.loading = false;
      }, (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      })

  }

  addItem(ProductID: string, Quantity: number) {
    return this.dataService.addItem(ProductID, Quantity);
  }

  addEvent(event: any) {
    this.addItem(event.product.ProductID, event.quantity)
      .subscribe(
        data => { this.responseMessage(data[0].Status); }, (error) => { this.responseMessage(error.status); }
      );
  }

  responseMessage(status: number) {
    this.resetMessage();
    switch (status) {
      case 1: this.successMsg = "Neues Produkt wurde dem Korb hinzufügt!"; break;
      case 2: this.successMsg = "Warenkorb wurde aktualisiert!"; break;
      case 400: this.errorMsg = "Ungültige Menge"; break;
    }
  }
  resetMessage() {
    this.errorMsg = null;
    this.successMsg = null;
  }

}
