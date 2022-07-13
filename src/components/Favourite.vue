<template>
  <v-card color="#FBFBFB" width="500px">
    <v-card-title text-center class="title justify-center"
      >Favourites</v-card-title
    >
    <v-card-body>
      <v-card class="mx-auto" min-width="auto">
        <div v-for="favourite in $store.getters.favouriteList" :key="favourite">
          <FavouriteItem :favourite="favourite" />
        </div>
      </v-card>
    </v-card-body>
  </v-card>
</template>
<script>
import FavouriteItem from "./FavouriteItem.vue";
export default {
  name: "FavouriteCoins",
  components: { FavouriteItem },
};
</script>
<style scoped>
.v-list-item.theme--light {
  border-bottom: thin solid #cccccc;
}
</style>
