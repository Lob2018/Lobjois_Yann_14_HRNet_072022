import EmployeeInterface from "../interfaces/employee.interface";
declare class Employee implements EmployeeInterface {
    readonly firstName: string;
    readonly lastName: string;
    readonly startDate: string;
    readonly department: string;
    readonly dateOfBirth: string;
    readonly street: string;
    readonly city: string;
    readonly state: string;
    readonly zipCode: string;
    constructor(firstName: string, lastName: string, startDate: string, department: string, dateOfBirth: string, street: string, city: string, state: string, zipCode: string);
}
export default Employee;
