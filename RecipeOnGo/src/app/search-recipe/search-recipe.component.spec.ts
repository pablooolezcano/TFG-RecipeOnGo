import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SpooncularApiService } from '../services/spooncular-api.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SearchRecipeComponent } from './search-recipe.component';

describe('SearchRecipeComponent', () => {
  let component: SearchRecipeComponent;
  let fixture: ComponentFixture<SearchRecipeComponent>;
  let apiService: SpooncularApiService;
  let router: Router;
  let alertController: AlertController;

  beforeEach(waitForAsync(() => {
    apiService = jasmine.createSpyObj('SpooncularApiService', [
      'getRandomRecipes',
      'getRecipes',
      'getAdvanceQueryRecipes',
    ]);
    router = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);
    alertController = jasmine.createSpyObj('AlertController', ['create']);
    
    TestBed.configureTestingModule({
      declarations: [ SearchRecipeComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set searchText when input text changes', () => {
    const inputText = 'chicken';
    const event = { detail: { value: inputText } };
    component.search(event);
    expect(component.searchText).toBe(inputText);
  });

  it('should handle empty search input', () => {
    const inputText = '';
    component.searchText = inputText;

    component.search({ detail: { value: inputText } });

    expect(apiService.getRecipes).not.toHaveBeenCalled();
  });

  it('should navigate to the recipe detail', () => {
    const item = { id: 123, title: 'Chicken Recipe', image: 'chicken.jpg' };
    const navigationExtras = { state: { data: item } };
    const routerSpy = TestBed.inject(Router);
    const routerNavigateSpy = spyOn(routerSpy, 'navigate');
    component.goDetail(item);
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/recipe-detail', item.id], navigationExtras);
  });
});
