Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            imgCart: 'img/productCart.jpg',
            showCart: false
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {

        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }
        },
        remove(item) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
        calculateCart() {
            let cartPrice = 0;
            let cart = this.cartItems[1];
            cart.forEach(el => cartPrice += el.quantity * el.price)
            return cartPrice;
        },
    },
    template: `<div>
<button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
        <div class="cart-block" v-show="showCart">
        <p v-if="!cartItems.length">Cart is empty!</p>
            <cart-item v-for="item of cartItems" :key="item.id_product" :img="imgCart" :cart-item="item" @remove="remove">
            </cart-item>    
        </div>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some img">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Кол-во: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">Цена: {{ cartItem.price }}&#36</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="product-price">Итого: {{cartItem.quantity*cartItem.price}}&#36</div>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
})