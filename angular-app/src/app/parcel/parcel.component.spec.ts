import { TestBed } from '@angular/core/testing';
import { ParcelComponent } from './parcel.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ParcelComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ParcelComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-parcel'`, () => {
    const fixture = TestBed.createComponent(ParcelComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-parcel');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ParcelComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-parcel app is running!');
  });
});
