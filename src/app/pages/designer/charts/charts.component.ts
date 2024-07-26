import { Component, OnInit } from '@angular/core';
import { Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { ChartsService } from 'src/app/services/charts.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  private root!: am5.Root;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone, private chatsService:ChartsService) {
    
  }

  myEvent = new EventEmitter<any>();

  piechart1='chartdiv2'
  piechart2='chartdiv3'

  sales_ticket_per_owner:any=[]
  source_graph:any = []
  sales_request_data:any=[]
  certainty_data:any=[]
  sales_funnel:any=[]

  slideLeft:number=0;
  slideRight:number=5;


  sales_ticket_data_initial:any=[]

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
    this.myEvent.emit(this.chatsService.sales_ticket_per_owner.slice(this.slideLeft,this.slideRight));
      });
    }
  }

  ngOnInit(): void {
    this.source_graph=this.chatsService.source_graph;
    this.sales_request_data=this.chatsService.Sales_request_per_variant;
    this.certainty_data=this.chatsService.certainity;
    this.sales_funnel=this.chatsService.sales_funnel;
    this.sales_ticket_data_initial=this.chatsService.sales_ticket_per_owner;

    
  }

  updateChart(type:string){
    if (type=='right') {
      this.slideLeft+=1;
      this.slideRight+=1;
      this.myEvent.emit(this.sales_ticket_data_initial.slice(this.slideLeft,this.slideRight));
    }else if(type=='left' ){
      this.slideLeft-=1;
      this.slideRight-=1;
      this.myEvent.emit(this.sales_ticket_data_initial.slice(this.slideLeft,this.slideRight));
    }
  }


  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      let root = am5.Root.new("chartdiv");
      if(root._logo){
        root._logo.dispose();
      }

      root.setThemes([am5themes_Animated.new(root)]);

      let chart= root.container.children.push(
        am5xy.XYChart.new(root,{
          // panY:false,
          layout:root.verticalLayout
        })
      )

      var yRenderer = am5xy.AxisRendererY.new(root,{});

      yRenderer.labels.template.set('visible',false)
      // Create Y-axis
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: yRenderer
        })
      );

      // Create X-Axis
      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, {
            stroke: am5.color('#000'),
            strokeWidth:1,
            strokeOpacity:1
          }),
          categoryField: "user_name"
        })
      );

      this.myEvent.subscribe((val)=>{
        xAxis.data.setAll(val);
      })

      // Create series
      let series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "total_ticket",
          categoryXField: "user_name"
        })
      );

      this.myEvent.subscribe((val)=>{
        series1.data.setAll(val);

      })

      //remove grid ..............

      xAxis.get("renderer").grid.template.setAll({
        location: 0,
        strokeWidth: 0,
        visible:false
      });
      yAxis.get("renderer").grid.template.setAll({
        strokeWidth: 0,
        visible:false
      });

      chart.children.unshift(am5.Label.new(root, {
        text: "Sales ticket per Owner",
        fontSize: 25,
        fontWeight: "500",
        textAlign: "center",
        x: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: 0,
        paddingBottom: 0
      }));

      series1.set("fill", am5.color(0x0280f6))

      series1.columns.template.setAll({
        width: am5.percent(14),
      });
      
      //add backgroud and text color...........................

      // xAxis.get("renderer").labels.template.setAll({
      //   fill: root.interfaceColors.get("alternativeText")
      // });
      
      // xAxis.setAll({
      //   background: am5.Rectangle.new(root, {
      //     fill: root.interfaceColors.get("alternativeBackground"),
      //     fillOpacity: 0.7,
      //   })
      // });

      // Add legend
      // let legend = chart.children.push(am5.Legend.new(root, {}));
      // legend.data.setAll(chart.series.values);

      series1.columns.template.setAll({
        tooltipText:"{total_ticket}: [bold]{user_name}[/]",
        tooltipPosition:'pointer',
        cursorOverStyle:'pointer'
      }) 

      // Add cursor
      // let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));

      this.root = root;
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
