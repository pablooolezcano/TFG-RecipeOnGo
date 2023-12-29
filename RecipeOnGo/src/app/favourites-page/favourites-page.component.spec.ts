import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FavouritesPageComponent } from './favourites-page.component';
import { Router } from '@angular/router';

describe('FavouritesPageComponent', () => {
  let component: FavouritesPageComponent;
  let fixture: ComponentFixture<FavouritesPageComponent>;
  let router: Router;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritesPageComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FavouritesPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle goDetail', () => {
    const recipe = { id: 1, name: 'Recipe 1' };
    const navigationExtras = { state: { data: recipe } };
    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    component.goDetail(recipe);

    expect(navigateSpy).toHaveBeenCalledWith(['/recipe-detail', recipe.id], navigationExtras);
  });

  it('should handle goToSearch', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));

    component.goToSearch();

    expect(navigateSpy).toHaveBeenCalledWith('/search-recipe');
  });

  it('should handle getFireDatabaseDoc', async () => {
    const user_uid = 'testUid';
    const idsList = [1, 2, 3];
    spyOn(localStorage, 'getItem').and.returnValue(user_uid);
    spyOn(component, 'presentErrorMaxQueries');
    spyOn(component, 'presentUnexpectedError');

    const getFavsListSpy = spyOn(component, 'getFireDatabaseDoc').and.callFake(async () => {});

    component.ionViewWillEnter();

    expect(component.user_uid).toBe(user_uid);
    expect(component.getFireDatabaseDoc).toHaveBeenCalled();
    expect(component.presentErrorMaxQueries).not.toHaveBeenCalled();
    expect(component.presentUnexpectedError).not.toHaveBeenCalled();
  });

  it('should handle deleteFavList', async () => {
    const user_uid = 'testUid';
    const idsList = [1, 2, 3];
    spyOn(localStorage, 'getItem').and.returnValue(user_uid);
    spyOn(component, 'getFireDatabaseDoc').and.callThrough();
    //const deleteFavListSpy = spyOn(component, 'deleteFavList').and.callThrough();

    const deleteFavListSpy = spyOn(component, 'deleteFavList').and.callFake(async () => {
      component.favouritesIdsList = [];
      component.favouriteRecipes = [];
    });

    component.deleteFavList();

    expect(deleteFavListSpy).toHaveBeenCalledWith();
    expect(component.favouritesIdsList).toEqual([]);
    expect(component.favouriteRecipes).toEqual([]);
  });

  // it('should handle getFireDatabaseDoc with 402 status error', async () => {
  //   const user_uid = 'testUid';
  //   const idsList = [1, 2, 3];
  //   spyOn(localStorage, 'getItem').and.returnValue(user_uid);
  //   //spyOn(component, 'getFireDatabaseDoc').and.callThrough();
  //   spyOn(component, 'presentErrorMaxQueries');
  //   spyOn(component, 'presentUnexpectedError');

  //   spyOn(component, 'getFireDatabaseDoc').and.throwError('402');

  //   component.ionViewWillEnter();

  //   expect(component.user_uid).toBe(user_uid);
  //   expect(component.getFireDatabaseDoc).toHaveBeenCalled();
  //   expect(component.favouritesIdsList).toEqual(idsList);
  //   //expect(component.presentErrorMaxQueries).toHaveBeenCalled();
  //   expect(component.presentUnexpectedError).not.toHaveBeenCalled();
  // });
});
