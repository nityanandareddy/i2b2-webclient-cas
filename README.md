# i2b2-webclient-cas
This is a stock i2b2 1.7.05 web client patched with support for 
* delegating authentication to Eureka via its patched [JASIG CAS](http://jasig.github.io/cas/4.1.x/index.html) server module, found at https://github.com/eurekaclinical/cas
* automated i2b2 account creation using the [Eureka! Clinical i2b2 Integration microservice](https://github.com/eurekaclinical/eurekaclinical-i2b2-integration-service)
* requiring users to sign an electronic data use agreement using [Eureka! Clinical User Agreement microservice](https://github.com/eurekaclinical/eurekaclinical-user-agreement-service)

The CAS-related code is adapted from similar code for an older version of i2b2 by Dan Connolly found at https://bitbucket.org/DanC/i2b2-webclient-cas.

## Versions of CAS Supported
Eureka! currently uses a patched copy of CAS version 3.5.2. While these i2b2 patches have only been tested with Eureka!'s patched CAS, they likely also will work with stock CAS 3.5.2.

## Installation
Coming soon...

## Configuration
When using these patches, the i2b2 project management module's user data table becomes an authorization table. The code authenticates the user with Eureka! CAS, and then it checks the user data table for the existence of the user's account before authorizing the user. Any passwords in the user data table are ignored.

## Licensing
This code is released under the i2b2 Software License version 2.1, available at https://www.i2b2.org/software/i2b2_license.html.
