<template>
<div class="flex justify-between mb-8">
  <div class="text-3xl capitalize">{{crumbs[crumbs.length-1].title}}</div>
  <div class="pt-1">
    <ol
    vocab="http://schema.org/"
    typeof="BreadcrumbList"
    class="list-reset flex gap-2"
  >
    <li property="itemListElement" typeof="ListItem"
        :class="{clearContent: atDashboard}"
    >
      <NLink property="item" typeof="WebPage" to="/admin/dashboard">
        <span property="name">Dashboard</span>
      </NLink>
      <meta property="position" content="1" />
    </li>
    <li
      v-for="(crumb, index) in crumbs"
      :key="index"
      property="itemListElement"
      typeof="ListItem"
    >
      <NLink v-if="crumb.title !== 'dashboard'" property="item" typeof="WebPage" :to="crumb.path">
        <span property="name" class="capitalize">{{
          $route.fullPath === crumb.path && title !== null ? title : crumb.title
        }}</span>
      </NLink>
      <meta property="position" :content="index + 2" />
    </li>
  </ol>
  </div>
 </div> 
</template>

<script>
export default {
    props: {
        crumbs: Array,
        title: {
            type: String,
            default: null
        }  
    },
    computed: {
        atDashboard() {
            return this.crumbs.find(element => element.title === 'dashboard')
        }
    }
}
</script>

<style scoped>
ol {
  list-style: none;
}
li> a {
  /* display: inline; */
  color: #2563eb;
}
li> a:hover {
  color: #1d4ed8; 
}
li:after {
  /* content: ' » '; */
  content: ' > ';
  display: inline;
  font-size: 0.75rem;
  color: #6b7280; 
  /* color: #aaa; */
  /* padding: 0 0.0725em 0 0.15em; */
}
li:last-child:after {
  content: '';
}

li a.nuxt-link-exact-active.nuxt-link-active {
  color: #6b7280;
}

li:last-child a.nuxt-link-exact-active.nuxt-link-active {
  cursor: default;
  pointer-events: none;
  opacity: 0.75;
}

.clearContent:after{
    content: '';
}
</style>