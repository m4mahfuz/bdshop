<template>
  <div class="container">
    <!-- <h1 class="text-2xl">Daily Deals</h1> -->
    <section class="timer">
        <p id="demo"></p>
    </section>
  </div>
</template>

<script>
export default {
    props: {
        countDownDate: {
            type: String
        },
        dealType: {
            type: String
        }
    },
  data () {
    return {
      countDown: null,
      timer: {
        days: null,
        hours: null,
        minutes: null,
        seconds: null,
      }
    }
  },
    mounted() {
        // var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();
        console.log(this.countDownDate);
        let dt = this.convertStringToDate(this.countDownDate)
        console.log(dt);
        let date = new Date();
        let days, hours, minutes, seconds;
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
        days = Math.floor(distance / (1000 * 60 * 60 * 24));
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
        // Output the result in an element with id="demo"
        // this.timer.days = days; 
        // this.timer.hours = hours; 
        // this.timer.minutes = minutes; 
        // this.timer.seconds = seconds; 
        document.getElementById("demo").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
            
        // If the count down is over, write some text 
        if (distance < 0) {
            // clearInterval(x);
            clearInterval(this.countDown);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
        }, 1000);
        // this.timer.days = days; 
        // this.timer.hours = hours; 
        // this.timer.minutes = minutes; 
        // this.timer.seconds = seconds; 
    },    
    beforeDestroy() {
      clearInterval(this.countDown);
    },
    methods: {
        convertStringToDate(dateString) {
            console.log(dateString);
            return;
            var dateParts = dateString.split(/[-, :]/); // Split the string at '-', ',', ':', and space characters

            // Extract the year, month, day, hour, minute, and AM/PM indicator
            var year = parseInt(dateParts[0]);
            var month = parseInt(dateParts[1]) - 1; // Months in JavaScript are zero-based (0-11)
            var day = parseInt(dateParts[2]);
            var hour = parseInt(dateParts[3]);
            var minute = parseInt(dateParts[4]);
            var ampm = dateParts[5].toLowerCase(); // Convert AM/PM to lowercase for easier comparison

            // Adjust the hour based on AM/PM indicator
            if (ampm === "pm" && hour < 12) {
            hour += 12;
            } else if (ampm === "am" && hour === 12) {
            hour = 0;
            }

            // Create the Date object
            var date = new Date(year, month, day, hour, minute);

            console.log(date);       
        }
    },
}
</script>

<style>

</style>