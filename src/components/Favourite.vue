<template>
  <v-card style="background-color: #fbfbfb; border: none" width="500px">
    <v-card-title text-center class="title justify-center">
      Favourites
    </v-card-title>
    <v-card-text>
      <v-card class="mx-auto" min-width="auto">
        <div
          v-for="(favourite, index) in $store.getters.favouriteList"
          :key="index"
        >
          <FavouriteItem :favourite="favourite" />
        </div>
      </v-card>
    </v-card-text>
  </v-card>
</template>
<script>
import FavouriteItem from "./FavouriteItem.vue";
import store from "../store";
export default {
  name: "FavouriteCoins",
  components: { FavouriteItem },
  data() {
    return {
      coinList: [],
    };
  },
  methods: {
    async getData() {
      try {
        const response = await this.$http.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h"
        );
        this.coinList = response.data;
        this.getfavouriteStar();
      } catch (error) {
        console.log(error);
      }
    },
    getfavouriteStar() {
      var existing = JSON.parse(localStorage.getItem("myfavourite") || "[]");
      var newList = [];
      this.coinList.forEach(function (item) {
        var coin = existing.includes(item.id);
        if (coin) {
          item.favourite = true;
        } else {
          item.favourite = false;
        }
        newList.push(item);
      });
      this.coinList = newList;
      store.dispatch("addToFavouriteList", newList);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style scoped>
.v-list-item.theme--light {
  border-bottom: thin solid #cccccc;
}
</style>
