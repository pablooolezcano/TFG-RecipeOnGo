import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FooterComponent } from './footer.component';
import { Device } from '@capacitor/device';
describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  //con Keyboard comentado estos funcionan (porq en web no esta el Keyboard plugin)

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLogged to true if user_login_uid exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('some_user_uid');

    component.ionViewWillEnter();

    expect(component.isLogged).toBe(true);
  });

  it('should set isLogged to false if user_login_uid does not exist', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    component.ionViewWillEnter();

    expect(component.isLogged).toBe(false);
  });

  it('should set isLogged to true if user_login_uid exists in ngOnInit', () => {
    spyOn(localStorage, 'getItem').and.returnValue('some_user_uid');

    component.ngOnInit();

    expect(component.isLogged).toBe(true);
  });

  it('should set isLogged to false if user_login_uid does not exist in ngOnInit', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    component.ngOnInit();

    expect(component.isLogged).toBe(false);
  });

    //hasta aqui

  // it('should set platform to "web" when Device plugin is not available', () => {
  //   spyOn(Device, 'getInfo').and.returnValue(Promise.resolve({ platform: 'web' }));

  //   component.getDeviceInfo();

  //   expect(component.platform).toBe('web');
  // });

  //estos no funcionan con el keyboard desactivado porq lo necesitan:
  // it('should handle keyboardDidShow event', () => {
  //   component.platform = 'android'; // For example, assuming it's not the web

  //   component.ngOnInit();

  //   expect(component.keyboardActive).toBe(false);
  //   expect(component.showFooter).toBe(true);

  //   // Simulate keyboardDidShow event
  //   component.changeShowFooter();

  //   expect(component.keyboardActive).toBe(true);
  //   expect(component.showFooter).toBe(false);
  // });

  // it('should handle keyboardDidHide event', () => {
  //   component.platform = 'android'; // For example, assuming it's not the web
  //   component.keyboardActive = true;

  //   component.ngOnInit();

  //   expect(component.keyboardActive).toBe(true);
  //   expect(component.showFooter).toBe(false);

  //   // Simulate keyboardDidHide event
  //   component.changeShowFooter();

  //   expect(component.keyboardActive).toBe(false);
  //   expect(component.showFooter).toBe(true);
  // });
});
