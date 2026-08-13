import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Portfolio } from './portfolio/portfolio';
import { Appointment } from './appointment/appointment';
import { FaqPage } from './faq-page/faq-page';


export const routes: Routes = [
    { path: '', component: Home },
    { path: 'portfolio', component: Portfolio },
    { path: 'appointment', component: Appointment },
    { path: 'faqs', component: FaqPage },
];
