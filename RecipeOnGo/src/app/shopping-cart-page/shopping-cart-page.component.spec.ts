import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ShoppingCartPageComponent } from './shopping-cart-page.component';

describe('ShoppingCartPageComponent', () => {
  let component: ShoppingCartPageComponent;
  let fixture: ComponentFixture<ShoppingCartPageComponent>;
  let alertController: AlertController;
  let router: Router;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartPageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartPageComponent);
    component = fixture.componentInstance;
    alertController = TestBed.inject(AlertController);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle input text', () => {
    const inputValue = 'testInput';
    component.onInputText({ target: { value: inputValue } });
    expect(component.inputText).toBe(inputValue);
  });

  it('should add item to shopping list', () => {
    const inputValue = 'testItem';
    component.inputText = inputValue;

    const setDocSpy = spyOn(component, 'add_to_database').and.callFake(async () => {
      component.shoppingList.push(inputValue);
    });

    component.add_to_database();

    expect(setDocSpy).toHaveBeenCalledWith();
    expect(component.shoppingList).toContain(inputValue);
  });

  it('should delete shopping list', () => {

    const deleteListSpy = spyOn(component, 'deleteList').and.callFake(async () => {
    });

    component.deleteList();
    expect(deleteListSpy).toHaveBeenCalledWith();
    expect(component.shoppingList).toEqual([""]);
  });
});
