<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link :to="{ name: 'all_pto' }" class="navbar-brand"><img width="80" src="/src/assets/images/logo.jpeg" /></router-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03"
        aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor03">
        <ul class="navbar-nav mr-auto">

          <li class="nav-item">
            <router-link :to="{ name: 'all_pto' }" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'create_pto' }" class="nav-link">Create PTO</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'view_calendar' }" class="nav-link">View Calendar</router-link>
          </li>

        </ul>

      </div>
    </nav>
    <div id="page">
 <transition name="fade">
      <router-view></router-view>
</transition>
    </div>

  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s height .5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  height: 0px;
}
</style>

<script>
export default {
  data() {
    return {
      pageName: 'All PTO'
    }
  }
}
</script>
