import { TestBed } from '@angular/core/testing';

import { ServerService } from './server.service';

describe('ServerService', () => {
  let service: ServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('set Headers for path location',()=>{
    let data={links:'Contact',module:'My Organization'}

    let emmitedData:{links:string,module:string}|undefined

    service.headerSub.subscribe((val)=>{
      emmitedData=val
    })

    service.setHeader(data);
    expect(emmitedData).toEqual(data)
  })

  describe('setData()',()=>{
    it('set tData when existing data not empty ',()=>{
      let tableDAta={
        dueDate: "2024-06-27",
        id: "nziy78d4o",
        priority: "High",
        solutionArea: "om",
        startDate: "2024-05-27",
        status: "Sheduled",
        task: "sdfs",
        taskId: "dsfds",
        workflow : "fodsifj"
      }
      let tableDataLength=service.getTableData().length

      service.setData(tableDAta);
      expect(service.getTableData().length).toBe(tableDataLength+1)

    })

    it('set tData when existing data is empty',()=>{
      let tableDAta={
        dueDate: "2024-06-27",
        id: "nziy78d4o",
        priority: "High",
        solutionArea: "om",
        startDate: "2024-05-27",
        status: "Sheduled",
        task: "sdfs",
        taskId: "dsfds",
        workflow : "fodsifj"
      }
      localStorage.removeItem('tData')

      let tableDataLength=service.getTableData().length
      service.setData(tableDAta);
  
      expect(service.getTableData().length).toBe(tableDataLength+1)
    })
  })
  
  // it('get tData when empty',()=>{
  //   localStorage.setItem('tData',JSON.stringify([]))
  //   expect(service.getTableData().length).toBe(0)
  // })

  it('delete table data by id',()=>{
    let tableData=[
      {
      dueDate: "2024-06-27",
      id: "nziy78d4o",
      priority: "High",
      solutionArea: "om",
      startDate: "2024-05-27",
      status: "Sheduled",
      task: "sdfs",
      taskId: "dsfds",
      workflow : "fodsifj"
    },
    {
      dueDate: "2024-06-27",
      id: "nziy78jot",
      priority: "High",
      solutionArea: "om",
      startDate: "2024-05-27",
      status: "Sheduled",
      task: "sdfs",
      taskId: "dsfds",
      workflow : "fodsifj"
    },
  ]
    localStorage.setItem('tData',JSON.stringify(tableData))
    let filteredDataLength=service.deleteData("nziy78d4o")

    expect(service.getTableData()).toEqual(filteredDataLength)
  })

  describe('updataTableData()',()=>{
    it('replace one data',()=>{
      let tableData=[
        {
        dueDate: "2024-06-27",
        id: "nziy78d4o",
        priority: "High",
        solutionArea: "om",
        startDate: "2024-05-27",
        status: "Sheduled",
        task: "sdfs",
        taskId: "dsfds",
        workflow : "fodsifj"
      },
      {
        dueDate: "2024-06-27",
        id: "nziy78jot",
        priority: "High",
        solutionArea: "om",
        startDate: "2024-05-27",
        status: "Sheduled",
        task: "sdfs",
        taskId: "dsfds",
        workflow : "fodsifj"
      },
    ]
      localStorage.setItem('tData',JSON.stringify(tableData))
      
      let uData={
        dueDate: "2024-06-27",
        id: "nziy78jot",
        priority: "High",
        solutionArea: "Ram",
        startDate: "2024-05-27",
        status: "Sheduled",
        task: "sdfs",
        taskId: "dsfds",
        workflow : "fodsifj"
      }

      let beforeUpdataData=service.getTableData().filter((val:any)=>{
        return val.id=uData.id
      })
      service.updateTableData(uData)
      expect(beforeUpdataData).not.toEqual(uData)

    })
  })
});
