import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Card } from '@material-ui/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angTest';
  chartData:any;
  

  constructor(public http:HttpClient){
    //let url = '';
    // this.http.get(url).subscribe((res:any)=>{    //   
    //   if(res['status'] == 1){
    //     this.chartData = res[data]        
    //   }
    // })
    
  }

  ngOnInit() {
    am4core.useTheme(am4themes_animated);
  
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    
    if(typeof this.chartData === 'undefined')
    chart.data = [
      { date: new Date(2023, 0, 1), value: 150 },
      { date: new Date(2023, 0, 2), value: 250 },
      { date: new Date(2023, 0, 3), value: 350 },
      { date: new Date(2023, 0, 4), value: 400 },
      { date: new Date(2023, 0, 5), value: 500 }
    ];
    else
      chart.data = this.chartData;
  
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
  
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    //valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
  
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY.value}";
    series.strokeWidth = 2;
  
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
  
    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;
  }
  
   
}
