<template>
  <v-container fluid grid-list-md class="my-4 mt-1">
    <v-layout row wrap>
      <v-flex d-flex sm12 md8>
        <CoinList />
      </v-flex>
      <v-flex d-flex sm12 md4>
        <FavouriteCoins />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
.v-list-item.theme--light {
  border-bottom: thin solid #cccccc;
}
.title {
  font-style: normal;
  font-weight: 700;
  font-size: 18px !important;
  line-height: 21px;
}
.favourites {
  text-align: center !important;
}
.datatable-header {
  background-color: #0e80d5 !important;
  color: #fff !important;
}
</style>
<script>
import CoinList from "@/components/CoinList.vue";
import FavouriteCoins from "@/components/Favourite.vue";
// @ is an alias to /src
export default {
  name: "HomeView",
  components: { CoinList, FavouriteCoins },
  data() {
    return;
  },
};
</script>
