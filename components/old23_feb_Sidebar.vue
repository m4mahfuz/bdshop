<template>
  <accordion>
    <accordion-item :openByDefault="true">
      <!-- This slot will handle the title/header of the accordion and is the part you click on -->
      <template slot="accordion-trigger">
        <h3 class="bs-light-green-bg p-5 rounded-t-xl cursor-pointer flex justify-between">
          Categories

          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </h3>
      </template>
      <!-- This slot will handle all the content that is passed to the accordion -->
      <template slot="accordion-content">
        <div class="border border-t-0 border-gray-100 p-6">
          <ul class="leading-10">
            <li v-for="category in categories" :key="category.id">
              <accordion>
                <accordion-item v-if="category.active">
                  <template slot="accordion-trigger">
                    <div class="flex justify-between cursor-pointer items-center hover:text-green-600">
                      <div class="flex items-center  gap-2">
                      <img src="~/assets/img/carousel-img-4.png" class="h-7" alt="">
                      <p>{{ category.name }}</p>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </template>
 
                  <template slot="accordion-content">
                    <ul class="pl-4 text-sm leading-8 mb-4">
                      <li v-for="child in category.children" :key="child.id">
                        <nuxt-link 
                        v-if="child.active" class="hover:text-green-600" :to="`/category/${child.slug}`">{{ child.name }}</nuxt-link>
                      </li>                      
                    </ul>
                  </template>
                </accordion-item>
              </accordion>
            </li>            
          </ul>
        </div>
      </template>
    </accordion-item>
  </accordion>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    categories: Array
  }
  
}
</script>

<style scoped>

</style>
