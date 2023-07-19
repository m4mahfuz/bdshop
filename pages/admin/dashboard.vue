<template>
    <div class="flex flex-col justify-center items-center gap-4 bg-slate-100 p-4">
      <h1 class="font-semibold text-xl text-sky-500">New Orders Received</h1>
      <client-only>
        <div id="chart" class="w-full">
          <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
      </client-only>
      <span class="text-sm font-light">Figure: Orders received for last 24 hours</span>
    </div>
</template>

<script>
export default {
    layout: 'dashboard',
    data() {
        return {
          series: [{
            name: 'Orders',
            data: [2, 3, 4, 10, 4, 3, 3, 2, 1, 0, 0, 0]
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
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ["#304758"]
              }
            },
            
            xaxis: {              
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
            //   tooltip: {
            //     enabled: true,
            //   }
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
                  // return val + "%";
                  return val;
                }
              }
            
            },            
          },
          period: 24
        }
    },
    mounted() {
        this.getDataForHours(this.period);
    },    
    methods: {
        getDataForHours(period) {
            this.$axios.$get(`/admin/reports/orders/hourely/received/${period}`)
            .then(response => {                
                this.updateChart(response.data)
            }).catch(error => {
                console.log(error);
            })
        },
         updateChart(data) {
            this.series = [{ data: data.orders}];

            this.chartOptions = {
                ...this.chartOptions,
                ...{
                    xaxis: {
                            categories: data.hours,
                            position: 'bottom',
                            // axisBorder: {
                            //     show: false
                            // },
                            // axisTicks: {
                            //     show: false
                            // },
                            // crosshairs: {
                            //     fill: {
                            //     type: 'gradient',
                            //     gradient: {
                            //         colorFrom: '#D8E3F0',
                            //         colorTo: '#BED1E6',
                            //         stops: [0, 100],
                            //         opacityFrom: 0.4,
                            //         opacityTo: 0.5,
                            //     }
                            //     }
                            // },
                            // tooltip: {
                            //     enabled: true,
                            // }
                    },
                },
            };
        }
    }    
}
</script>

<style>

</style>