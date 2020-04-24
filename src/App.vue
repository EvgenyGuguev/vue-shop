<template>
  <div id="app">
    <main-section></main-section>
  </div>
</template>

<script>
import MainSection from "./components/MainSection";
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'App',
  components: {
    MainSection,
  },
  mounted() {
    let vm = this;
    window.addEventListener('resize', function () {
      if (window.innerWidth > 767) {
        vm.SET_DESKTOP();
        console.log('desktop', vm.IS_DESKTOP);
      } else  {
        vm.SET_MOBILE();
        console.log('mobile', vm.IS_MOBILE);
      }

    })
  },
  methods: {
    ...mapActions([
        'SET_MOBILE',
        'SET_DESKTOP',
    ]),
  },
  computed: {
    ...mapGetters([
        'IS_MOBILE',
        'IS_DESKTOP',
    ]),
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 3rem;
}
</style>
