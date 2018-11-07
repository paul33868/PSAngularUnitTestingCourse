import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { NO_ERRORS_SCHEMA, Input, Component } from '@angular/core';
import { HeroesComponent } from './heroes.component';
// tslint:disable-next-line:import-blacklist
import { of } from 'rxjs';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';

describe('HeroesComponent (shallow test)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEREOS;

  @Component({
    selector: 'app-hero',
    template: '<div> </div>'
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
    // @Output() delete = new EventEmitter();
  }

  beforeEach(() => {
    HEREOS = [
      {
        id: 1, name: 'SpiderDude', strength: 8
      },
      {
        id: 1, name: 'Wonderful woman', strength: 24
      },
      {
        id: 1, name: 'SuperDude', strength: 55
      }
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        FakeHeroComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ]
      // schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set hereos correctly from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEREOS));
    fixture.detectChanges();

    expect(fixture.componentInstance.heroes.length).toBe(3);
  });

  it('should create 1 li for eash hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEREOS));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
  });
});
