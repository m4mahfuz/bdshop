<template>
    <div class="container">
    <!-- <h1> Testing Chart </h1> -->

    <div class="flex flex-col justify-center items-center gap-4 bg-slate-50 p-4">
      <client-only>
        <div id="chart" class="w-full">
          <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
      </client-only>
      <span class="text-sm font-light">Figure: Monthly Orders</span>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
          series: [{
            name: 'Inflation',
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
          }],
          chartOptions: {
            chart: {
              height: 350,
              type: 'bar',
            },
            plotOptions: {
              bar: {
                borderRadius: 10,
                dataLabels: {
                  position: 'top', // top, center, bottom
                },
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val + "%";
              },
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ["#304758"]
              }
            },
            
            xaxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              position: 'bottom',
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              crosshairs: {
                fill: {
                  type: 'gradient',
                  gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  }
                }
              },
              tooltip: {
                enabled: true,
              }
            },
            yaxis: {
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
                formatter: function (val) {
                  return val + "%";
                }
              }
            
            },
            // title: {
            //   text: 'Monthly Inflation in Argentina, 2002',
            //   floating: true,
            //   offsetY: 330,
            //   align: 'center',
            //   style: {
            //     color: '#444'
            //   }
            // }
          },
          
        }
    },
    mounted() {
        // this.getDataForMonths(6);
    },    
    methods: {
        getDataForMonths(period) {
            this.$axios.$get(`/reports/categories/products-sales/${period}`)
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