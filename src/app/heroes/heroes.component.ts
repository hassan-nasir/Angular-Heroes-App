import { MessageService } from './../messages.service';
import { HeroService } from './../hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes : Hero[];

  constructor(private heroservice:HeroService,private messageService:MessageService) {
    
   }
   getHeroes(): void {
    this.heroservice.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }
  ngOnInit() {
    this.getHeroes()
  }
  onSelect(hero: Hero): void {
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id} name=${hero.name}`)
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroservice.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroservice.deleteHero(hero).subscribe();
  }
}
