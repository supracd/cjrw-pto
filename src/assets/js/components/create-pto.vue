<template>

  <div id="create-pto">
    <h1>{{pageName}}</h1>


    <notification v-bind:notifications="notifications"></notification>

    <form v-on:submit.prevent="addPto">

      <div class="form-group">
        <label for="pto_name"  >Name</label>
        <input ref="pto_name" id="pto_name" v-model="pto.name" autocomplete="off" class="form-control form-control-lg" type="text" placeholder="Name Search..." required>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col">
            <label name="pto_date_start">Date Starting</label>
            <date-picker   id="pto_date_start" format="yyyy-MM-dd HH:mm:ss" type="datetime" lang="en"
              :time-picker-options="{start: '00:00',step: '00:30',end: '23:30'}" :shortcuts="shortcuts"
              v-model="pto.date_start" :first-day-of-week="1" ></date-picker>
          </div>
          <div class="col">
            <label name="pto_date_end">Date Ending</label>
            <date-picker   id="pto_date_end" format="yyyy-MM-dd HH:mm:ss" type="datetime" lang="en"
              :time-picker-options="{start: '00:00',step: '00:30',end: '23:30'}" :shortcuts="shortcuts"
              v-model="pto.date_end" :first-day-of-week="1" ></date-picker>
          </div>
        </div>
      </div>



      <div class="form-group">
        <button class="btn btn-primary">Create</button>
      </div>
    </form>
  </div>

</template>


<script>



import Notification from './notifications.vue';

export default {
    computed: {
        notifications() {
            return this.$store.state.notifications;
        }
    },
  created: function(){
    this.$store.dispatch('clearNotifications');
  },
  data() {
    return {
      pto: {},
      date: new Date(),
      pto_name: '',
      model: '',
      names: ["Jill Joslin","Darin Gray","Lukas Arnold","Wade Austin","Vita Barré","Nicole Boddington","Lyuba Bogan","Lynn Boyd","Anna Branch","Robert Burnham","John Cater","Brandi Childress","Heidi Damron","Sean Dandurand","Shelby Daniel","Ralph Eubanks","Lauren Euseppi","Nancy Ferrara","Christy Fulton","Debbie Grace","Jason Grisham",
      "Bryce Harrison",
      "Becky Heflin","Chris Ho","Tiffany Holland Maltezo","Annie Holman","Kelsey  Hook","Paul Hughes","Kerry Johnson","Bob Johnston","Brian Kratkiewicz ","Gracie Lively","Ryan Lowery","Wade McCune","Belinda McKim","Kelly McLarty","Jennifer Morgan","Scott Mosley","Sherkari  Parks","Estefanie Perez Ferrer","Kathy Porter","Mark Raines","Caroline Reddmann","Robyn Rektor","Emilie Reno","Rachel Reynolds","Dan Sawyer",
      "Jane Embry Selig","Sarah Sikes","Dalaney Thomas","Katherine Vasilos","Caitlin Vestal","Josh Walker","Blair Wallace","Tanya Whitlock","Maxine Williams","Shanon Williams","Teresa Williamson","Margaret Willis","Shelby Woods","Brenda Worm","Keegan Wright"],
      pageName: 'Create PTO Request',
      shortcuts: [{
        text: 'Today',
        start: new Date(),
        end: new Date(),
        lang: "en"
      }]
    }
  },

  methods: {
    addPto: function() {

        this.$store.dispatch('addPto', this.pto);
        this.$store.dispatch('fetchPtoData');
    }
  },

  components: {
    'notification': Notification,

}
}
</script>
