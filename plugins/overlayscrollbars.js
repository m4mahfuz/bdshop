import Vue from 'vue';
import { OverlayScrollbarsPlugin } from 'overlayscrollbars-vue';

Vue.use(OverlayScrollbarsPlugin);
// let options = {
//   className: "os-theme-dark",  
//   sizeAutoCapable: true,
//   scrollbars: {
//     clickScrolling : true,
//     visibility: "visible",
//     autoHide: "never"
//   },  
// };

// Including this way because applying global options to OverlayScrollbars 
// on first build causes an error with server side rendering due to document is undefined.

// Vue.use(OverlayScrollbarsPlugin, options);
// if (process.server) {
//   Vue.use(OverlayScrollbarsPlugin);
// } else {
//   Vue.use(OverlayScrollbarsPlugin, options);
// }