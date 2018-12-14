<template>
  <main class="capsule">
    <app-masthead/>
    <div class="contain">
        <div v-if="item">
            <h1>{{item.name}}</h1>
            <img :src="item.image_url" :alt="item.name">
            <p>{{item.description}}</p>
            <p>{{item.price}}</p>
        </div>
    </div>
  </main>
</template>

<script>
import AppMasthead from './../../components/AppMasthead.vue';
import axios from 'axios';

export default {
  components: {
    AppMasthead,
  },
  data(){
    return {
        item: null
    }
  },
  mounted () {
    this.$nextTick(function () {
        this.getProduct();
    })
  },
  methods: {
      getProduct: function() {
           let vm = this;
           axios.get('http://nit.tron.net.ua/api/product/' + this.$route.params.id)
           .then(function (response) {
               vm.item = response.data;
           });
      }
  }
};
</script>

<style>
/* no grid support */
aside {
  float: left;
  width: 19.1489%;
}

img {
    width: 400px;
}

.content {
  /*no grid support*/
  float: right;
  width: 79.7872%;
  /* grid */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  padding: 0 !important;
}

@supports (display: grid) {
  .capsule > * {
    width: auto;
    margin: 0;
  }
}
</style>
