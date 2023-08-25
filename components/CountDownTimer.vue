<template>
  <div>
    <div class="flex gap-3 text-center md:text-xl text-white">
      <div v-if="dealType === 'weekly'">
        <div class="h-8 w-8 md:h-14 md:w-14 flex justify-center items-center font-semibold rounded-md bg-red-500">
          {{ prependZeroIfNeeded(days) }}
        </div>
        <div class="my-2 text-sm md:text-lg text-gray-500 font-medium uppercase">
          Days
        </div>
      </div>
      <div>
        <div class="h-8 w-8 md:h-14 md:w-14 flex justify-center items-center font-semibold rounded-md bg-red-500">
          {{ prependZeroIfNeeded(hours) }}
        </div>
        <div class="my-2 text-sm md:text-lg text-gray-500 font-medium uppercase">
          Hours
        </div>
      </div>
      <div>
        <div class="h-8 w-8 md:h-14 md:w-14 flex justify-center items-center font-semibold rounded-md bg-red-500">
          {{ prependZeroIfNeeded(minutes) }}
        </div>
        <div class="my-2 text-sm md:text-lg text-gray-500 font-medium uppercase">
          Mins
        </div>
      </div>
      <div>
        <div class="h-8 w-8 md:h-14 md:w-14 flex justify-center items-center font-semibold rounded-md bg-red-500">
          {{ prependZeroIfNeeded(seconds) }}
        </div>
        <div class="my-2 text-sm md:text-lg text-gray-500 font-medium uppercase">
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
      targetDate: null,
    };
  },
  mounted() {
    this.targetDate = this.stringToDate(this.countDownDate)
    this.startCountdown();
  },
  watch: {
    dealType(value) {
      clearInterval(this.countdownInterval);  
      this.targetDate = this.stringToDate(this.countDownDate)
      this.startCountdown();
    }
  },
  methods: {
    prependZeroIfNeeded(number) {
      if (number < 10 ) {
        return `0${number}`;
      }
      return number;
    },
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
