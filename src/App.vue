<template>
  <v-app>
    <v-app-bar
      color="header-bar grey lighten-5  px-14 py-3"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <!-- <div class="container"> -->
      <router-link to="/">
        <img class="mr-3" src="./assets/logo.png" />
      </router-link>
      <v-spacer></v-spacer>
      <v-btn class="kriptoAccountbutton text-white"
        >Kriptomat account
      </v-btn>
      <!-- </div> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat");
#app {
  box-shadow: none !important;
  font-family: "Montserrat" !important;
}
.header-bar {
  box-shadow: none !important;
  height: 78px !important;
}
.kriptoAccountbutton {
  width: 343px;
  height: 48px;
  background-color: #0e80d5 !important;
  color: #fff !important;
}
</style>
