module.exports = function Cart(cart) {
    this.items = cart.items || {};
    this.totalItems = cart.totalItems || 0;
    this.totalPrice = cart.totalPrice || 0;

    this.add = function(item, id) {
        var cartItem = this.items[id];
        // console.log(cartItem)
        if (!cartItem) {
            cartItem = this.items[id] = {item: item, quantity: 0, PRDPVP: (0).toFixed(2)};
            console.log(cartItem)
        }
        cartItem.quantity++;
        cartItem.PRDPVP = cartItem.item.PRDPVP * cartItem.quantity;
        cartItem.PRDPVP=(cartItem.PRDPVP).toFixed(2);

        this.totalItems++;
        this.totalPrice += cartItem.item.PRDPVP;
        console.log(this.totalPrice)
    };

    this.remove = function(id) {
        this.totalItems -= this.items[id].quantity;
        this.totalPrice -= this.items[id].PRDPVP;
        console.log(this.items[id])
        delete this.items[id];
        
    };
    this.removeALL = function() {
        this.items=[];
        console.log(this.items)
        
    };
    
    this.getItems = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};