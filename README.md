# angular6
## add hmr(gdi2290/angular-hmr#10268)
### 1. add environment.hmr.ts
```json
export const environment = {
    production: false,
    hmr: true
};
```

### 2. modify environment.prod.ts
```json
export const environment = {
    production: true,
+   hmr: false
};
```

### 3. modify environmonent.ts
```json
export const environment = {
    production: false,
+   hmr: false
    };
```

### 4. modify angular.json
```json
"architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/angular6",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "src/tsconfig.app.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.css"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true
            },
+           "hmr": {
+             "fileReplacements": [
+               {
+                 "replace": "src/environments/environment.ts",
+                 "with": "src/environments/environment.hmr.ts"
+               }
+             ]
+           }

"serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
    "options": {
    "browserTarget": "angular6:build"
    },
    "configurations": {
        "production": {
            "browserTarget": "angular6:build:production"
        },
+      "hmr": {
+           "browserTarget": "angular6:build:hmr"
+       }
    }
    },
```

### 5. modify package-lock.json
```json
    "@angular/router": {
        "version": "6.0.2",
        "resolved": "http://registry.npm.taobao.org/@angular/router/download/@angular/router-6.0.2.tgz",
        "integrity": "sha1-p8kldRrM7ebFtKg2kXClPzpIuUA=",
        "requires": {
          "tslib": "1.9.1"
        }
    },
+   "@angularclass/hmr": {
+       "version": "2.1.3",
+       "resolved": "https://registry.npmjs.org/@angularclass/hmr/-/hmr-2.1.3.tgz",
+       "integrity": "sha1-NOZY7T2jfyOwogDi2lqJvpK7IJ8=",
+       "dev": true
+    },
    "@ngtools/webpack": {...}
    ....
    "@types/selenium-webdriver": {
        "version": "2.53.43",
        "resolved": "http://registry.npm.taobao.org/@types/selenium-webdriver/download/@types/selenium-webdriver-2.53.43.tgz",
        "integrity": "sha1-LePXGIGbwgFldUxKWa+36YM/Zwc=",
        "dev": true
    },
+   "@types/webpack-env": {
+         "version": "1.13.6",
+         "resolved": "http://registry.npm.taobao.org/@types/webpack-env/download/@types/webpack-env-1.13.6.tgz",
+         "integrity": "sha1-Eo0WhafDTTHtFwEPyH1qEsHeaXY=",
+         "dev": true
+       },
```
### 6. modify package.json
```json
"scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
-   "e2e": "ng e2e"
+   "e2e": "ng e2e",
+   "hmr": "ng serve --hmr --configuration hmr"
},
  ...
"devDependencies": {
-    "@angular/compiler-cli": "^6.0.0",
     "@angular-devkit/build-angular": "~0.6.1",
-    "typescript": "~2.7.2",
     "@angular/cli": "~6.0.1",
+    "@angular/compiler-cli": "^6.0.0",
     "@angular/language-service": "^6.0.0",
+    "@angularclass/hmr": "^2.1.3",
     "@types/jasmine": "~2.8.6",
     "@types/jasminewd2": "~2.0.3",
     "@types/node": "~8.9.4",
+    "@types/webpack-env": "^1.13.6",
     "codelyzer": "~4.2.1",
     "jasmine-core": "~2.99.1",
     "jasmine-spec-reporter": "~4.2.1",
.....
"karma-jasmine-html-reporter": "^0.2.2",
     "protractor": "~5.3.0",
     "ts-node": "~5.0.1",
-    "tslint": "~5.9.1"
+    "tslint": "~5.9.1",
+    "typescript": "~2.7.2"
   }
 }
```
### 7. add src/hmr.ts
```typescript
import { NgModuleRef, ApplicationRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';

export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
  let ngModule: NgModuleRef<any>;
  module.hot.accept();
  bootstrap().then(mod => ngModule = mod);
  module.hot.dispose(() => {
    const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
    const elements = appRef.components.map(c => c.location.nativeElement);
    const makeVisible = createNewHosts(elements);
    ngModule.destroy();
    makeVisible();
  });
};
```

### 8. modify src/main.ts
```typescript
import { AppModule } from './app/app.module';
 import { environment } from './environments/environment';
 
+import { hmrBootstrap } from './hmr';
+
 if (environment.production) {
   enableProdMode();
 }
 
-platformBrowserDynamic().bootstrapModule(AppModule)
-  .catch(err => console.log(err));
+const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);
+console.log(environment)
+if (environment.hmr) {
+  if (module[ 'hot' ]) {
+    hmrBootstrap(module, bootstrap);
+  } else {
+    console.error('HMR is not enabled for webpack-dev-server!');
+    console.log('Are you using the --hmr flag for ng serve?');
+  }
+} else {
+  bootstrap();
+}
```

### 9. add src/typings.d.ts
```typescript
///<reference types="webpack-env" />
```

### 10. npm run hmr