<template>
  <div>
    <div class="flex gap-3 text-center">
      <div v-if="dealType === 'weekly'">
        <div class="h-12 w-12 flex justify-center items-center font-semibold rounded-md bg-white">
          {{ days }}
        </div>
        <div class="my-2 text-sm font-medium">
          Days
        </div>
      </div>
      <div>
        <div class="h-12 w-12 flex justify-center items-center font-semibold rounded-md bg-white">
          {{ hours }}
        </div>
        <div class="my-2 text-sm font-medium">
          Hours
        </div>
      </div>
      <div>
        <div class="h-12 w-12 flex justify-center items-center font-semibold rounded-md bg-white">
          {{ minutes }}
        </div>
        <div class="my-2 text-sm font-medium">
          Mins
        </div>
      </div>
      <div>
        <div class="h-12 w-12 flex justify-center items-center font-semibold rounded-md bg-white">
          {{ seconds }}
        </div>
        <div class="my-2 text-sm font-medium">
          Secs
        </div>
      </div>
    </div>    
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
  data() {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      countdownInterval: null,
      // targetDate: new Date("2023-12-31T23:59:59"), // Set your target date and time here
      targetDate: null,
    };
  },
  mounted() {
    this.targetDate = this.stringToDate(this.countDownDate)
    // console.log('td', this.targetDate);
    this.startCountdown();
  },
  methods: {
    stringToDate(dateString) {
      // console.log(dateString);
      // var dateString = "2023-06-24, 11:59 PM";

      // Parse the date string and convert it to a Unix timestamp
      var timestamp = Date.parse(dateString);

      // Create a new Date object using the timestamp
      var date = new Date(timestamp);

      // console.log(date);
      return date;
    },
    startCountdown() {
      this.updateCountdown(); // Call immediately to avoid initial delay

      this.countdownInterval = setInterval(() => {
        this.updateCountdown();
      }, 1000);
    },
    updateCountdown() {
      const now = new Date().getTime();
      const distance = this.targetDate.getTime() - now;

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance <= 0) {
        clearInterval(this.countdownInterval);
        // Countdown is finished, you can perform any desired actions here
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.countdownInterval);
  },
};
</script>
