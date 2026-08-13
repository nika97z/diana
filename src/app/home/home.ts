import { Component } from '@angular/core';
import { Hero } from "../hero/hero";
import { About } from '../about/about';
import { Portfolio } from "../portfolio/portfolio";
import { Faqs } from "../faqs/faqs";
import { Appointment } from "../appointment/appointment";

@Component({
  selector: 'app-home',
  imports: [Hero, About, Portfolio, Faqs, Appointment],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
