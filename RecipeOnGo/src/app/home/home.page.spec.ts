import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values', () => {
    expect(component.userName).toBe('');
    expect(component.isLogged).toBeFalsy();
    expect(component.platform).toBe('');
  });

  it('should detect user login in ionViewWillEnter', () => {
    localStorage.setItem('user_login_uid', 'some_uid');
    component.ionViewWillEnter();
    expect(component.isLogged).toBeTruthy();
  });

  it('should detect no user login in ionViewWillEnter', () => {
    localStorage.removeItem('user_login_uid');
    component.ionViewWillEnter();
    expect(component.isLogged).toBeFalsy();
  });

  it('should get actual Firebase user', () => {
    const authMock = {
      onAuthStateChanged: (callback: (user: any) => void) => {
        // Simular un usuario autenticado
        callback({ displayName: 'Test User' });
      }
    };
    component.getActualFirebaseUser(authMock);
    expect(component.userName).toBe('Test User');
  });

  // it('should get device info', () => {
  //   component.getDeviceInfo();
  //   console.log(component.platform);
  //   // Simula una plataforma Web para este ejemplo
  //   expect(component.platform).toBe('web');
  // });
  
  // it('should get device info', () => {
  //   component.getDeviceInfo();
  //   // Simula una plataforma Android para este ejemplo
  //   expect(component.platform).toBe('android');
  // });
});
