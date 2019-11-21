module.exports = function Cart(cart) {
    this.items = cart.items || {};
    this.totalItems = cart.totalItems || 0;
    this.totalPrice = cart.totalPrice || 0;

    this.add = function(item, id) {
        var cartItem = this.items[id];
        // console.log(cartItem)
        if (!cartItem) {
            cartItem = this.items[id] = {item: item, quantity: 0, PRDPVP: 0};
            console.log(cartItem)
        }
        cartItem.quantity++;
        cartItem.PRDPVP = cartItem.item.PRDPVP * cartItem.quantity;
        this.totalItems++;
        this.totalPrice += cartItem.item.price;
        console.log(cartItem)
    };

    this.remove = function(id) {
        this.totalItems -= this.items[id].quantity;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };
    
    this.getItems = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};