import { enableProdMode, NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';

import { ParcelModule } from './parcel.module';
import { environment } from '../../environments/environment';
import { singleSpaPropsSubject } from '../../single-spa/single-spa-props';
const ngVersion = require('../../../package.json').dependencies['@angular/core']; // better just take the major version

if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    singleSpaPropsSubject.next(singleSpaProps);

    (window as any).plattform = (window as any).plattform || {};
    let platform = (window as any).plattform[ngVersion];
    if (!platform) {
      platform = platformBrowserDynamic(getSingleSpaExtraProviders());
      (window as any).plattform[ngVersion] = platform;
    }
    return platform.bootstrapModule(ParcelModule).catch((err: any) => console.error(err));
  },
  template: '<app-parcel />',
  NgZone,
});

export const name = 'angular-parcel';
export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
