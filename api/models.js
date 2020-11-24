class Product {
    constructor(Id, Title, Describtion, Imagepath, Quantity, Price, Vat) {
        this.ProductID = Id;
        this.Title = Title;
        this.Quantity = Quantity;
        this.Describtion = Describtion;
        this.Imagepath = Imagepath;
        this.Quantity = Quantity;
        this.Price = Price;
        this.Vat = Vat;
    }
}

class Order {
    constructor(Id, ProductID, Quantity, CartID) {
        this.Id = Id;
        this.ProductID = ProductID;
        this.Quantity = Quantity;
        this.CartID = CartID;
    }
}

module.exports = {
    Product: Product,
    Order: Order
}