import { Component, Input, OnInit } from '@angular/core';
import { Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// import am5index from "@amcharts/amcharts5/index";

import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  private root!: am5.Root;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) {}

  @Input() source_graph:any=[];
  @Input() piechart:any;

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


      let root = am5.Root.new(this.piechart);


      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
        am5themes_Animated.new(root)
      ]);

      if(root._logo){
        root._logo.dispose();
      }
      
      
      // Create chart
      let chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: this.piechart=='chartdiv2'?root.verticalLayout:root.horizontalLayout,
        innerRadius: am5.percent(70),
      }));

      //data according to input....parent data
      let category_fld=this.piechart=='chartdiv2'?'sourceName':'name';
      let value_fld=this.piechart=='chartdiv2'?'value':'count';
      
      
      // Create series
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
      let series = chart.series.push(am5percent.PieSeries.new(root, {
        valueField: value_fld,
        categoryField: category_fld,
        alignLabels: false,
        legendLabelText: this.piechart=='chartdiv2'?"{sourceName}":"{name}",
        legendValueText: this.piechart=='chartdiv2'?"{value}":"{count}"
      }));
      
      series.labels.template.setAll({
        textType: "circular",
        centerX: 0,
        centerY: 0,
        visible:false,
      });



      if (this.piechart=='chartdiv2') {
        series.get("colors")?.set("colors", [
          am5.color(0xe1c5f6),
          am5.color(0x9ddaff),
          am5.color(0x2279cb),
        ]);
        
      }else{
        series.get("colors")?.set("colors", [
          am5.color(0xddd3e3),
          am5.color(0x9ddaff),
          am5.color(0x72abe1),
          am5.color(0x1168bb),
          am5.color(0x085298),
        ]);
      }
      

      
      
      
      // Set data
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
      series.data.setAll(this.source_graph);
       
      
      // Create legend
      // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/

      if(this.piechart=='chartdiv2'){
        var legend = chart.children.unshift(am5.Legend.new(root, {
          centerX: am5.percent(50),
          x: am5.percent(50),
          clickTarget:'none',
          layout: root.horizontalLayout,
        }));
      }else{
        var legend = chart.children.push(am5.Legend.new(root, {
          centerY: am5.percent(50),
          y: am5.percent(50),
          clickTarget:'none',
          layout: root.verticalLayout,
          marginLeft:60
        }));
      }


      // pie chart click and hover event on columns and slice
      series.slices.template.states.create('hover',{scale:1,})
      series.slices.template.states.create('active',{shiftRadius:0,})

      
      //tooltip
      if (category_fld=='sourceName') {
        series.slices.template.setAll({'tooltipText':"{sourceName} : {value}"})
      }else{
        series.slices.template.setAll({'tooltipText':"{name} : {count}"})
      }
      

      legend.data.setAll(series.dataItems);

      chart.children.unshift(am5.Label.new(root, {
        text: this.piechart=='chartdiv2'? "Via Source":'Sales',
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
        x: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: 0,
      }));

      if(this.piechart=='chartdiv2'){
        legend.valueLabels.template.setAll({visible:false})
      }

      legend.markerRectangles.template.setAll({
        cornerRadiusTL: 10,
        cornerRadiusTR: 10,
        cornerRadiusBL: 10,
        cornerRadiusBR: 10
      });



// Play initial series animation
// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
  series.appear(1000, 100);

      

    });
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
