<template>
   <aside 
      class="bg-gray-50 shadow-md flex flex-col justify-between"      
      :class="{'w-20': !sidebar, 'w-80': sidebar,}"
    >
      
      <!-- Main -->
      <overlay-scrollbars 
          :key="scroll"          
          class="h-screen"
        >
        <div class="flex flex-col">      
          <div class="px-6 pt-4">
            <ul class="flex flex-col space-y-2">              
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
                    :class="{active: navItem === 1}"
                  >
                    <!-- parent link -->                
                    <div                                             
                      class="w-full py-2 text-xs rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 focus:text-green-300"
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
                  <div class="pt-2 pl-4" :class="{'hidden': !sidebar ||navItem !== content.position}">
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
                          class="inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-green-300 capitalize"
                          >{{item.title}}
                        </nuxt-link>
                      </li>                    
                    </ul>
                  </div>
                </transition-expand>
              </li>
            </ul>
          </div>
        </div>
      </overlay-scrollbars>
      
      <footer>        
      </footer>
    </aside>   
</template>

<script>
import TransitionExpand from '../components/TransitionExpand.vue';
export default {
  components: { TransitionExpand },
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
                        title: "slides",
                        to: "/admin/slides",
                    },
                    
                ],
            }
        }
    },
    mounted() {
      this.$nextTick(() => { this.scroll++; }); 
      // console.log(this.$route.name)
      // console.log(this.crumbs())
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
    },
}
</script>

<style scoped>   
</style>