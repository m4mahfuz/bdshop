<template>
  <section>

    <transition name="sidebar-transition">
    <!-- <div v-if="show" class="sidenav h-full bg-slate-50" :class="{ 'sidenav-extend': show, 'sidenav-transition': show }"> -->
    <div v-if="show" class="sidenav h-full bg-slate-50" :class="sidenavExtra">
      <slot></slot>                
    </div>
    </transition>
    <div v-if="show" class="offcanvas-overlay"></div>
  </section>
</template>

<script>
    // import { mapState, mapGetters, mapActions } from "vuex";
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },                       
            direction: {
                type: String,
                default: 'left'
            },                       
        },
        // data() {
        //     return {
        //         // 'sidenav-extend': this.show,
        //     }
        // },
        mounted() {
            console.log('Offcanvas Mounted');           
        },
        computed: {
          sidenavExtra() {
            return {
              'sidenav-left': this.direction === 'left',
              'sidenav-right': this.direction === 'right',
              'sidenav-extend': this.show, 
              'sidenav-transition': this.show
            }
          }
        },
        
        // methods: {        
        // }    
    }
</script>

<style scoped>
    .sidenav {
        /* height: 100%; */
        /* height: calc(100vh - 10px); */
        width: 0;
        position: fixed;
        z-index: 40;
        top: 0;
        /* left: 0; */
        /* right: 0; */
        /* background-color: rgb(174, 158, 158); */
        overflow-x: hidden;
        /* transition: width 2s; */
        /* padding-top: 60px; */        
    }    
    .sidenav-left {
      left: 0;
    }
    .sidenav-right {
      right: 0;
    }
    .sidenav-extend {
        width: 320px;
        box-sizing: border-box;
        box-shadow: -2px 0 12px 0 rgba(143,143,143,.38);
    }

    .sidenav a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 25px;
        color: #818181;
        display: block;
        transition: 0.3s;
    }

    .sidenav a:hover {
        color: #f1f1f1;
    }

    .sidenav .closebtn {
        position: absolute;
        top: 0;
        right: 25px;
        font-size: 36px;
        margin-left: 50px;
    }

    /* #main {
        transition: margin-left .5s;
        padding: 16px;
    } */

    @media screen and (max-height: 450px) {
        .sidenav {padding-top: 15px;}
        .sidenav a {font-size: 18px;}
    }
    /* button svg:hover {
    stroke:#ef4444;
    transition: all ease 0.3s;
    }

    button svg path {
    transition: all ease 0.3s;
    } */
    .offcanvas-overlay {
        position: fixed;
        z-index: 30;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        /* display: none; */
        background-color: rgba(0, 0, 0, 0.5);
    }
    .sidebar-transition-enter-active,
    .sidebar-transition-leave-active {
        transition: width 0.5s ease;
    }

    .sidebar-transition-enter,
    .sidebar-transition-leave-to {
        width: 0;
    }
</style>