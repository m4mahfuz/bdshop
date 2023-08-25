<template>
  <div>
    <nuxt-link to="/deals"  class="w-12 h-15 deals">
    <img class="w-12" src="~/assets/img/deals.png" alt="">        
    </nuxt-link>       
  </div>
  </template>
<script>
export default {

}
</script>

<style>
   .deals {    
    width: 90px;
    height: 90px;
    position: fixed;
    right: 35px;
    bottom: 50px;
    border-radius: 50px;
    background: linear-gradient(180deg,#89cffd 0,#d8ffdc 100%) no-repeat;
    box-shadow: 0 3px 6px rgba(0,0,41,.3);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    z-index: 2;
    cursor: pointer;
   } 
</style>