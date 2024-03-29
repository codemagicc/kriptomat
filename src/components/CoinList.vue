<template>
  <v-card color="#FBFBFB">
    <v-card-title primary>
      <span class="title">Cryptocurrency Prices</span>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="coinList"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:[`item.price_change_percentage_24h`]="{ item }">
        <div
          :style="{ color: getColor(item.price_change_percentage_24h) }"
          style="display: flex; align-items: center"
          dark
        >
          <v-icon :color="getColor(item.price_change_percentage_24h)"
            >fa-solid
            {{
              item.price_change_percentage_24h >= 0
                ? "fa-caret-up"
                : "fa-caret-down"
            }} </v-icon
          >&nbsp;
          <span>
            {{
              item.price_change_percentage_24h >= 0
                ? item.price_change_percentage_24h.toFixed(2)
                : -item.price_change_percentage_24h.toFixed(2)
            }}%</span
          >
        </div>
      </template>
      <template v-slot:[`item.name`]="{ item }">
        <v-list-item :to="`/coin/${item.id}`">
          <v-list-item-avatar>
            <v-img class="elevation-6" alt="" :src="item.image"></v-img>
          </v-list-item-avatar>
          <v-list-item-title class="font-weight-bold"
            >{{ item.name }}
            <span class="font-weight-light">{{
              item.symbol
            }}</span></v-list-item-title
          >
        </v-list-item>
      </template>
      <template v-slot:[`item.current_price`]="{ item }">
        <div
          style="display: flex; align-items: center"
          class="font-weight-bold"
        >
          <v-icon x-small>fa-solid fa-euro-sign</v-icon>
          {{ item.current_price.toFixed(2) }}
        </div>
      </template>
      <template v-slot:[`item.id`]="{ item }">
        <div v-on:click="setfavourite(item.id)">
          <v-icon :color="item.favourite ? 'orange' : ''"
            >fa-solid fa-star</v-icon
          >
        </div>
      </template>
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on">
              {{ props.header.text }}
            </span>
          </template>
          <span>
            {{ props.header.text }};
          </span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import store from "../store";
export default {
  name: "CoinList",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Currency",
          align: "start",
          value: "name",
          width: "400px",
          class: "light-blue darken-2 white--text",
        },
        {
          text: "24h %",
          value: "price_change_percentage_24h",
          width: "100px",
          class: "light-blue darken-2 white--text",
        },
        {
          text: "Price",
          width: "100px",
          value: "current_price",
          class: "light-blue darken-2 white--text",
        },
        {
          text: "Favourite",
          value: "id",
          align: "center",
          width: "100px",
          class: "light-blue darken-2 white--text",
        },
      ],
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
    setfavourite(id) {
      var existing = JSON.parse(localStorage.getItem("myfavourite") || "[]");
      var coin = existing.includes(id);
      if (coin) {
        existing = existing.filter((item) => {
          if (item === id) {
            return false;
          } else {
            return true;
          }
        });
      } else {
        existing.push(id);
      }
      localStorage.setItem("myfavourite", JSON.stringify(existing));
      this.getfavouriteStar();
    },
    getColor(price_change_percentage_24h) {
      if (price_change_percentage_24h > 0) return "#0DEAA9";
      else if (price_change_percentage_24h < 0) return "#FF9696";
      else return "#0DEAA9";
    },
  },

  mounted() {
    this.getData();
  },
};
</script>
<style scoped>
.title {
  font-style: normal;
  font-weight: 700;
  font-size: 18px !important;
  line-height: 21px;
}
.datatable-header {
  background-color: #0e80d5 !important;
  color: #fff !important;
}
</style>
