import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AddComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      description: 'DC-Comics',
    },
    {
      id: 'Marvel Comics',
      description: 'Marvel-Comics',
    },
  ];

  hero: Hero = {
    id: '',
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private heroService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroService.getHeroById(id)))
      .subscribe((hero) => (this.hero = hero));
  }

  save() {
    if (this.hero.superhero.trim().length === 0) {
      return;
    }

    if (this.hero.id) {
      this.heroService.upgradeHero(this.hero).subscribe((hero) => {
        this.showSnackbar('Hero Upgraded');
      });
    } else {
      this.heroService.addHero(this.hero).subscribe((hero) => {
        this.router.navigate(['/heroes/edit/', hero.id]);
        this.showSnackbar('Hero Created');
      });
    }
  }

  delete() {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: this.hero,
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.heroService.deleteHero(this.hero.id).subscribe((res) => {
          this.router.navigate(['/heroes']);

          this.showSnackbar('Hero Deleted');
        });
      }
    });
  }

  showSnackbar(message: string) {
    this.snackbar.open(message, 'OK', {
      duration: 2500,
    });
  }
}
