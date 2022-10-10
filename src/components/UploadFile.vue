<template>
  <div class="px-4">
    <h3>Sube tu archivo: {{ filename }}</h3>
    <form @submit="submit" class="text-gray-600 body-font">
      <input type="file" 
        class="hidden" 
        ref="file" @change="onDropped" />
      <div class="block bg-gray-200 p-10 mb-5 cursor-pointer text-center" 
      @dragover="dragover" @click="dialog" @dragleave="dragleave" @drop="drop"
      >
        Arrastra y suelda tu archivo.
      </div>

      <button 
        :disabled="submiting" 
        class="inline-block disabled:bg-slate-50 bg-blue-600 px-4 py-2 text-white" 
        type="submit">
        Subir
      </button>

      <div class="p-4">
        <a class="text-blue-600	underline" :href="url">{{ url }}</a>
      </div>
    </form>
  </div>
</template>
<script>


import { DEFAULT_BUCKET, 
  SUPABASE_URL } from '../lib/constants';

export default {
  data: () => ({
    filename: "---",
    url: undefined,
    loading: false,
    authListener: null
  }),  
  mounted: function() {
    /* When the app loads, check to see if the user is signed in */
    /* also create a listener for when someone signs in or out */
    const { data: authListener } = this.$supabase.auth.onAuthStateChange(
      () => this.checkUser()
    )
    this.authListener = authListener
    this.checkUser()
  },  
  beforeUnmount() {
    this.authListener?.unsubscribe()
  },
  computed: {
    submiting() {
      return this.loading;
    },
  },  
  methods: {
    getUrl(path) {
      return `${SUPABASE_URL}/storage/v1/object/public/${path}`;
    },
    checkUser: async function() {
      // const user = await this.$supabase.auth.user();
      // console.log("us", user);
      // if (user) {
      //   this.authenticated = true 
      // } else {
      //   this.authenticated = false
      // }
    },
    submit: async function($event) {
      $event.preventDefault();
      this.loading = true;
      // const user = supabase.auth.user();
      const file = this.$refs.file.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `nurxt.${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      

      let { data, error } = await this.$supabase.storage
        .from(DEFAULT_BUCKET)
        .upload(filePath, file);
      
      if (error) {
        throw error;
      }

      setTimeout(function(scope) {
        scope.loading = false;
        scope.url = scope.getUrl(data["Key"]);
      }, 500, this);
      

    },
    dialog: function($event) {
      this.$refs.file.click();
    },
    dragleave: function($event) {
      
    },
    drop: function($event) {
      $event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;
      this.onDropped(); // Trigger the onChange event manually
    }, 
    dragover: function($event) {
      $event.preventDefault();
    },
    onDropped: function() {
      const file = this.$refs.file.files[0];
      this.filename = file.name;  
    }
  }
}
</script>
