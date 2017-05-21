# i2b2-webclient-cas
This is a stock i2b2 1.7.05 web client patched with support for 
* delegating authentication to [Eureka! Clinical CAS](https://github.com/eurekaclinical/cas) or other CAS server that supports version 2 of the CAS protocol
* automated i2b2 account creation using the [Eureka! Clinical i2b2 Integration microservice](https://github.com/eurekaclinical/eurekaclinical-i2b2-integration-service)
* requiring users to sign an electronic data use agreement using [Eureka! Clinical User Agreement microservice](https://github.com/eurekaclinical/eurekaclinical-user-agreement-service)

The CAS-related code is adapted from similar code for an older version of i2b2 by Dan Connolly found at https://bitbucket.org/DanC/i2b2-webclient-cas.

## CAS implementations supported
We expect any full implementation of version 2 of the CAS protocol to work. In particular, the implementation must support proxying. The following implementations of CAS are known to work:
* [Eureka! Clinical CAS](https://github.com/eurekaclinical/cas), which is a patched version of [JASIG CAS version 3.5.2](https://wiki.jasig.org/display/CASUM/Home)
* [Shibboleth Identity Provider version 3](https://wiki.shibboleth.net/confluence/display/IDP30/Home) with CAS emulation turned on

## Installation
Coming soon...

## Configuration
When using these patches, the i2b2 project management module's user data table becomes an authorization table. The code authenticates the user with Eureka! CAS, and then it checks the user data table for the existence of the user's account before authorizing the user. Any passwords in the user data table are ignored.

## Licensing
This code is released under the i2b2 Software License version 2.1, available at https://www.i2b2.org/software/i2b2_license.html.
