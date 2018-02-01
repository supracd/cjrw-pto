<template>
    <div class="container">
        <div id="page">
            <transition name="fade">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<style>
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s height .5s;
    }
    .fade-enter, .fade-leave-active {
      opacity: 0;
      height: 0px;
    }
</style>

<script>


    export default{
        data(){
            return{

            }
        }
    }
</script>
