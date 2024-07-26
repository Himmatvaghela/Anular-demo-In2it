import { Injectable } from '@angular/core';
import {  tableData } from '../interface/server';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  headerSub = new BehaviorSubject({links:'My task',module:'My Menu'});

  constructor() { }

    setHeader(data:{links:string,module:string}){
      this.headerSub.next(data);
    }

    setData(data:tableData){
      let allData=JSON.parse(localStorage.getItem('tData') as string) || []
      allData.unshift(data)
      localStorage.setItem('tData',JSON.stringify(allData))
    }

    getTableData(){
      return JSON.parse(localStorage.getItem('tData') as string)  || []
    }

    deleteData(id:string){
      let allData=this.getTableData()
      let filteredData=allData.filter((val:tableData)=>{
        return val.id!=id
      })
      localStorage.setItem('tData',JSON.stringify(filteredData))
      return filteredData;
    }

    updateTableData(uData:tableData){
      const allData=this.getTableData()
      const index = allData.findIndex((val:tableData) => {
        return val.id == uData.id
      });
      
      if (index !== -1) {
          allData.splice(index, 1, uData);
      }
      localStorage.setItem('tData',JSON.stringify(allData))
      return allData;
    }

    
}
