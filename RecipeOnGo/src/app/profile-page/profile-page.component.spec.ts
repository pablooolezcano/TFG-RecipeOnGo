import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfilePageComponent } from './profile-page.component';
import { Router } from '@angular/router';
describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle logOut', () => {
    spyOn(localStorage, 'removeItem');
    const navigateSpy = spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));

    component.logOut();

    expect(localStorage.removeItem).toHaveBeenCalledWith('user_login_uid');
    expect(component.userEmail).toEqual('');
    expect(component.userName).toEqual('');
    expect(navigateSpy).toHaveBeenCalledWith('/home');
  });

  it('should handle getActualFirebaseUser', () => {

    const authMock = {
      onAuthStateChanged: (callback: (user: any) => void) => {
        // Simular un usuario autenticado
        callback({ displayName: 'Test User' });
      }
    };
    component.getActualFirebaseUser(authMock);

    expect(component.userName).toBe('Test User');
  });
});
