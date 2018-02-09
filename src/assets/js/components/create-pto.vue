<template>

  <div id="create-pto">
    <h1>{{pageName}}</h1>


    <notification v-bind:notifications="notifications"></notification>

    <form v-on:submit.prevent="addPto">

      <div class="form-group">
        <label for="pto_name" name="pto_name" >Name</label>
        <input ref="pto_name" id="pto_name" v-model="pto.name" autocomplete="off" class="form-control form-control-lg" type="text" placeholder="Name Search..." required>
        <typeahead :data="names" target="#pto_name" v-model="model" />
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col">
            <label name="pto_date_start">Date Starting</label>
            <date-picker   id="pto_date_start" format="yyyy-MM-dd HH:mm:ss" type="datetime" lang="en"
              :time-picker-options="{start: '00:00',step: '00:30',end: '23:30'}" :shortcuts="shortcuts"
              v-model="pto.date_start" :first-day-of-week="1" confirm></date-picker>
          </div>
          <div class="col">
            <label name="pto_date_end">Date Ending</label>
            <date-picker   id="pto_date_end" format="yyyy-MM-dd HH:mm:ss" type="datetime" lang="en"
              :time-picker-options="{start: '00:00',step: '00:30',end: '23:30'}" :shortcuts="shortcuts"
              v-model="pto.date_end" :first-day-of-week="1" confirm></date-picker>
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
  data() {
    return {
      pto: {},
      notifications: [],
      date: new Date(),
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
      // Validation

      var date_start = this.pto.date_start;
      var date_end = this.pto.date_end;
      if (!date_start || !date_end) {
        this.notifications.push({
          type: 'danger',
          message: 'Incorrect Date Format'
        });
        return false;
      } else {
        this.pto.date_start = date_start;
        this.pto.date_end = date_end;
      }

      this.$http.post(`/api/pto/create`, this.pto, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        this.notifications.push({
          type: 'success',
          message: 'PTO request created successfully'
        });
      }, (response) => {
        this.notifications.push({
          type: 'danger',
          message: 'PTO request not created'
        });
      });
    }
  },

  components: {
    'notification': Notification,

}
}
</script>
