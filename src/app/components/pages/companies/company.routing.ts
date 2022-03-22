import { Routes } from '@angular/router';
import { DailyTasksComponent } from './daily-tasks/daily-tasks.component';
import { EmployeesComponent } from './employees/employees.component';
import { FacilitiesComponent } from './facilities/facilities.component';

export const CompanyRoutes: Routes = [

    {
        path: 'employees',
        component: EmployeesComponent,
        data: {
            title: 'Employees'
        }
    },
    {
        path: 'daily-tasks',
        component: DailyTasksComponent,
        data: {
            title: 'Daily tasks'
        }
    },
    {
        path: 'facilities',
        component: FacilitiesComponent,
        data: {
            title: 'Faciities provided to employees'
        }
    },


];
