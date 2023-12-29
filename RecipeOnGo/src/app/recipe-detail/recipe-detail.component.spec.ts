import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RecipeDetailComponent } from './recipe-detail.component';

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;
  let router: Router;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeDetailComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should handle recipe detail data from extras', () => {
  //   const data = {
  //     id: 123,
  //     title: 'Chicken Recipe',
  //     image: 'chicken.jpg',
  //     extendedIngredients: [/* ingredients here */],
  //     analyzedInstructions: {
  //       '0': { steps: [/* steps here */] },
  //     },
  //   };

  //   activatedRouteSpy.paramMap = of(paramMap);
  //   const navigation = {
  //     getCurrentNavigation: () => {
  //       return {
  //         extras: {
  //           state: {
  //             data: data,
  //           },
  //         },
  //       };
  //     },
  //   };

  //   spyOn(router, 'getCurrentNavigation').and.returnValue(navigation);

  //   component.ngOnInit();

  //   expect(component.recipeId).toBe(data.id);
  //   expect(component.recipeTitle).toBe(data.title);
  //   expect(component.imageUrl).toBe(data.image);
  //   expect(component.extendedIngredients).toEqual(data.extendedIngredients);
  //   expect(component.recipeIntructions).toEqual(data.analyzedInstructions['0']['steps']);
  //   expect(component.navFromFavs).toBe(true);
  // });
});
