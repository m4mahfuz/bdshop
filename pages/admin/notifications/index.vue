<template>
  <div>
    <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
    <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Create Notification</h2>

        <form>
            <!-- <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2"> -->
            <div class="grid grid-cols-2 gap-6 mt-4">
                <div>
                    <label class="text-gray-700 dark:text-gray-200" for="title">Title</label>
                    <input v-model="title" id="title" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                </div>                
            </div>
            <div class="grid grid-cols-1 gap-6 mt-4">
                <div>
                    <label class="text-gray-700 dark:text-gray-200" for="body">Body</label>
                    <textarea v-model="body" id="body" rows="2" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></textarea>
                </div>                
            </div>

            <div class="flex justify-end gap-4 mt-6">
                <button @click.prevent="reset" class="px-6 py-2.5 leading-5 text-gray-800 transition-colors duration-300 transform bg-gray-400 rounded-md hover:text-white  hover:bg-gray-500 focus:outline-none focus:bg-gray-500">Cancel</button>

                <button @click.prevent="sendNotification" class="px-12 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600">Send</button>
            </div>
        </form>
    </section>
  </div>
</template>

<script>
export default {
    layout: 'dashboard',
    data() {
        return {
            title: '',
            body: ''
        }
    },
    methods: {
        reset() {
            this.title = '';
            this.body = '';
        },
        sendNotification() {
        let data = {
            // token: this.token,
            title: this.title, //'Hello World 21 nov',
            body: this.body//'Welcome to our app!'
        }
        this.$axios.$post('/app/notifications', data)
                .then(response => {
                    // this.$toast.info('New message sent');
                    this.$toast.info('Message sent');
                    console.log('message sent');
                    this.reset();
                })
                .catch(error => {
                    console.log('err',error);
                });      
        }
    }

}
</script>

<style>

</style>