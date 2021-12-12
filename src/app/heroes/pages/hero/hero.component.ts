import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heroes.interface';

import { switchMap } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
      ,
      mat-card {
        margin-top: 20px;
      }
    `,
  ],
})
export class HeroComponent implements OnInit {
  hero!: Hero;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
      .subscribe((hero) => console.log((this.hero = hero)));
  }

  back() {
    this.router.navigate(['/heroes/listing']);
  }
}
