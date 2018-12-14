<template>
  <div class="item">
    <a :href="'/products/' + item.id">{{ item.name }}</a>
    <img :src="item.image_url" :alt="`Image of ${item.name}`">
    <div v-if="!item.special_price">{{ item.price }}</div>
    <div v-if="item.special_price">
        <p><s>{{ item.price }}</s></p>
        <p class="text-danger">{{ item.special_price }}</p>
    </div>
    <button class="add" @click="addItem">Додати в корзину</button>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  filters: {
    usdollar: function(value) {
      return `$${value}`;
    }
  },
  methods: {
    addItem() {
      this.$store.commit('addItem', this.item);
    }
  }
};
</script>

<style scoped>
.item {
  border-radius: 5px;
  padding: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.salepill {
  background: rgb(232, 35, 25);
  color: white;
  font-family: 'Barlow', sans-serif;
  position: absolute;
  right: 30px;
  top: 60px;
  padding: 2px 10px 4px;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 700;
  border-radius: 1000px;
}

img {
  width: 60px;
}

p {
  font-size: 18px;
}
</style>