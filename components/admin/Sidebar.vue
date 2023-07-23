<template>
   <aside 
      class="bg-gray-50 shadow-md flex flex-col justify-between"      
      :class="{'w-20': !sidebar, 'w-80': sidebar,}"
    >
    <header class="relative bg-slate-100">
       <button
          @click.prevent="toggle('sidebar')"
          class="absolute -right-2 top-1.5 flex items-center justify-center p-0.5 rounded-full bg-slate-100 text-gray-400 shadow-md"            
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -rotate-180 transition-transform ease-in-out delay-200" viewBox="0 0 20 20" fill="currentColor" :class="{'rotate-0': !sidebar}"
          >
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>            
      </button>            
      <!-- logo -->
      <div class="px-6 pt-6 h-20">
        <div class="flex items-center justify-between">          
          <Logo :logoText="false" :linkTo="`/admin/dashboard`" />
        </div>
      </div>      
      <!-- separator -->
      <!-- <div class="px-6">
        <hr class="border-gray-200" />
      </div> -->
    </header>     
      
      <!-- Main -->
      <overlay-scrollbars 
          :key="scroll"          
          class="h-screen"
        >
        <div class="flex flex-col">      
          <div class="px-6 pt-4">
            <ul class="flex flex-col space-y-2">
              <li @click.prevent="toggleActive(1, false)" class="flex items-center gap-2 rounded cursor-pointer hover:bg-gray-800 text-gray-500 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800">
                <!-- icon -->
                <div
                  class="flex items-center pl-2 pointer-events-none"
                >              
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <!-- link -->
                <nuxt-link
                  to="/admin/dashboard"
                  class="w-full py-2 text-sm"
                  :class="{'invisible': !sidebar, active: navItem === 1}"
                  >Dashboard</nuxt-link
                >
              </li>
              <li>
                <div
                  @click.prevent="toggleActive(content.position, false)"
                  class="flex items-center gap-2 rounded cursor-pointer text-gray-500 hover:bg-gray-800 hover:text-white"
                >
                  <!-- icon -->
                  <div
                    class="flex items-center pl-2 pointer-events-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                  </div>
                  <div 
                    class="flex justify-between items-center w-full"
                    :class="{active: navItem === 2}"
                  >
                    <!-- parent link -->                
                    <div                         
                      class="w-full py-2 text-sm rounded focus:outline-none"
                      :class="{'invisible': !sidebar }"
                      >Content
                    </div>
                    <!-- Arrow -->
                    <button 
                      class="flex items-center p-1" :class="{'invisible': !sidebar }" tabindex="-1"
                    >                
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 transform transition-transform duration-200"
                        :class="{'rotate-90': navItem === 2 }"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>                  
                </div>
                <!-- children -->
                <transition-expand>
                  <div class="pt-2 pl-4" v-show="sidebar && navItem === content.position">
                    <ul v-for="(item, index) in content.items" :key="index" class="flex flex-col pl-2 text-gray-500 border-l border-gray-200">
                      <li
                        @click.prevent="toggleActive(`${content.position}${index}`)" 
                        class="relative"
                        :class="{'text-gray-800': childNavItem === `${content.position}${index}`}"
                      >
                        <span v-if="childNavItem === `${content.position}${index}`" class="absolute top-2.5 left-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                          </svg>
                        </span>  
                        <nuxt-link
                          :to="item.to" 
                          class="inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-green-500 capitalize"
                          >{{item.title}}
                        </nuxt-link>
                      </li>                    
                    </ul>
                  </div>
                </transition-expand>
              </li>
            </ul>
          </div>

          <!-- separator -->
          <div class="px-6 my-4">
            <hr class="border-gray-200" />
          </div>
          <!-- superAdmin -->
          <!-- Manage -->
          <div class="px-6">
            <div
              @click.prevent="toggleActive(superAdmin.position, false)"
              class="flex items-center gap-2 rounded cursor-pointer text-gray-500 hover:bg-gray-800 hover:text-white"
            >
              <!-- icon -->
              <div
                class="flex items-center pl-2 pointer-events-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
              </div>
              <div 
                class="flex justify-between items-center w-full"
                :class="{active: navItem === 9}"
              >
                <!-- parent link -->                
                <div                         
                  class="w-full py-2 text-sm rounded focus:outline-none"
                  :class="{'invisible': !sidebar }"
                  >Manage
                </div>
                <!-- Arrow -->
                <button 
                  class="flex items-center p-1" :class="{'invisible': !sidebar }" tabindex="-1"
                >                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 transform transition-transform duration-200"
                    :class="{'rotate-90': navItem === 9 }"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>                  
            </div>
            <!-- children -->
            <transition-expand>
              <div class="pt-2 pl-4" v-show="sidebar && navItem === superAdmin.position">
                <ul v-for="(item, index) in superAdmin.items" :key="index" class="flex flex-col pl-2 text-gray-500 border-l border-gray-200">
                  <li
                    @click.prevent="toggleActive(`${superAdmin.position}${index}`)" 
                    class="relative"
                    :class="{'text-gray-800': childNavItem === `${superAdmin.position}${index}`}"
                  >
                    <span v-if="childNavItem === `${superAdmin.position}${index}`" class="absolute top-2.5 left-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </span>  
                    <nuxt-link
                      :to="item.to" 
                      class="inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-green-500 capitalize"
                      >{{item.title}}
                    </nuxt-link>
                  </li>                    
                </ul>
              </div>
            </transition-expand>
          </div>

          <!-- Reporting -->
          <div class="px-6">
            <div
              @click.prevent="toggleActive(reports.position, false)"
              class="flex items-center gap-2 rounded cursor-pointer text-gray-500 hover:bg-gray-800 hover:text-white"
            >
              <!-- icon -->
              <div
                class="flex items-center pl-2 pointer-events-none"
              >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <div 
                class="flex justify-between items-center w-full"
                :class="{active: navItem === 7}"
              >
                <!-- parent link -->                
                <div                         
                  class="w-full py-2 text-sm rounded focus:outline-none"
                  :class="{'invisible': !sidebar }"
                  >Reports
                </div>
                <!-- Arrow -->
                <button 
                  class="flex items-center p-1" :class="{'invisible': !sidebar }" tabindex="-1"
                >                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 transform transition-transform duration-200"
                    :class="{'rotate-90': navItem === 9 }"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>                  
            </div>
            <!-- children -->
            <transition-expand>
              <div class="pt-2 pl-4" v-show="sidebar && navItem === reports.position">
                <ul v-for="(item, index) in reports.items" :key="index" class="flex flex-col pl-2 text-gray-500 border-l border-gray-200">
                  <li
                    @click.prevent="toggleActive(`${reports.position}${index}`)" 
                    class="relative"
                    :class="{'text-gray-800': childNavItem === `${reports.position}${index}`}"
                  >
                    <span v-if="childNavItem === `${reports.position}${index}`" class="absolute top-2.5 left-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </span>  
                    <nuxt-link
                      :to="item.to" 
                      class="inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-green-500 capitalize"
                      >{{item.title}}
                    </nuxt-link>
                  </li>                    
                </ul>
              </div>
            </transition-expand>
          </div>
          <!-- separator -->
          <div class="px-6 my-4">
            <hr class="border-gray-200" />
          </div>

          <!-- setup -->
          <div class="px-6 pb-8">
            <!-- <ul> -->
            <ul class="flex flex-col space-y-1">
              <li class="flex items-center gap-2 rounded cursor-pointer hover:bg-gray-800 text-gray-500 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800">
                
                <div
                  class="flex items-center pl-2 pointer-events-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>

                </div>
                <nuxt-link
                  to="/admin/settings"
                  class="w-full py-2 text-sm rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800"       
                  :class="{'invisible': !sidebar}"          
                  >Settings
                </nuxt-link>
              </li>

              <li class="flex items-center gap-2 rounded cursor-pointer hover:bg-gray-800 text-gray-500 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800">
                <div
                  class="flex items-center pl-2 pointer-events-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </div>                
                <nuxt-link
                  to="/admin/#"
                  class="w-full py-2 text-sm"
                  :class="{'invisible': !sidebar}"                 
                  >Notifications</nuxt-link
                >
              </li>              
            </ul>
          </div>
        </div>
      </overlay-scrollbars>
      
      <footer>
        <!-- user -->
        <div class="pl-6 px-4 pt-4 pb-6 bg-slate-100 flex items-center justify-between">
          <div class="flex items-center">
            <div
              class="relative w-8 h-8 rounded-full before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:right-0 before:bottom-0 before:ring-1 before:ring-white"
            >
              <img
                class="rounded-full"
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                alt=""
              />
            </div>
            <div class="flex flex-col pl-3" :class="{'invisible': !sidebar }">
              <div class="text-sm text-gray-500">{{this.$auth.$state.user.name}}</div>
              <span class="text-xs text-gray-500 font-light tracking-tight">
                {{this.$auth.$state.user.email}}
              </span>
            </div>
          </div>
          <button
            class="text-gray-400 bg-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white"
            :class="{'invisible': !sidebar }"
          >
            <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M15.25 10.75L12 14.25L8.75 10.75"
              ></path>
            </svg>
          </button>
        </div>
      </footer>
    </aside>   
</template>

<script>
export default {
    data() {
        return {
            scroll: '',
            sidebar: true,
            navItem: '',
            childNavItem: '',                
            content: {
                position: 2,            
                items: [
                    {
                        title: "sections",
                        to: "/admin/sections",
                    },
                    {
                        title: "categories",
                        to: "/admin/categories",
                    },
                    {
                        title: "products",
                        to: "/admin/products",
                    },
                    {
                        title: "orders",
                        to: "/admin/orders",
                    },
                    {
                        title: "coupons",
                        to: "/admin/coupons",
                    },
                    {
                        title: "deals",
                        to: "/admin/deals",
                    },
                    {
                        title: "discounts",
                        to: "/admin/discounts",
                    },
                    {
                        title: "offers",
                        to: "/admin/offers",
                    },
                    {
                        title: "slides",
                        to: "/admin/slides",
                    },
                    
                ],
            },
            reports: {
                position: 7,            
                items: [
                    {
                        title: "Orders Received",
                        to: "/admin/reports/orders",
                    },                    
                    {
                        title: "Products Sold",
                        to: "/admin/reports/products",
                    },                    
                    {
                        title: "User Registered",
                        to: "/admin/reports/users",
                    },                    
                ],
            },
            superAdmin: {
                position: 9,            
                items: [
                    {
                        title: "Add new admin",
                        to: "/admin/create",
                    },                    
                ],
            }
        }
    },
    mounted() {
      this.$nextTick(() => { this.scroll++; });       
    },
    methods: {        
        toggle(element) {
            this.sidebar = !this.sidebar;
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
  .active {
    border-left: 2px #959ca7 solid  ;
    padding-left: 4px;
    font-weight: 500;  
  }   
</style>