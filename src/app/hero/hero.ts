import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from "../header/header";

@Component({
  selector: 'app-hero',
  imports: [Header, RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
