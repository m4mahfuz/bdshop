<template>
  <div class="h-screen flex bg-gray-50">
    
    <AdminSidebar />
          
    <div class="w-full flex flex-col overflow-auto"> 
      
      <header class="w-full bg-gray-50 shadow-sm px-4 flex items-center justify-between">
      <!-- right arrow -->
      <!--   <div class="relative w-20 h-20">
          <button
            @click.prevent="toggle('sidebar')"
            class="absolute -left-2.5 top-7 flex items-center justify-center p-0.5 rounded bg-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            :class="{hidden: sidebar}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>            
          </button>
        </div> -->
        <!-- hamburger -->
        <!-- <div class="cursor-pointer lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" @click.prevent="toggle('sidebar')" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div> -->

        <!-- search -->
        <div class="relative h-20 flex justify-center items-center ml-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-8 text-gray-400 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" class="block w-72 shadow borde-none rounded-3xl focus:outline-none bg-gray-100 text-xs font-light text-gray-600 py-2 pl-11 pr-2 pl" placeholder="search">
        </div> 

        <nav class="items-center hidden lg:flex">
          <!-- Notifications -->
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <!-- Account -->
          <div class="relative ml-4" v-click-outside="hideDropdown">
            <div class="cursor-pointer" @click.prevent="toggle('dropdown')">
              <img 
                class="object-cover w-8 h-8 rounded-full"
                src="https://images.unsplash.com/photo-1621659911279-b08ce9ff421f?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format& fit=crop&w=764" 
                alt=""
              >
            </div>            
            <DropDown :show="dropdown" />
          </div>
        </nav>      
      </header> 

      <section class="p-4 w-full">
        <breadcrumb :crumbs="crumbs" />
        <Nuxt />
      </section>

    </div>
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb.vue';
export default {
  components: { Breadcrumb },
    // middleware: ['auth', 'superAdmin'],
    middleware: ['authAdmin', 'checkAdmin'],
    data() {
      return {
        // scroll: '',
        dropdown: false,
        sidebar: true,
        navItem: '',
        childNavItem: '',                
      }
    },
    // mounted() {
    //   this.$nextTick(() => { this.scroll++; }); 
    //   // console.log(this.$route.name)
    //   // console.log(this.crumbs())
    // },
    computed: {
    //  crumbs() {
    //     let pathArray = this.$route.path.split("/")
    //     pathArray.shift()
    //     let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
    //       breadcrumbArray.push({
    //         path: path,
    //         to: breadcrumbArray[idx - 1]
    //           ? "/" + breadcrumbArray[idx - 1].path + "/" + path
    //           : "/" + path,
    //         text: this.$route.matched[idx].meta.breadCrumb || path,
    //       });
    //       return breadcrumbArray;
    //     }, [])
    //     return breadcrumbs;
    //   }

    crumbs() {
      const fullPath = this.$route.fullPath
      const params = fullPath.startsWith('/')
        ? fullPath.substring(1).split('/')
        : fullPath.split('/')
      const crumbs = []
      let path = ''
      params.forEach((param, index) => {
        path = `${path}/${param}`
        const match = this.$router.match(path)
        const resolve = this.$router.resolve(path)
        
        // if (match.name == 'index')
        //  console.log(match);

        if (match.name !== null) {
          crumbs.push({
            // title: titleCase(param.replace(/-/g, ' ')),
            title: param.replace(/-/g, ' '),
            ...match,
          })
        }
      })
      return crumbs
      },
    },
    
    methods: {      
    //  crumbs() {
    //   const fullPath = this.$route.fullPath
    //   const params = fullPath.substring(1).split('/')
    //   params.pop()
    //   const crumbs = []
    //   let path = ''-
    
    //   params.forEach((param, index, { length }) => {
    //     path = `${path}/${param}`
    //     const match = this.$router.match(path)
    //     console.log(path)
    //     if (match.name !== 'index') {
    //       if (index === length - 1) {
    //         crumbs.push({
    //           text: path.replace(/\//g, '-').slice(1),
    //           disabled: true,
    //         })
    //       } else {
    //         crumbs.push({
    //           text: path.replace(/\//g, '-').slice(1),
    //           disabled: false,
    //           href: path + '/',
    //         })
    //       }
    //     }
    //   })

    //   return crumbs
    // },
      toggle(element) {
        this.dropdown = !this.dropdown;
        // if (element === 'dropdown') {
        //   return;
        // }
        // this.sidebar = !this.sidebar;        
      },
      hideDropdown() {
        console.log('outside clicked')
        this.dropdown = false;        
      },
      hideSidebar() {
        this.sidebar = true;
      },
      toggleActive(activeSelection, childItem = true) {
        if (!childItem) {            
          // if already active, deactivate 
          this.childNavItem = '';
          if (this.navItem === activeSelection) 
          {
            this.navItem = '';
            return;
          }
          this.navItem = activeSelection;
          return;
        }
        this.childNavItem = activeSelection;
      },
    }
}
</script>

<style scoped>
.dropdown::after {
    content: "";
    position: absolute;
    top: -8%;
    right: 5%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #c1c3c9 transparent;
}
.active {
  border-left: 2px #374151 solid  ;
  /* color: #374151; */
  font-weight: 500;
  
}
</style>