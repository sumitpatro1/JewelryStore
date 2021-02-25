# JewelryStore
This code repo includes the following:
1. UI Project - Angular 8/ PrimeNG lib/ scss
2. Backend - core3.1
  a. web api: REST /Web Api 2.0/ Jwt
  b. db proj: dapper
4. Database: localdb / sql express/ db script included in repo


Key notes:
1. Unit test cases added only for references, not included all unit test cases for code coverage as it would consume unnecessary time.
2. Used dapper instead of EntityFramework as it's much faster for small projects.
3. Used jwt, to ignore writing unnecessary code for encrypting(symmetric key to encrypt all tokens) the token(bearer), jwt will do it for us.
