<template>
  <div id="app" class="container">
    <div>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
      sed diam nonumy eirmod tempor invidunt ut labore et dolore.
    </div>
    <transition-expand>
      <div v-if="expanded">
        Magna aliquyam erat, sed diam voluptua. At vero eos et
        accusam et justo duo dolores et ea rebum. Stet clita.
      </div>
    </transition-expand>
    <button @click="expanded = !expanded">
      {{ expanded ? `Shrink` : `Expand` }}
    </button>
  </div>
</template>
<script>

export default {
  data() {
    return {
      expanded: false
    }
  }
}

</script>
