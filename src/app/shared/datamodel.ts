export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    title:string;
    dateOfBirth:string;
    projects:Projects[];
  }
export interface Projects{
  id:number;
  name:string;
  startDate:string;
  endDate:string;
  status:string;    
}