<template>
  <div>
    <!-- <navbar-component></navbar-component> -->
    <main>
      <section class="absolute w-full h-full">
        <div
          class="absolute top-0 w-full h-full bg-gray-600"
          style="background-size: 100%; background-repeat: no-repeat;"          
          :style="{'background-image': 'url(' + require('@/assets/img/register_bg_2.png') + ')'}"
        ></div>
        <div class="container mx-auto px-4 h-full">
          <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-4/12 px-4">
              <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
              >
                <div class="rounded-t mb-0 px-6 py-6">
                  <div class="text-center mb-3">
                    <h6 class="text-gray-600 text-sm font-bold">
                      Sign in with
                    </h6>
                  </div>
                  <div class="btn-wrapper text-center">
                    <button
                      class="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                      type="button"
                      style="transition: all 0.15s ease 0s;"
                    >
                      <img
                        alt="..."
                        class="w-5 mr-1"
                        src="~/assets/img/github.svg"
                      />Github</button
                    ><button
                      class="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs"
                      type="button"
                      style="transition: all 0.15s ease 0s;"
                    >
                      <img
                        alt="..."
                        class="w-5 mr-1"
                        src="~/assets/img/google.svg"
                      />Google
                    </button>
                  </div>
                  <hr class="mt-6 border-b-1 border-gray-400" />
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div class="text-gray-500 text-center mb-3 font-bold">
                    <small>Or sign in with credentials</small>
                  </div>
                  <form autoComplete="off" @submit.prevent="submitForm">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >Email</label
                      ><input
                        v-model="email"
                        type="email"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Email"
                        style="transition: all 0.15s ease 0s;"
                      />
                    </div>
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >Password</label
                      ><input
                        v-model="password"
                        type="password"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Password"
                        style="transition: all 0.15s ease 0s;"
                      />
                    </div>
                    <div>
                      <label class="inline-flex items-center cursor-pointer"
                        ><input
                          v-model="remember"
                          id="customCheckLogin"
                          type="checkbox"
                          class="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                          style="transition: all 0.15s ease 0s;"
                        /><span class="ml-2 text-sm font-semibold text-gray-700"
                          >Remember me</span
                        ></label
                      >
                    </div>
                    <div class="text-center mt-6">
                      <button
                        class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="submit"
                        style="transition: all 0.15s ease 0s;"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>

                  <div v-if="errors.length > 0" class="mt-4 text-red-500">
                    <small>*{{errors[0]}}</small>
                  </div>

                  <div class="mt-4">
                    <a href="#pablo" class="text-gray-600"
                      ><small>Forgot password?</small></a>
                  </div>
                  <div class="mt-1">
                    <a href="#pablo" class="text-gray-600"
                      ><small>Create new account</small></a>
                  </div>
                </div>
              </div>              
            </div>
          </div>
        </div>
        <!-- <footer-component></footer-component> -->
      </section>
    </main>
  </div>
</template>
<script>
// import NavbarComponent from "../components/Navbar.vue";
// import FooterComponent from "../components/Footer.vue";
export default {
  auth: false,
  layout: 'blank',
  name: "login-page",
//   components: {
//     NavbarComponent,
//     FooterComponent
//   }
  data: () => ({
      errors: [],
      email: '',
      password: '',
      remember: false,
  }),

  head() {
    return {
      title: 'Admin Sign In — bdshop',
    }
  },
  mounted() {
      // console.log(this.$auth)
      this.$auth.strategies.cookie.reset();
      this.$auth.strategies.admin.reset();
  },
  methods: {
    async submitForm(event) {
      console.log('submit')
      // console.log(this.$auth)
      // await this.$auth.logout('cookie');
        this.errors = [];
        // localStorage.setItem('redirect', this.$route.path);
        this.$auth.loginWith('admin', {
            data: {
                email: this.email,
                password: this.password,
                remember: this.remember
            },
        }).then(() => {
          this.$router.push('/admin/dashboard');
                // console.log('user', this.$auth.user);
                this.$toast.success('Logged In!')
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                this.errors = Object.values(error.response.data.errors).flat();
              if(error) console.log(error.message);
            })
    },
  }
}
</script>