<template>
  <div class="flex flex-col justify-center items-center gap-4 bg-slate-100 p-4">
    <!-- <h1> Testing Chart </h1> -->

    <!-- <div> -->
    <client-only>
        <div class="w-full">
            <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
    </client-only>
    <span class="text-sm font-light text-gray-700">Figure: Customer registration for {{period}} months.</span>
  </div>
</template>

<script>
export default {
    layout: 'dashboard',
    data() {
        return {
            series: [{
                name: "Users",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
            }],
            chartOptions: {
                chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
                },
                dataLabels: {
                enabled: false
                },
                stroke: {
                curve: 'straight'
                },
                title: {
                text: 'User Trends by Month',
                align: 'left'
                },
                grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
                },
                xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                }
            },
            period: 12,
        }
    },
    mounted() {
        this.getYearlyData(this.period);
    },    
    methods: {
        getYearlyData(period) {
            this.$axios.$get(`/admin/reports/users/registered/${period}`)
            .then(response => {                
                this.updateChart(response.data)
            }).catch(error => {
                console.log(error);
            })
        },
         updateChart(data) {
            this.series = [{ data: data.counts}];          

            this.chartOptions = {
            ...this.chartOptions,
            ...{
                xaxis: {
                    categories: data.months,
                //     labels: {
                //     style: {
                //     colors: ["red"],
                //     },
                // },
                },
                yaxis: {
                    title: {
                        text: 'Number of users'
                    },                
                },
            },
            };
        }
    }
}
</script>

<style>

</style>