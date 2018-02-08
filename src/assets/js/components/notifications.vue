<template>
    <div id="notifications">
        <div v-for="notification in notifications" :class="getNotificationClass(notification)">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            {{ notification.message }}
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{

            }
        },

        methods: {
            getNotificationClass: function(notification)
            {
                return 'alert alert-dismissible alert-' + notification.type;
            }
        },

        props: ['notifications']
    }
</script>
