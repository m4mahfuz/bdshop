const AMOUNT_TYPE_PERCENTAGE = 1;
// const AMOUNT_TYPE_FIXED = 2;
class Product {
    product = {};
    constructor(product) {
        if (Object.keys(product).length === 0) return;        
        this.product = product;
        // console.log('PC', this.product);
    }
    get id() {
        return this.product.id;
    }
    get name() {
        return this.product.name;
    }
    get image() {
        return this.product.featured_image?.name;
    }
    get price() {
        return Math.round(this.product.price);
    }
    get salePrice() {
        return Math.round(this.price - this.discountAmount);
    }
    get discountAmount() {
        if (this.product.discount.amount_type === AMOUNT_TYPE_PERCENTAGE) {
            return this.price*(this.product.discount.amount*0.01); 
        }
        return this.product.discount.amount;
    }
    get minimumSpending() {
        return this.product.discount.minimum_spending;
    }
    get discountLimit() {
        return this.product.discount.limit;      
    }    
    get productStock() {
        return this.product.inventory.quantity;
    }
    get discountRate() {    
        return this.product.discount.rate;
    }    
    isDiscountAvailable() {
        if (!this.isActiveDiscount()) return false;
        if (!this.isDiscountDateValid()) return false
        // console.log(getters.isDiscountDateValid)
        return true;           
    }
    isActiveDiscount() {
        return (this.product.discount.active === true) ? true : false;
    }
    isDiscountDateValid() {
        let today = new Date().toJSON().slice(0, 10);
        let from = new Date(this.product.discount.starting);
        let to = new Date(this.product.discount.ending);
        let check = new Date(today);        
        return (check >= from && check <= to ) ? true : false;
    }
    isMinimumSpendingAvailable() {
        return (this.minimumSpending !== null) ? true : false;
    }  
    isDiscountLimitAvailable() {
        return (this.discountLimit !== null) ? true : false;
    }  
    
}

export default Product;