<template>
    <div class="cart">
        <h2>Your Cart</h2>
        <p v-if="productsInCart.length === 0">
        <i>Please add some products to cart.</i>
        </p>
        <ul v-else>
            <li v-for="(item, index) in productsInCart" :key="index + 1">
                {{ products.find(item2 => item2.pId === item.pId).name }} - {{ products.find(item2 => item2.pId === item.pId).price | currency }} x {{ item.amount }}
                <br>
                <button v-on:click="removeFromCart(item)">remove from cart</button>
            </li>
        </ul>
        <p>Total: {{ this.$store.getters.total | currency }}</p>
        <p>
        <button v-on:click="checkout" :disabled="productsInCart.length === 0">Checkout</button>
        </p>
        <p v-if="checkoutStatus">Checkout {{ checkoutStatus }}</p>
    </div>
</template>

<script>
    export default {
        computed: {
            products() {
                return this.$store.state.products.products
            },
            productsInCart() {
                return this.$store.state.cart.productsInCart
            },
            checkoutStatus() {
                return this.$store.state.cart.checkoutStatus
            }
        },
        methods: {
            removeFromCart(item) {
                this.$store.commit('removeFromCart', { item: item })
            },
            checkout(item) {
                this.$store.dispatch('checkout')
            }
        }
    }
</script>
