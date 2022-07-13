<template>
  <div>
    <canvas id="coin-chart"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js";

export default {
  name: "CoinChart",
  props: {
    id: null,
    days: null,
  },
  data() {
    return {
      coinData: [],
      chart: null,
    };
  },
  methods: {
    async getData() {
      try {
        console.log("days", this.days);
        const response = await this.$http.get(
          `https://api.coingecko.com/api/v3/coins/${this.id}/market_chart?vs_currency=eur&days=${this.days}`
        );
        var coinData = [];

        response.data.prices.forEach((element) => {
          var data = {};
          data.x = new Date(element[0]);
          data.y = element[1];
          coinData.push(data);
        });
        this.coinData = coinData;
        console.log("data", coinData);
        const ctx = document.getElementById("coin-chart");
        this.chart = await new Chart(ctx, {
          type: "line",
          data: {
            datasets: [
              {
                label: "Test",
                fill: false,
                data: coinData,
                backgroundColor: "rgba(0,0,0,0)",
                borderColor: "#0E80D5",
                tension: 0.4,
              },
            ],
          },
          options: {
            lineTension: 1,
            legend: {
              display: false,
            },
            tooltips: {
              enabled: false,
            },
            elements: {
              point: {
                radius: 0,
              },
            },
            scales: {
              xAxes: [
                {
                  display: false,
                  ticks: {
                    suggestedMin: 0,
                    // OR //
                    beginAtZero: true,
                  },
                },
              ],
              yAxes: [
                {
                  display: false,
                },
              ],
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    // whenever question changes, this function will run
    days(newdays, olddays) {
      if (newdays !== olddays) {
        this.getData();
      }
    },
    id(newid, oldid) {
      if (newid !== oldid) {
        this.getData();
      }
    },
  },
  async mounted() {
    await this.getData();
  },
  onMounted() {
    this.chart.destroy();
  },
};
</script>