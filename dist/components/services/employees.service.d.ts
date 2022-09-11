import Employee from '../../interfaces/employee.interface';
declare const employeesService: {
    allEmployees: () => any;
    addEmployee: (employee: Employee) => void;
};
export default employeesService;
