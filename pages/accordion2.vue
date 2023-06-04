<template>
  <div class="accordion">
    <div v-for="(item, index) in items" :key="index" class="accordion-item">
      <div class="accordion-header flex justify-between items-center py-3 px-4 border-b border-gray-200 cursor-pointer" @click="toggle(index)">
        <span>{{ item.title }}</span>
        <div class="arrow h-4 w-4 border-t border-r transform transition-transform duration-200" :class="{ 'rotate-45': item.active }"></div>
      </div>
      <div class="accordion-body py-3 px-4" v-show="item.active">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Accordion item 1',
          content: 'Content of accordion item 1',
          active: false
        },
        {
          title: 'Accordion item 2',
          content: 'Content of accordion item 2',
          active: false
        },
        {
          title: 'Accordion item 3',
          content: 'Content of accordion item 3',
          active: false
        }
      ]
    }
  },
  methods: {
    toggle(index) {
      this.items[index].active = !this.items[index].active;
    }
  }
};
</script>

<style>
.accordion {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.accordion-item {
  border-bottom: 1px solid #ddd;
  position: relative;
}

.arrow {
  position: absolute;
  /* top: 50%; */
  right: 10px;
  transform: translateY(-50%) rotate(133deg);
  border-color: #333;
}

.rotate-45 {
  transform: translateY(-50%) rotate(45deg);
}

.accordion-body {
  padding: 10px;
}
</style>
