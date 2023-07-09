<template>
  <li class="accordion__item">
    <div
      class="accordion__trigger cursor-pointer relative"
      :class="{'accordion__trigger_active': visible, 'bg-green-100 rounded-t-xl': roundedTop}"      
      @click.prevent="open"
    >
      <!-- This slot will handle the title/header of the accordion and is the part you click on -->
      <div class="flex justify-between items-center">
        <slot name="accordion-trigger"></slot>
          <svg
            v-if="showArrow"
            fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
            class="transform transition-transform duration-200"
            :class="[{ 'rotate-90': visible }, largeArrow ? 'h-6 w-6 mr-2' : 'h-4 w-4']"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>        
      </div>
    </div>

    <!-- <transition
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    > -->
    <transition-expand>
      <div class="accordion__content" v-show="visible">
          <!-- This slot will handle all the content that is passed to the accordion -->
          <slot name="accordion-content"></slot>
      </div>
    <!-- </transition> -->
    </transition-expand>
  </li>
</template>

<script>
import TransitionExpand from './TransitionExpand.vue';
export default {
  components: { TransitionExpand },
  props: {
    category: {
      type: Object,
      default: null
    },
    parent: {
      type: Boolean,
      default: false
    },
    openByDefault: {
      type: Boolean,
      default: false
    },
    roundedTop: {
      type: Boolean,
      default: false
    },
    largeArrow: {
      type: Boolean,
      default: false
    }
  },
  inject: ["Accordion"],
  data() {
    return {
      index: null
    };
  },
  computed: {
    visible() {
      return this.index === this.Accordion.active;
    },
    showArrow() {
      if (this.category === null) {
        return true;
      }
      return (this.category.children.length > 0) ? true : false;
    },
  },
  mounted() {
    if(this.openByDefault) {
      this.open()
    }
  },  
  methods: {
    open() {
      // load category without children
      if (this.category?.children.length === 0  && this.parent === false) {
        if (this.category.slug === this.$route.params.category) {
          return;
        }
        return this.$router.push(`/category/${this.category.slug}`);
      }
      
      if (this.visible) {
        this.Accordion.active = null;
      } else {        
        this.Accordion.active = this.index;
        if (this.category?.children.length > 0) {          
          this.$router.push(`/category/${this.category.slug}`);
        }
      }
    },  
  },
  created() {
    this.index = this.Accordion.count++;    
  }
};
</script>

<style >
/* .accordion-enter-active,
.accordion-leave-active {
  will-change: height, opacity;
  transition: height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.accordion-enter,
.accordion-leave-to {
  height: 0 !important;
  opacity: 0;
} */
</style>
