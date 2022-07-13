<template>
  <v-list-item @click="goTodetail(favourite.id)">
    <v-list-item-avatar>
      <v-img class="elevation-6" alt="" :src="favourite.image"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="font-weight-bold">
        {{ favourite.name }}</v-list-item-title
      >
      <v-list-item-subtitle class="font-weight-light">
        {{ favourite.symbol }}</v-list-item-subtitle
      >
    </v-list-item-content>
    <v-row align="center" justify="end">
      <span class="subheading mr-2 text-align-right">
        <v-list-item-title class="font-weight-bold"
          >€{{ favourite.current_price.toFixed(2) }}</v-list-item-title
        >
        <v-list-item-subtitle
          :style="{ color: getColor(favourite.price_change_percentage_24h) }"
          style="display: flex; align-items: center"
          dark
        >
          <v-icon :color="getColor(favourite.price_change_percentage_24h)"
            >fa-solid
            {{
              favourite.price_change_percentage_24h >= 0
                ? "fa-caret-up"
                : "fa-caret-down"
            }} </v-icon
          >&nbsp;
          <span>
            {{
              favourite.price_change_percentage_24h >= 0
                ? favourite.price_change_percentage_24h.toFixed(2)
                : -favourite.price_change_percentage_24h.toFixed(2)
            }}%</span
          >
        </v-list-item-subtitle></span
      >
    </v-row>
  </v-list-item>
</template>
<script>
export default {
  name: "FavouriteItem",
  props: {
    favourite: null,
  },
  methods: {
    getColor(price_change_percentage_24h) {
      if (price_change_percentage_24h > 0) return "#0DEAA9";
      else if (price_change_percentage_24h < 0) return "#FF9696";
      else return "#0DEAA9";
    },
    goTodetail(id) {
      this.$router.push({ name: "coin", params: { id: id } });
    },
  },
  created() {},
};
</script>