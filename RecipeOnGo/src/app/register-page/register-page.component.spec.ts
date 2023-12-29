import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RegisterPageComponent } from './register-page.component';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;
  let router: Router;
  let routerSpy: jasmine.SpyObj<Router>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;
  beforeEach(waitForAsync(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);

    TestBed.configureTestingModule({
      declarations: [ RegisterPageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set registerName when input name changes', () => {
    const inputName = 'John Doe';
    const event = { target: { value: inputName } };
    component.onInputName(event);
    expect(component.registerName).toBe(inputName);
  });
  it('should set registerEmail when input email changes', () => {
    const inputEmail = 'john@example.com';
    const event = { target: { value: inputEmail } };
    component.onInputEmail(event);
    expect(component.registerEmail).toBe(inputEmail);
  });

  it('should set registerPasswd when input password changes', () => {
    const inputPassword = 'secretPassword';
    const event = { target: { value: inputPassword } };
    component.onInputPassword(event);
    expect(component.registerPasswd).toBe(inputPassword);
  });

});
