import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should set loginEmail when input email changes', () => {
    const inputEmail = 'john@example.com';
    const event = { target: { value: inputEmail } };
    component.onInputEmail(event);
    expect(component.loginEmail).toBe(inputEmail);
  });

  it('should set loginPasswd when input password changes', () => {
    const inputPassword = 'secretPassword';
    const event = { target: { value: inputPassword } };
    component.onInputPassword(event);
    expect(component.loginPasswd).toBe(inputPassword);
  });
});
