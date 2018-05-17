add hmr
1. add environment.hmr.ts
   export const environment = {
	production: false,
	hmr: true
   };
2. modify environment.prod.ts
	export const environment = {
	    production: true,
	++  hmr: false
	};

3. modify environmonent.ts
	export const environment = {
	    production: false,
	++  hmr: false
	};

4. modify angular.json
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
	++          "hmr": {
	++            "fileReplacements": [
	++              {
	++                "replace": "src/environments/environment.ts",
	++                "with": "src/environments/environment.hmr.ts"
	++              }
	++            ]
	++          }

	"serve": {
	    "builder": "@angular-devkit/build-angular:dev-server",
	    "options": {
	    "browserTarget": "angular6:build"
	    },
	    "configurations": {
	        "production": {
	            "browserTarget": "angular6:build:production"
	        },
	++     "hmr": {
	++          "browserTarget": "angular6:build:hmr"
	++      }
	    }
	},
