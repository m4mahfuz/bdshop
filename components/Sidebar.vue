<template>
  <accordion>
    <accordion-item :openByDefault="true" :roundedTop="true" :largeArrow="true" :parent="true">
      <!-- This slot will handle the title/header of the accordion and is the part you click on -->
      <template slot="accordion-trigger">
        <h3 class="p-5">
          Categories
        </h3>
      </template>
      <!-- This slot will handle all the content that is passed to the accordion -->
      <template slot="accordion-content">
        <div class="border border-t-0 border-gray-100 p-6">
          <ul class="leading-10">
            <li v-for="category in categories" :key="category.id">
              <accordion>
                <accordion-item v-if="category.active" :category="category">
                  <template slot="accordion-trigger">
                    <div class="flex justify-between cursor-pointer items-center hover:text-green-600">
                      <div class="flex items-center gap-2">
                      <img :src="url(category.icon)" class="w-7" alt="">
                      <!-- <nuxt-link v-if="category.active" :to="`/category/${category.slug}`"> -->
                      <span>{{ category.name }}</span>
                      <!-- </nuxt-link> -->
                      </div>                      
                    </div>
                  </template>
 
                  <template slot="accordion-content">
                    <ul class="pl-6 text-sm leading-8 ml-3 mb-4 border-l">
                      <li v-for="child in category.children" :key="child.id">
                        <!-- <nuxt-link 
                        v-if="child.active" class=" hover:text-green-600" :to="`/category/${child.slug}`">{{ child.name }}</nuxt-link> -->
                        <button 
                        @click.stop.prevent="load(child.slug)"
                        v-if="child.active" class=" hover:text-green-600">{{ child.name }}</button>
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
  },
  methods: {
    load(slug) {
      this.$router.push(`/category/${slug}`);
    },
    url(image) {
      if (image === null) {
          return require('~/assets/no_image_icon.png');
      }
      let  path = `/storage/images/icons/${image}`;
      return `${this.$config.baseURL}${path}`;
    }
  }
}
</script>