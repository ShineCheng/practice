<template>
    <ul>
        <li v-for="(item, index) in products" :key="index + 1">
        {{ item.name }} - {{ item.price | currency }} x {{ item.inStock }}
        <br>
        <button v-on:click="addToCart(item)" :disabled="item.inStock === 0">Add to cart</button>
        </li>
    </ul>
</template>

<script>

    export default {
        computed: {
            products() {
                return this.$store.state.products.products
            }
        },
        methods: {
            addToCart(item) {
                this.$store.commit('addToCart', { item: item })
            }
        }
    }
</script>
