import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { HeroesComponent } from './heroes.component';
// tslint:disable-next-line:import-blacklist
import { of } from 'rxjs';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { query } from '@angular/core/src/render3/query';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[routerLink]',
  // tslint:disable-next-line:use-host-property-decorator
  host: { '(click)': 'onClick()' }
})
// tslint:disable-next-line:directive-class-suffix
export class RouterLinkDirectiveStub {
  // tslint:disable-next-line:no-input-rename
  @Input('routerLink') linkParams: any;
  navigateTo: any = null;
  constructor() { }

  onClick() {
    this.navigateTo = this.linkParams;
  }
}

describe('HeroesComponent (deep test)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEREOS;

  beforeEach(() => {
    HEREOS = [
      {
        id: 1, name: 'SpiderDude', strength: 8
      },
      {
        id: 2, name: 'Wonderful woman', strength: 24
      },
      {
        id: 3, name: 'SuperDude', strength: 55
      }
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent,
        RouterLinkDirectiveStub
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });


  it('should render each hereo as a hereo component', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEREOS));

    // run ngOnInit()
    fixture.detectChanges();

    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

    expect(heroComponentDEs.length).toEqual(3);

    for (let index = 0; index < heroComponentDEs.length; index++) {
      expect(heroComponentDEs[index].componentInstance.hero).toEqual(HEREOS[index]);
    }
  });

  it(`should call heroService.deleteHero when the Hero Component's
      delete button is clicked`, () => {
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEREOS));

        // run ngOnInit()
        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        // This is just another way but we're dispatching the method from the child component

        // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

        // Yet another way
        heroComponents[0].triggerEventHandler('delete', null);

        // heroComponents[0].query(By.css('button')).triggerEventHandler('click', { stopPropagation: () => { } });

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEREOS[0]);
    });

  it('should add a new hero to the hero list when the the add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEREOS));
    fixture.detectChanges();

    const name = 'Mr. Ice';
    mockHeroService.addHero.and.returnValue(of({ id: 1, name: name, strength: 8 }));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);
  });

  it('should have the correct rout for the first hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEREOS));
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    const routerLink = heroComponents[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);

    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigateTo).toBe('/detail/1');
  });
});

