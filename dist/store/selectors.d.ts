import Employees from '../interfaces/employees.interface';
import Loading from '../interfaces/loading.interface';
export declare const selectLoading: (state: Loading) => boolean;
export declare const selectEmployees: (state: Employees) => import("../interfaces/employee.interface").default[];
