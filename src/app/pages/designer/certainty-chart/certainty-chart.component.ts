import { Component, Input, OnInit } from '@angular/core';
import { Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// import am5index from "@amcharts/amcharts5/index";

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-certainty-chart',
  templateUrl: './certainty-chart.component.html',
  styleUrls: ['./certainty-chart.component.css'],
})
export class CertaintyChartComponent implements OnInit {
  private root!: am5.Root;

  @Input() certainty_data:any=[];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone
  ) {}

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      var root = am5.Root.new('chartdiv4');

      if(root._logo){
        root._logo.dispose();
      }

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      var chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          // wheelX: 'panX',
          // wheelY: 'zoomX',
          paddingLeft: 0,
          layout: root.verticalLayout,
        })
      );


       var yRenderer = am5xy.AxisRendererY.new(root,{
            inversed: true,
            cellStartLocation: 0.1,
            cellEndLocation: 0.9,
            minorGridEnabled: true,
            visible:false
       });

       yRenderer.labels.template.set('visible',false);

      var yAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: 'name',
          renderer: yRenderer,
        })
      );

      yAxis.data.setAll(this.certainty_data);

      var xRenderer=am5xy.AxisRendererX.new(root,{})
      xRenderer.labels.template.set('visible',false)

      var xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: xRenderer,
          min: 0,
        })
      );

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

        var series = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: 'Series',
            xAxis: xAxis,
            yAxis: yAxis,
            valueXField: 'value',
            categoryYField: 'name',
            sequencedInterpolation: true,
            legendLabelText:'{name}',
            legendValueText:'{value}',
            tooltip: am5.Tooltip.new(root, {
              pointerOrientation: 'horizontal',
              labelText: '[bold]{name}[/]\n{categoryY}: {valueX}',
            }),
          })
        );

        series.columns.template.setAll({
          height: am5.p100,
          strokeOpacity: 0,
        });

        series.bullets.push(function () {
          return am5.Bullet.new(root, {
            locationX: 1,
            locationY: 0.5,
            sprite: am5.Label.new(root, {
              centerY: am5.p50,
              text: '{valueX}',
              populateText: true,
            }),
          });
        });

        // series.bullets.push(function () {
        //   return am5.Bullet.new(root, {
        //     locationX: 1,
        //     locationY: 0.5,
        //     sprite: am5.Label.new(root, {
        //       centerX: am5.p100,
        //       centerY: am5.p50,
        //       text: '{name}',
        //       fill: am5.color(0xffffff),
        //       populateText: true,
        //     }),
        //   });
        // });

        series.data.setAll(this.certainty_data);
        series.appear();


        //remove grid
        xAxis.get("renderer").grid.template.setAll({
          location: 0,
          strokeWidth: 0,
          visible:false
        });
        yAxis.get("renderer").grid.template.setAll({
          strokeWidth: 0,
          visible:false
        });

        // series.columns.template
        //colors....



        //fill multiple color in xy
        series.columns.template.adapters.add("fill", function (_fill, target) {
          return chart.get("colors")?.getIndex(series.columns.indexOf(target));
        });

        chart.set("colors",am5.ColorSet.new(root,{
          colors : [
            am5.color(0x085298),
            am5.color(0x1168bb),
            am5.color(0x72abe1),
            am5.color(0x9ddaff),
            am5.color(0xddd3e3),
          ]
        }));


      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      var legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50,
          layout: am5.GridLayout.new(root, {
            maxColumns: 2,
            fixedWidthGrid: true
          }),
          nameField: "categoryY",
          marginTop:20,
        })
      );

      legend.markerRectangles.template.setAll({
        cornerRadiusTL: 0,
        cornerRadiusTR: 0,
        cornerRadiusBL: 0,
        cornerRadiusBR: 0,
      });
      legend.markers.template.setAll({width:15,height:15})
      legend.data.setAll(series.dataItems);


      chart.children.unshift(am5.Label.new(root, {
        text: 'Certainty',
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
        x: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: 0,
        paddingBottom: 0
      }));




      // Add cursor
      var cursor = chart.set(
        'cursor',
        am5xy.XYCursor.new(root, {
          behavior: 'zoomY',
        })
      );
      cursor.lineY.set('forceHidden', true);
      cursor.lineX.set('forceHidden', true);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);
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
