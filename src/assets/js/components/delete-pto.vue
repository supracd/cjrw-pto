<template>
    <div id="delete-pto">
        <h1>Delete Pto {{ pto.name }}</h1>

        <p><router-link :to="{ name: 'all_ptos' }">Return to ptos</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="deletePto">
            <p><button class="btn btn-danger">Delete Pto</button></p>
        </form>
    </div>
</template>

<script>
    import Notification from './notifications.vue';

    export default{
        data(){
            return{
                pto:{},
                notifications:[]
            }
        },

        created: function(){
            this.getPto();
        },

        methods: {
            getPto: function()
            {
                this.$http.get(`/api/pto/` + this.$route.params.id).then((response) => {
                    this.pto = response.body;
                }, (response) => {

                });
            },

            deletePto: function()
            {
                this.$http.delete(`/api/pto/delete/` + this.$route.params.id, this.pto, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then((response) => {
                    this.$router.push({name: 'all_pto'})
                }, (response) => {
                    this.notifications.push({
                        type: 'danger',
                        message: 'Pto could not deleted'
                    });
                });
            }
        },

        components: {
            'notification' : Notification
        }
    }
</script>
