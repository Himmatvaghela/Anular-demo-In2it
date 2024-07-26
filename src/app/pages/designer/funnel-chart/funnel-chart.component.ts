import { Component, Input, OnInit } from '@angular/core';
import { Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// import am5index from "@amcharts/amcharts5/index";

import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-funnel-chart',
  templateUrl: './funnel-chart.component.html',
  styleUrls: ['./funnel-chart.component.css']
})
export class FunnelChartComponent implements OnInit {

  private root!: am5.Root;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone
  ) {}

  @Input() sales_funnel_data:any=[];

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      var root = am5.Root.new('chartdiv5');

      if(root._logo){
        root._logo.dispose();
      }

      root.setThemes([
        am5themes_Animated.new(root)
      ]);
      
      
      // Create chart
      // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/
      let chart = root.container.children.push(am5percent.SlicedChart.new(root, {
        layout: root.horizontalLayout
      }));
      
      
      // Create series
      // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series
      let series = chart.series.push(am5percent.FunnelSeries.new(root, {
        name:'series',
        alignLabels: false,
        orientation: "vertical",
        valueField: "count",
        categoryField: "name",
        legendLabelText:'{percentage}',
        legendValueText:'',
        // x:am5.percent(-20),
        // width:150
      }));

      series.labels.template.setAll({
        fontSize: 15,
        fill: am5.color(0xfbf6f6),
        text: "{value}"
      });
      
      
      // Set data
      series.data.setAll(this.sales_funnel_data);

      
      
      // Play initial series animation

      series.appear();

      // Create legend

      let legend = chart.children.unshift(am5.Legend.new(root, {
        centerY: am5.p50,
        y: am5.p50,
        layout: am5.GridLayout.new(root, {
          maxColumns: 1,
          fixedWidthGrid: true,
        }),
        nameField:'category',
        clickTarget:'none'
      }));
      
      
      legend.data.setAll(series.dataItems);
      
      legend.valueLabels.template.set('visible',false)
      legend.labels.template.setAll({fontSize:16,fontWeight:'400',fill:am5.color(0x4e4c4c)})
      
      legend.itemContainers.template.setAll({paddingBottom:30,paddingTop:20})
      legend.markers.template.setAll({
        width:0,
        height:0
      })

      let legend2 = chart.children.push(am5.Legend.new(root, {
        centerY: am5.p50,
        y: am5.p50,
        layout: am5.GridLayout.new(root, {
          maxColumns: 1,
          fixedWidthGrid: true,
        }),
        clickTarget:'none'
      }));
      
      
      legend2.data.setAll(series.dataItems);

      legend2.labels.template.set('visible',false)
      legend2.labels.template.setAll({fontSize:16,fontWeight:'400',fill:am5.color(0x4e4c4c)})

      legend2.markers.template.setAll({
        width:0,
        height:0
      })

      legend2.itemContainers.template.setAll({paddingBottom:30,paddingTop:20})


      //to make right or left side of checkbox
      legend2.itemContainers.template.setAll({
        reverseChildren: true
      });

      // Make stuff animate on load
      chart.appear(1000, 100);
      
    })
  }


  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }

}
