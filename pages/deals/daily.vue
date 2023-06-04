<template>
  <div class="container">
    <h1 class="text-2xl">Daily Deals</h1>
    <section class="timer">
        <p id="demo"></p>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      countDown: null
    }
  },
    mounted() {
        // var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();
        let date = new Date();
        var countDownDate = new Date(date.getFullYear(), date.getMonth()+1, date.getDate(), 23, 59, 59).getTime();
        // console.log(countDownDate);
        // return;

        // Update the count down every 1 second
        // var x = setInterval(function() {
        this.countDown = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();
            
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
            
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
        // Output the result in an element with id="demo"
        document.getElementById("demo").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
            
        // If the count down is over, write some text 
        if (distance < 0) {
            // clearInterval(x);
            clearInterval(this.countDown);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
        }, 1000);
    },
    beforeDestroy() {
      clearInterval(this.countDown);
    }
}
</script>

<style>

</style>