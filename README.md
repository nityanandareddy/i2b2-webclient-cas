# i2b2-webclient-cas

[Georgia Clinical and Translational Science Alliance (Georgia CTSA)](http://www.georgiactsa.org), [Emory University](http://www.emory.edu), Atlanta, GA

## What does it do?
This is a stock i2b2 1.7.09c web client patched with support for 
* delegating authentication to [Eureka! Clinical CAS](https://github.com/eurekaclinical/cas) or other CAS server that supports version 2 of the CAS protocol
* automated i2b2 account creation using the [Eureka! Clinical i2b2 Integration microservice](https://github.com/eurekaclinical/eurekaclinical-i2b2-integration-service)
* requiring users to sign an electronic data use agreement using [Eureka! Clinical User Agreement microservice](https://github.com/eurekaclinical/eurekaclinical-user-agreement-service)

The CAS-related code is adapted from similar code for an older version of i2b2 by Dan Connolly found at https://bitbucket.org/DanC/i2b2-webclient-cas.

## Version history
### Version 1.3
Updated to version 1.7.09c of the web client.

### Version 1.2
Updated to version 1.7.08 of the web client.

### Version 1.1
Commented out the Project Request plugin in the plugin registry list.

### Version 1.0.1
Removed an `alert` call that was there for debugging.

### Version 1.0
Initial release using version 1.7.05 of the web client.

## CAS implementations supported
We expect any full implementation of version 2 of the CAS protocol to work. In particular, the implementation must support proxying. The following implementations of CAS are known to work:
* [Eureka! Clinical CAS](https://github.com/eurekaclinical/cas), which is a patched version of [JASIG CAS version 3.5.2](https://wiki.jasig.org/display/CASUM/Home)
* [Shibboleth Identity Provider version 3](https://wiki.shibboleth.net/confluence/display/IDP30/Home) with CAS emulation turned on

## Requirements
See the [i2b2 Web Client Install guide](http://community.i2b2.org/wiki/display/getstarted/Chapter+7.+i2b2+Web+Client+Install) for requirements for the web client itself. The Eureka! Clinical components require:
* [Oracle Java JRE 8](http://www.oracle.com/technetwork/java/javase/overview/index.html)
* [Tomcat 7](https://tomcat.apache.org)
* One of the following relational databases:
  * [Oracle](https://www.oracle.com/database/index.html) 11g or greater
  * [PostgreSQL](https://www.postgresql.org) 9.1 or greater
  * [H2](http://h2database.com) 1.4.193 or greater (for testing)

## Installation
1) Install our patched i2b2 project management cell, [i2b2-pm-cas](https://github.com/eurekaclinical/i2b2-pm-cas).
2) Install [eurekaclinical-i2b2-integration-service](https://github.com/eurekaclinical/eurekaclinical-i2b2-integration-service).
3) Install [eurekaclinical-i2b2-integration-webapp](https://github.com/eurekaclinical/eurekaclinical-i2b2-integration-webapp) on the same host as the i2b2 web client.
4) Install [eurekaclinical-user-agreement-service](https://github.com/eurekaclinical/eurekaclinical-user-agreement-service).
5) Install [eurekaclinical-user-agreement-webapp](https://github.com/eurekaclinical/eurekaclinical-user-agreement-webapp) on the same host as the i2b2 web client.
6) Follow the [i2b2 Web Client Install guide](http://community.i2b2.org/wiki/display/getstarted/Chapter+7.+i2b2+Web+Client+Install) for installing the web client itself. The steps for installing our patched web client are identical.

## Configuration

### Configuring the web client
First, follow the configuration instructions for the web client and proxy in the [i2b2 Web Client Install guide](http://community.i2b2.org/wiki/display/getstarted/Chapter+7.+i2b2+Web+Client+Install).

### Pointing the webclient to your CAS server
Open the `i2b2_config_data.js` file, and add the following properties to your domain settings:
* `CAS_server`: the URL for your CAS server.
* `CAS_LOGOUT_TYPE`: either `CAS` or `LOCAL`, depending on whether you want the web client's `Logout` link to log the user out of CAS (`CAS`) or just log the user out of i2b2 (`LOCAL`).
* `EC_LOGOUT_LANDING_PAGE_URL`: for `LOCAL` logouts, the URL to load after the user's session has been ended.
* `EC_I2B2_INTEGRATION_URL`: the URL for your eurekaclinical-i2b2-integration-webapp.
* `EC_USER_AGREEMENT_URL`: optional URL for your eurekaclinical-user-agreement-webapp, if you want users to be redirected to it.
* `EC_SUPPORT_CONTACT`: optional email address to display when an error has occurred.

## Licensing
This code is released under the i2b2 Software License version 2.1, available at https://www.i2b2.org/software/i2b2_license.html.

