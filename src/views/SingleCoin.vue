<template>
  <v-container>
    <div>
      <div class="list-item">
        <v-list-item-avatar>
          <v-img
            x-large
            class="elevation-6"
            alt=""
            :src="this.coinDetails.image.small"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ this.coinDetails.name }}</v-list-item-title
          >
          <v-list-item-subtitle
            color="#FF9696"
            style="display: flex; align-items: center"
            dark
          >
            <v-icon color="#FF9696">fa-solid fa-caret-down </v-icon>&nbsp;
            <span>
              {{
                this.coinDetails.market_data.price_change_percentage_24h >= 0
                  ? this.coinDetails.market_data.price_change_percentage_24h.toFixed(
                      2
                    )
                  : -this.coinDetails.market_data.price_change_percentage_24h.toFixed(
                      2
                    )
              }}%
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-row justify="end">
          <span class="subheading mr-2 text-align-right">
            <h2 style="text-align: right">
              €{{ this.coinDetails.market_data.current_price.eur.toFixed(2) }}
            </h2>
            <v-list-item-subtitle
              code="red"
              style="display: flex-end; align-items: center"
              dark
            >
              24h Low
              <span class="font-weight-bold"
                >€
                {{ this.coinDetails.market_data.low_24h.eur.toFixed(2) }} </span
              >&nbsp;
              <span>
                24h High
                <span class="font-weight-bold"
                  >€
                  {{
                    this.coinDetails.market_data.high_24h.eur.toFixed(2)
                  }}</span
                >
              </span>
            </v-list-item-subtitle></span
          >
        </v-row>
      </div>
      <CoinChart :id="this.$route.params.id" :days="datafor" />
      <div class="d-flex justify-space-between">
        <v-btn @click="datafor = 1" text color="primary">24h</v-btn>
        <v-btn @click="datafor = 7" text color="primary">1w</v-btn>
        <v-btn @click="datafor = 30" text color="primary">1M</v-btn>
        <v-btn @click="datafor = 365" text color="primary">All</v-btn>
      </div>
    </div>
  </v-container>
</template>
<script>
import CoinChart from "../components/CoinChart";
export default {
  name: "SingleCoin",
  components: {
    CoinChart,
  },
  data() {
    return {
      datafor: 1,
      coinDetails: null,
    };
  },
  methods: {
    async getCoinDetails() {
      try {
        const response = await this.$http.get(
          `https://api.coingecko.com/api/v3/coins/${this.$route.params.id}?localization=false`
        );
        this.coinDetails = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    "$route.params.id": {
      handler: function () {
        this.getCoinDetails();
      },
      deep: true,
      immediate: true,
    },
  },
  async mounted() {
    await this.getCoinDetails();
  },
};
</script>

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
.list-item {
  align-items: center;
  display: flex;
  flex: 1 1 100%;
  letter-spacing: normal;
  min-height: 48px;
  outline: none;
  padding: 0 16px;
  position: relative;
  text-decoration: none;
}
</style>
