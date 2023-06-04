<template>
  <div class="flex flex-col justify-center items-center gap-4 bg-slate-100 p-4">
    <client-only>
         <div id="chart">
        <apexchart type="pie" width="480" :options="chartOptions" :series="series"></apexchart>
      </div>
    </client-only>
    <span class="text-sm font-light text-gray-700">Figure: Category wise products sales for {{ period }} months</span>
  </div>
</template>

<script>
export default {
    layout: 'dashboard',
    data() {
        return {
          series: [44, 55, 13, 43, 22],
          chartOptions: {
            chart: {
              width: 480,
              type: 'pie',
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },
          period: 12,
        }
    },
    mounted() {
        this.getDataForMonths(this.period);
    },    
    methods: {
        getDataForMonths(period) {
            this.$axios.$get(`/admin/reports/categories/products-sales/${period}`)
            .then(response => {                
                this.updateChart(response.data)
            }).catch(error => {
                console.log(error);
            })
        },
         updateChart(data) {
            this.series = data.counts;          

            this.chartOptions = {
            ...this.chartOptions,
            ...{
                labels: data.categories,
            },
            };
        }
    }
    
}
</script>

<style>

</style>