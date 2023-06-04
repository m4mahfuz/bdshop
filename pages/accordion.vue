<template>
  <div class="container accordion">
    <div v-for="(item, index) in items" :key="index" class="accordion-item">
      <div class="accordion-header" @click="toggle(index)">
        {{ item.title }}
          <div class="arrow" :class="{ 'arrow-active': item.active }"></div>
      </div>
      <div class="accordion-body" v-show="item.active">
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

.accordion-header {
  background-color: #f1f1f1;
  padding: 10px;
  cursor: pointer;
}

.arrow {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%) rotate(133deg);
  width: 10px;
  height: 10px;
  border-top: 2px solid #333;
  border-right: 2px solid #333;
  transition: transform 0.2s ease-in-out;
}

.arrow-active {
  transform: translateY(-50%) rotate(45deg);
}

.accordion-body {
  padding: 10px;
}
</style>
