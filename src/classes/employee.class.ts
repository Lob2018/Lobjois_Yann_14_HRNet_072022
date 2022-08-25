import EmployeeInterface from "../interfaces/employee.interface";

class Employee implements EmployeeInterface  {
    constructor (
     readonly firstName: string,
     readonly lastName: string,
     readonly startDate: string,
     readonly department: string,
     readonly dateOfBirth: string,
     readonly street: string,
     readonly city: string,
     readonly state: string,
     readonly zipCode: string,){}
   }
export default Employee