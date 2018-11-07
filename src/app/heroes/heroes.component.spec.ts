import { HeroesComponent } from './heroes.component';
// tslint:disable-next-line:import-blacklist
import { of } from 'rxjs';

describe('Heroes\Component', () => {
  let component: HeroesComponent;
  let HEREOS;
  let mockedService;

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

    mockedService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    component = new HeroesComponent(mockedService);
  });

  describe('delete', () => {
    it('should remove the indicated hero from the heroes list', () => {
      mockedService.deleteHero.and.returnValue(of(true));
      component.heroes = HEREOS;

      component.delete(HEREOS[2]);

      expect(component.heroes.length).toBe(2);
    });

    it('should call deleteHero with the correct hero', () => {
      mockedService.deleteHero.and.returnValue(of(true));
      component.heroes = HEREOS;

      component.delete(HEREOS[2]);

      expect(mockedService.deleteHero).toHaveBeenCalledWith(HEREOS[2]);
    });
  });

});
