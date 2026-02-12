## LittleBerry Library Management Database

This is a client-side SPA for LittleBerryLibrary, a cloud based database for small and mid-sized libraries.
The system is written in AngularJS and links to an API server which stores the data in a MS Sql database.  
The images are stored on Amazon S3

## The Database

THe database itself is extremely simple.  It consists of a book table, members table and a request table.

## Motivation

I have a small fraternal organization with a private library of 10k books in portuguese or from portuguese authors.  They needed a simple way to track the inventory as well as offer users the ability to request books online.  I found a number of "library" plugins for things like WordPress and a variety of systems that have been hacked together over the years, but honestly, there just isn't any basic lending library for private institutions.  LittleBerry should offer other developers a good starting point for their own

## Installation

Simply copy the files to the root of an public directory.  It's excusively client-side, so it can be on just about any service. 
The configiuration file /app/config.ts   will have all the codes necessary to access the server.  All you need is an account and you can use the LittleBerry Server.  That will give you all the APIs necessary to run an entire library.  However, it is hosted on one of our machines.  The server is in 2 parts, an API server and a database.  If you actually want your own install, I'll be happy to get you a copy, but they aren't public just yet.

## Security

### Server 
The system uses a custom session variable to control security.  Once you log in, you receive a 20 character token which is appended to the URL of each API call which accesses the server for a post/put/patch or any secured gets  (such as an account list).

Everything else is public.

### Webpages
The admin pages are hidden by setting the userlevel in a sessionStorage variable, but if someone were to mess with that directly, they'd be able to see the empty templates.  They can't do anything, but some people have a problem with that and try to lock stuff down at the server.  In my experience, I really don't care if people hack around in javascript and see empty templates.

 
## Contributors

Feel free to offer updates or suggestions.

## License

Copyright 2017 Daniel Morris

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

