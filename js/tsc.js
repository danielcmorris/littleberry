var Application;
(function (Application) {
    var Controllers;
    (function (Controllers) {
        var MainCtrl = (function () {
            function MainCtrl($route, $routeParams, $location) {
                this.$route = $route;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.$insert = ['$route', '$routeParams', '$location'];
                var v = new Application.Config.version();
                console.log(v);
                this.Title = "PFSA Library Version " + v.number;
            }
            return MainCtrl;
        }());
        Controllers.MainCtrl = MainCtrl;
        app.controller("MainCtrl", MainCtrl);
    })(Controllers = Application.Controllers || (Application.Controllers = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Config;
    (function (Config) {
        var version = (function () {
            function version() {
                this.author = "Morris Development";
                this.supportContact = "dmorris@morrisdev.com";
                this.apiKey = "dswejkdfkui8yoihkjnlj98776tsad87sd9809fdijsnekjjdsoidjs";
                this.apiServer = "http://localhost:53035/";
                this.number = "1.8";
                var path = window.location.host;
                if (path.substring(0, 5) === "local") {
                    this.apiServer = "http://localhost:53035";
                }
                else {
                    this.apiServer = "https://pfsaapi.azurewebsites.net";
                }
            }
            return version;
        }());
        Config.version = version;
        var httpConfig = (function () {
            function httpConfig($httpProvider) {
                this.$httpProvider = $httpProvider;
                this.$insert = ["$httpProvider"];
                this.$httpProvider.defaults.useXDomain = true;
                this.$httpProvider.defaults.withCredentials = false;
                delete this.$httpProvider.defaults.headers.common["X-Requested-With"];
            }
            return httpConfig;
        }());
        Config.httpConfig = httpConfig;
        app.config(httpConfig);
        var templates = (function () {
            function templates() {
                this.library = ROOT_PATH + "app/pages/index/library.html";
                this.home = ROOT_PATH + "app/pages/home/home.html";
                this.author = ROOT_PATH + "app/pages/author/author.html";
                this.book = ROOT_PATH + "app/pages/book/book.html";
                this.subjects = ROOT_PATH + "app/pages/subjects/subjects.html";
                this.account = ROOT_PATH + "app/pages/account/account.html";
                this.navbar = ROOT_PATH + "app/pages/navbar/navbar.html";
                this.reservation = ROOT_PATH + "app/pages/reservation/reservation.html";
                this.requests = ROOT_PATH + "app/pages/requests/requests.html";
                this.recentAdditions = ROOT_PATH + "app/pages/library/recentAdditions/recentAdditions.html";
                this.myRequests = ROOT_PATH + "app/pages/requests/my-requests.html";
                this.bookTile = ROOT_PATH + "app/pages/library/book/bookTile.html";
                this.address = ROOT_PATH + "app/components/address/address.html";
                this.assets = ROOT_PATH + "app/components/assets/assets.html";
                this.cashNeeds = ROOT_PATH + "app/components/cashNeeds/cashNeeds.html";
                this.contact = ROOT_PATH + "app/components/contact/contact.html";
                this.contactUs = ROOT_PATH + "app/components/contact-us/contact-us.html";
                this.dependants = ROOT_PATH + "app/components/dependants/dependants.html";
                this.income = ROOT_PATH + "app/components/income/income.html";
                this.insurance = ROOT_PATH + "app/components/insurance/insurance.html";
                this.liabilities = ROOT_PATH + "app/components/liabilities/liabilities.html";
                this.librarySearch = ROOT_PATH + "app/components/library-search/library-search.html";
                this.needs = ROOT_PATH + "app/components/needs/needs.html";
                this.objectives = ROOT_PATH + "app/components/objectives/objectives.html";
                this.pension = ROOT_PATH + "app/components/pension/pension.html";
                this.primaryContact = ROOT_PATH + "app/components/primaryContact/primaryContact.html";
                this.rateAssumptions = ROOT_PATH + "app/components/rateAssumptions/rateAssumptions.html";
                this.receipts = ROOT_PATH + "app/components/receipts/receipts.html";
                this.savings = ROOT_PATH + "app/components/savings/savings.html";
                this.socialSecurityOverride = ROOT_PATH + "app/components/socialSecurityOverride/socialSecurityOverride.html";
                this.spousalContact = ROOT_PATH + "app/components/spousalContact/spousalContact.html";
                this.survivorNeeds = ROOT_PATH + "app/components/survivorNeeds/survivorNeeds.html";
                this.mailingList = ROOT_PATH + "app/components/mailingList/mailingList.html";
                this.madlibs = ROOT_PATH + "app/components/madlibs/madlibs.html";
                this.hangMan = ROOT_PATH + "app/components/hangman/hangman.html";
                this.requestQuote = ROOT_PATH + "app/components/request-quote/request-quote.html";
                this.refer = ROOT_PATH + "app/components/refer/refer.html";
                var v = new version();
                this.library += "?v=" + v.number;
                this.book += "?v=" + v.number;
            }
            templates.prototype.GetUrl = function (templateName) {
                var s = this;
                switch (templateName) {
                    case 'address':
                        return s.address;
                    case 'mailingList':
                        return s.mailingList + "?v=" + new Date();
                    case 'requestQuote':
                        return s.requestQuote + "?v=" + new Date();
                    case 'refer':
                        return s.refer + "?v=" + new Date();
                    default:
                        console.log("ERROR: TEMPLATE " + templateName + " NOT FOUND");
                        return 'ERROR';
                }
            };
            return templates;
        }());
        Config.templates = templates;
        app.service("templates", templates);
    })(Config = Application.Config || (Application.Config = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Config;
    (function (Config) {
        var routes = (function () {
            function routes($routeProvider, $locationProvider) {
                this.$routeProvider = $routeProvider;
                this.$locationProvider = $locationProvider;
                this.$insert = ['$routeProvider', '$locationProvider', '$location'];
                this.$routeProvider
                    .when('/login', {
                    template: '<navbar></navbar><login-page></login-page>'
                })
                    .when('/', {
                    template: '<navbar></navbar><home></home>'
                })
                    .when('/home', {
                    template: '<navbar></navbar><home></home>'
                })
                    .when('/member/join', {
                    template: '<navbar></navbar><account mode="\'join\'"></account>'
                })
                    .when('/member/requests', {
                    template: '<navbar></navbar><my-requests></myrequests>'
                })
                    .when('/member/', {
                    template: '<navbar></navbar><profile></profile>'
                })
                    .when('/member/welcome', {
                    template: '<navbar></navbar><home></home>'
                })
                    .when('/library/catalog', {
                    template: '<navbar></navbar><library mode="\'full\'"></library>'
                })
                    .when('/library/recent', {
                    template: '<navbar></navbar><library mode="\'recent\'"></library>'
                })
                    .when('/library/subject/:prefix', {
                    template: '<navbar></navbar><library mode="\'subject\'"></library>'
                })
                    .when('/library/author', {
                    template: '<navbar></navbar><author mode="\'list\'"></author>'
                })
                    .when('/library/author/:author', {
                    template: '<navbar></navbar><library mode="\'author\'"></library>'
                })
                    .when('/library/catalog/add', {
                    template: '<navbar></navbar><book></book>'
                })
                    .when('/library/catalog/:prefix', {
                    template: '<navbar></navbar><library></library>'
                })
                    .when('/library/catalog/request/:prefix/:booknumber', {
                    template: '<navbar></navbar><reservation></reservation>'
                })
                    .when('/library/catalog/:mode/:prefix/:booknumber', {
                    template: '<navbar></navbar><book></book>'
                })
                    .when('/library/advanced', {
                    template: '<navbar></navbar><reservation></reservation>'
                })
                    .when('/library/requests', {
                    template: '<navbar></navbar><requests></requests>'
                })
                    .when('/library/requests/:mode/:prefix/:booknumber', {
                    template: '<navbar></navbar><requests></requests>'
                })
                    .when('/library/requests/:modem', {
                    template: '<navbar></navbar><requests></requests>'
                })
                    .when('/library/subjects', {
                    template: '<navbar></navbar><subjects></subjects>'
                })
                    .when('/library/accounts/add', {
                    template: '<navbar></navbar><account mode="\'add\'"></account>'
                })
                    .when('/library/accounts/:accountid', {
                    template: '<navbar></navbar><account mode="\'edit\'"></account>'
                })
                    .when('/library/accounts', {
                    template: '<navbar></navbar><account mode="\'list\'"></account>'
                })
                    .when('/library/preview/:barcode', {
                    template: '<book-preview></book-preview>'
                })
                    .when('/library/recent-additions', {
                    template: '<recent-additions></recent-additions>'
                })
                    .otherwise({ redirectTo: '/' });
                ;
                this.$locationProvider.html5Mode(false);
            }
            return routes;
        }());
        Config.routes = routes;
        app.config(routes);
    })(Config = Application.Config || (Application.Config = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Models;
    (function (Models) {
        var Account = (function () {
            function Account() {
            }
            return Account;
        }());
        Models.Account = Account;
    })(Models = Application.Models || (Application.Models = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Context;
    (function (Context) {
        var NavigationPermissions = (function () {
            function NavigationPermissions(AccountType) {
                this.AddTitle = false;
                this.EditTitle = false;
                this.AddRequest = false;
                this.Requests = false;
                this.SearchRequest = false;
                this.Members = false;
                this.Subjects = false;
                this.LoggedIn = false;
                switch (AccountType) {
                    case 'Admin':
                        this.AddTitle = true;
                        this.EditTitle = true;
                        this.AddRequest = true;
                        this.Subjects = true;
                        this.LoggedIn = true;
                        this.Members = true;
                        this.Requests = true;
                        break;
                    case 'Member':
                        this.AddRequest = true;
                        this.LoggedIn = true;
                    default:
                        break;
                }
            }
            return NavigationPermissions;
        }());
        Context.NavigationPermissions = NavigationPermissions;
    })(Context = Application.Context || (Application.Context = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Models;
    (function (Models) {
        var Request = (function () {
            function Request() {
            }
            return Request;
        }());
        Models.Request = Request;
    })(Models = Application.Models || (Application.Models = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Components;
    (function (Components) {
        var Crumbs = (function () {
            function Crumbs() {
            }
            return Crumbs;
        }());
        Components.Crumbs = Crumbs;
        app.component("crumbs", {
            controller: Crumbs,
            bindings: { links: '<' },
            controllerAs: "vm",
            template: "\n        <ul class=\"breadcrumb\">\n            <li ng-repeat=\"bc in vm.links\">\n                <a ng-if=\"bc.url!=''\" ng-href=\"{{bc.url}}\">{{bc.text}}</a>\n                <span  ng-if=\"bc.url==''\">{{bc.text}}</span>\n            </li>\n        </ul>\n        \n   \n        "
        });
    })(Components = Application.Components || (Application.Components = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Components;
    (function (Components) {
        var Account = (function () {
            function Account($location, libraryService, $routeParams, $mdDialog, $mdToast, $sessionStorage) {
                this.$location = $location;
                this.libraryService = libraryService;
                this.$routeParams = $routeParams;
                this.$mdDialog = $mdDialog;
                this.$mdToast = $mdToast;
                this.$sessionStorage = $sessionStorage;
                this.setPassword = false;
                this.showHints = true;
                this.$insert = ['$location', 'libraryService', '$routeParams', '$mdDialog', '$mdToast', '$sessionStorage'];
            }
            Account.prototype.$onInit = function () {
                var _this = this;
                var l = this.libraryService;
                var aid = 0;
                this.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
                    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
                    'WY').split(' ').map(function (state) {
                    return { abbrev: state };
                });
                if (this.mode === 'add' || this.mode === 'join') {
                    this.account = new Application.Models.Account();
                    this.account.Status = 'Active';
                    this.account.AccountType = 'Member';
                    this.account.Country = 'United States';
                    this.account.Password = 'password';
                    this.setPassword = true;
                }
                if (this.mode == 'edit') {
                    aid = this.$routeParams.accountid;
                    l.getAccount(aid)
                        .then(function (resp) {
                        _this.account = resp.data;
                    });
                }
                if (this.mode == 'list') {
                    l.getAccounts()
                        .then(function (resp) { _this.accounts = resp; });
                }
            };
            Account.prototype.editAccount = function (obj) {
                this.go('/library/accounts/' + obj.AccountId);
            };
            Account.prototype.ChangePassword = function (ev) {
                this.$mdDialog.show({
                    contentElement: '#myDialog',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                });
            };
            Account.prototype.CancelPassword = function () {
                this.$mdDialog.hide();
            };
            Account.prototype.UpdatePassword = function (password) {
                this.account.Password = password;
                this.SaveUser(3);
            };
            Account.prototype.Toast = function (msg, secs) {
                secs = secs * 1000;
                this.$mdToast.show(this.$mdToast.simple()
                    .capsule(true)
                    .textContent(msg)
                    .position('top right')
                    .hideDelay(secs));
            };
            Account.prototype.Delete = function () {
                var a = this.account;
                var msg = 'Are you sure you want to delete ' + a.FirstName + ' ' + a.LastName + '\'s account?';
                if (confirm(msg)) {
                    this.account.Status = 'Deleted';
                    this.Toast("Deleting Account...", 2);
                    this.SaveUser(1);
                }
            };
            Account.prototype.SaveUser = function (saveType) {
                var _this = this;
                var l = this.libraryService;
                this.Toast("Saving...", 2);
                l.SaveAccount(this.account)
                    .then(function (resp) {
                    if (saveType === 0) {
                        _this.Toast("Saved", 2);
                        _this.account = resp.data;
                        return;
                    }
                    if (saveType === 4) {
                        _this.Toast("Saved", 2);
                        _this.account = resp.data;
                        _this.$sessionStorage.myaccount = _this.account;
                        _this.$location.url('/#/members/welcome');
                    }
                    if (saveType === 1)
                        _this.go('/library/accounts/');
                    if (saveType === 2)
                        _this.go('/library/accounts/add');
                    if (saveType === 3)
                        _this.$mdDialog.hide();
                });
            };
            Account.prototype.go = function (url) {
                this.$location.url(url);
            };
            Account.prototype.AddAccount = function () {
                this.go('/library/accounts/add');
            };
            return Account;
        }());
        Components.Account = Account;
        app.component("account", {
            controller: Account,
            bindings: { accountId: '<', mode: '<' },
            controllerAs: "vm",
            templateUrl: function (templates) { return templates.account; }
        });
    })(Components = Application.Components || (Application.Components = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Components;
    (function (Components) {
        var Author = (function () {
            function Author($location, $sessionStorage, libraryService, $filter) {
                this.$location = $location;
                this.$sessionStorage = $sessionStorage;
                this.libraryService = libraryService;
                this.$filter = $filter;
                this.$insert = ['$location', '$sessionStorage', 'libraryService',
                    '$filter'];
                this.searchResults = false;
                this.spinner = false;
            }
            Author.prototype.$onInit = function () {
                console.log('Author, mode=' + this.mode);
                this.links = [{ "url": "/#/library", "text": "home" }, { "url": "", "text": "authors" }];
                this.GetAuthors();
            };
            Author.prototype.GetAuthor = function (author) {
                this.go("library/authors/" + author.Author);
            };
            Author.prototype.ClearSearch = function () {
                this.searchResults = false;
                this.authorList = true;
                this.searchText = '';
                this.pageTitle = this.authors.length + ' Authors Found';
            };
            Author.prototype.GetAuthors = function () {
                var _this = this;
                this.spinner = true;
                if (this.$sessionStorage.authors) {
                    this.authors = this.$sessionStorage.authors;
                    this.spinner = false;
                    this.authorList = true;
                    this.pageTitle = this.authors.length + ' Authors Found';
                }
                else {
                    this.libraryService.getAuthorsByBookCount(1)
                        .then(function (resp) {
                        _this.spinner = false;
                        _this.authors = resp;
                        _this.$sessionStorage.authors = _this.authors;
                        _this.authorList = true;
                        _this.pageTitle = _this.authors.length + ' Authors Found';
                    });
                }
            };
            Author.prototype.go = function (url) {
                this.$location.url(url);
            };
            Author.prototype.SearchKey = function (keyEvent) {
                if (keyEvent.which === 13) {
                    this.SearchAuthors();
                }
            };
            Author.prototype.SearchAuthors = function () {
                this.searchResults = false;
                this.spinner = true;
                this.authorList = false;
                this.filteredList = this.$filter('filter')(this.authors, { "Author": this.searchText });
                this.spinner = false;
                this.pageTitle = this.filteredList.length + ' Authors Found';
                this.searchResults = true;
                console.log(this.authors);
            };
            return Author;
        }());
        Components.Author = Author;
        app.component("author", {
            controller: Author,
            bindings: { mode: '<' },
            controllerAs: "vm",
            templateUrl: function (templates) { return templates.author; },
        });
    })(Components = Application.Components || (Application.Components = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Components;
    (function (Components) {
        var BlankTemplate = (function () {
            function BlankTemplate($location, $sessionStorage, libraryService) {
                this.$location = $location;
                this.$sessionStorage = $sessionStorage;
                this.libraryService = libraryService;
                this.$insert = ['$location', '$sessionStorage', 'libraryService'];
            }
            BlankTemplate.prototype.$onInit = function () {
                console.log('Blank Startup');
            };
            BlankTemplate.prototype.go = function (url) {
                this.$location.url(url);
            };
            return BlankTemplate;
        }());
        Components.BlankTemplate = BlankTemplate;
        app.component("blankTemplate", {
            controller: BlankTemplate,
            bindings: { someVariable: '<' },
            controllerAs: "vm",
            template: "\n        <div style=\"width:500px;margin-left:100px;margin-right:auto;margin-top:40px;\" > <h2>New Feature</h2 > </div>\n        <div style=\"width:500px;margin-left:100px;margin-right:auto;margin-top:40px;\" ><hr>\n        <i>This is an advanced feature that may be included if PFSA finds it worth while.</i>\n\n</div>\n        \n        "
        });
    })(Components = Application.Components || (Application.Components = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Library;
    (function (Library) {
        var Components;
        (function (Components) {
            var BookView = (function () {
                function BookView($location, $sessionStorage, libraryService) {
                    this.$location = $location;
                    this.$sessionStorage = $sessionStorage;
                    this.libraryService = libraryService;
                    this.$insert = ['$location', '$sessionStorage', 'libraryService'];
                    this.showBookImage = false;
                }
                BookView.prototype.$onInit = function () {
                    this.permission = this.libraryService.UpdatePermissions();
                };
                BookView.prototype.Edit = function () {
                    var b = this.book;
                    this.go('/library/catalog/edit/' + b.Prefix + '/' + b.BookNumber);
                };
                BookView.prototype.BookImage = function (b) {
                    var imageServer = Application.Config.LibraryConfig.imageServer;
                    if (!this.book.Url) {
                        var img = Application.Config.LibraryConfig.defaultBookImage;
                        return imageServer + '/' + img;
                    }
                    else {
                        return imageServer + '/' + this.book.Url;
                    }
                };
                BookView.prototype.Request = function () {
                    var b = this.book;
                    var url = 'library/requests/add/' + b.Prefix + '/' + b.BookNumber;
                    this.go(url);
                };
                BookView.prototype.go = function (url) {
                    this.$location.url(url);
                };
                return BookView;
            }());
            Components.BookView = BookView;
            app.component("bookView", {
                controller: BookView,
                bindings: { book: '<', history: '<' },
                controllerAs: "vm",
                templateUrl: '/app/pages/book/book-view.html'
            });
        })(Components = Library.Components || (Library.Components = {}));
    })(Library = Application.Library || (Application.Library = {}));
})(Application || (Application = {}));
app.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                element.bind('change', function () {
                    scope.$apply(function () {
                        var f = element[0].files[0];
                        modelSetter(scope, f);
                    });
                });
            }
        };
    }]);
var Application;
(function (Application) {
    var Library;
    (function (Library) {
        var Components;
        (function (Components) {
            var book = (function () {
                function book($location, $http, $routeParams, $httpParamSerializerJQLike, libraryService, $sessionStorage) {
                    this.$location = $location;
                    this.$http = $http;
                    this.$routeParams = $routeParams;
                    this.$httpParamSerializerJQLike = $httpParamSerializerJQLike;
                    this.libraryService = libraryService;
                    this.$sessionStorage = $sessionStorage;
                    this.mode = "insert";
                    this.subjects = [];
                    this.loading = false;
                    this.callnumber = '';
                    this.image = {};
                    this.editing = true;
                    this.bookImage = '';
                    this.book = {};
                    this.imageChanged = false;
                    this.$insert = ['$location', '$http', '$routeParams',
                        '$httpParamSerializerJQLike', 'libraryService', '$sessionStorage', 'libraryConfig'];
                    this.permissions = libraryService.UpdatePermissions();
                    this.redirect = $location.path();
                    this.image.uploading = false;
                    this.book.Url = "";
                    this.imageServer = Application.Config.LibraryConfig.imageServer;
                }
                book.prototype.uploadImage = function () {
                    var _this = this;
                    this.image.uploading = true;
                    var fd = new FormData();
                    var name = this.file.name;
                    var cn = this.book.CallNumber;
                    var path = cn + "/" + name;
                    this.bookImage = Application.Config.LibraryConfig.imageServer + '/assets/wait.gif';
                    fd.append('file', this.file);
                    fd.append('callnumber', this.book.CallNumber);
                    this.libraryService.uploadImage(fd)
                        .then(function (resp) {
                        console.log(resp);
                        _this.bookImage = Application.Config.LibraryConfig.imageServer + '/' + resp.data;
                        _this.image.uploading = false;
                    });
                };
                book.prototype.LoadSubjects = function () {
                    var _this = this;
                    this.libraryService.getSubjects()
                        .then(function (data) {
                        _this.subjects = data;
                        _this.updateSubject();
                    });
                };
                book.prototype.updateSubject = function () {
                    var _this = this;
                    angular.forEach(this.subjects, function (v, key) {
                        if (v.SubjectId == _this.book.SubjectId) {
                            _this.SelectedSubject = v;
                            console.log(_this.SelectedSubject);
                            _this.book.Subject = v.Name;
                            console.log(v.Name);
                            console.log(_this.book.Subject);
                        }
                    });
                };
                book.prototype.ApplySubject = function () {
                    var _this = this;
                    var subj = this.book.SubjectId.toString();
                    angular.forEach(this.subjects, function (v, key) {
                        if (v.SubjectId == subj) {
                            _this.book.Prefix = v.Prefix;
                            _this.book.BookNumber = v.LastId + 1;
                            _this.book.CallNumber = _this.book.Prefix + _this.book.BookNumber;
                            _this.book.SubjectId = v.SubjectId;
                        }
                    });
                };
                book.prototype.getBook = function (prefix, booknumber) {
                    var _this = this;
                    this.loading = true;
                    this.libraryService.getBook(prefix, booknumber)
                        .then(function (resp) {
                        _this.book = resp.data;
                        if (!_this.book.Url) {
                            var img = Application.Config.LibraryConfig.defaultBookImage;
                            _this.bookImage = _this.imageServer + '/' + img;
                        }
                        else {
                            _this.bookImage = _this.imageServer + '/' + _this.book.Url;
                        }
                        _this.updateSubject();
                        _this.libraryService.getBookHistory(prefix, booknumber)
                            .then(function (resp) {
                            _this.history = resp.data;
                        });
                        _this.loading = false;
                    });
                };
                book.prototype.UpdateStatus = function () {
                };
                book.prototype.checkFile = function () {
                };
                book.prototype.saveBook = function (option) {
                    var _this = this;
                    this.loading = true;
                    if (this.file) {
                        this.uploadImage();
                    }
                    if (this.book.BookId) {
                        if (this.$sessionStorage.searchResults) {
                            var searchResults = this.$sessionStorage.searchResults;
                            this.$sessionStorage.searchResults = {};
                            angular.forEach(searchResults, function (v, k) {
                                console.log(v.BookId);
                                if (v.BookId.toString() == _this.book.BookId.toString()) {
                                    angular.copy(_this.book, v);
                                }
                            });
                            this.$sessionStorage.searchResults = searchResults;
                        }
                    }
                    this.libraryService.saveBook(this.book)
                        .then(function (resp) {
                        var b = _this.book;
                        if (option == 1) {
                            _this.$location.url('/library/catalog');
                        }
                        if (option == 2) {
                            _this.$location.url('/library/catalog/add');
                        }
                        _this.loading = false;
                    });
                };
                book.prototype.go = function (url) {
                    this.$location.url('/library/' + url);
                };
                book.prototype.$onInit = function () {
                    this.LoadSubjects();
                    var viewmode = this.$routeParams.mode;
                    this.prefix = this.$routeParams.prefix;
                    this.booknumber = this.$routeParams.booknumber;
                    this.callnumber = this.prefix + this.booknumber;
                    console.log(this.mode + ':' + this.callnumber);
                    this.links = [
                        { "url": "/#/library", "text": "home" },
                        { "url": "/#/library/catalog", "text": "catalog" }
                    ];
                    if (this.callnumber) {
                        this.editing = false;
                        this.mode = "update";
                        this.getBook(this.prefix, this.booknumber);
                    }
                    else {
                        this.mode = 'insert';
                        this.editing = true;
                        this.book.Subject = 'Azores';
                        this.book.Status = 'Active';
                    }
                    if (viewmode == 'edit') {
                        this.editing = true;
                        this.mode = "update";
                    }
                    console.log(viewmode);
                    this.links.push({ "url": "", "text": this.callnumber });
                };
                return book;
            }());
            Components.book = book;
            app.component("book", {
                controller: book,
                controllerAs: "vm",
                templateUrl: function (templates) { return templates.book; },
            });
        })(Components = Library.Components || (Library.Components = {}));
    })(Library = Application.Library || (Application.Library = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Components;
    (function (Components) {
        var BookPage = (function () {
            function BookPage() {
            }
            BookPage.prototype.$onInit = function () {
                console.log(this.book);
            };
            return BookPage;
        }());
        Components.BookPage = BookPage;
        app.component("bookPage", {
            controller: BookPage,
            bindings: { book: '<' },
            controllerAs: "vm",
            template: "test<book></book><hr><book-tile></book-tile>"
        });
    })(Components = Application.Components || (Application.Components = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Components;
    (function (Components) {
        var bookTile = (function () {
            function bookTile() {
            }
            bookTile.prototype.$onInit = function () {
                console.log(this.book);
            };
            return bookTile;
        }());
        Components.bookTile = bookTile;
        app.component("bookTile", {
            controller: bookTile,
            bindings: { book: '<' },
            controllerAs: "vm",
            templateUrl: function (templates) { return templates.bookTile; },
        });
    })(Components = Application.Components || (Application.Components = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Components;
    (function (Components) {
        var Home = (function () {
            function Home($location, $sessionStorage, libraryService) {
                this.$location = $location;
                this.$sessionStorage = $sessionStorage;
                this.libraryService = libraryService;
                this.$insert = ['$location', '$sessionStorage', 'libraryService'];
            }
            Home.prototype.$onInit = function () {
                console.log('Home Page');
                this.webSearch('recent additions');
            };
            Home.prototype.webSearch = function (terms) {
                var _this = this;
                this.libraryService.Recent()
                    .then(function (resp) {
                    _this.books = resp.data;
                    _this.$sessionStorage.searchResults = _this.books;
                });
            };
            Home.prototype.GetBook = function (book) {
                var url = "/library/catalog/view/" + book.Prefix + "/" + book.BookNumber;
                this.$location.url(url);
            };
            return Home;
        }());
        Components.Home = Home;
        app.component("home", {
            controller: Home,
            bindings: { someVariable: '<' },
            controllerAs: "vm",
            templateUrl: function (templates) { return templates.home; }
        });
    })(Components = Application.Components || (Application.Components = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Components;
    (function (Components) {
        var Book = (function () {
            function Book() {
                this._tempThumbNail = 'http://pfsa.morrisdev.com/tools/app/pages/library/book/placeholder.jpg';
                this._thumbUrl = this._tempThumbNail;
            }
            Object.defineProperty(Book.prototype, "thumbUrl", {
                get: function () {
                    var u = this._thumbUrl;
                    var ext = this.getExt(u);
                    if (ext != '') {
                        return this._thumbUrl;
                    }
                    else {
                        return this._tempThumbNail;
                    }
                },
                set: function (val) {
                    this._thumbUrl = val;
                },
                enumerable: true,
                configurable: true
            });
            Book.prototype.getExt = function (filename) {
                var ext = filename.split('.').pop();
                if (ext == filename)
                    return "";
                return ext;
            };
            return Book;
        }());
        var library = (function () {
            function library($location, $http, libraryService, $cookies, $sessionStorage, $routeParams) {
                this.$location = $location;
                this.$http = $http;
                this.libraryService = libraryService;
                this.$cookies = $cookies;
                this.$sessionStorage = $sessionStorage;
                this.$routeParams = $routeParams;
                this.mydocs = [];
                this.api = {};
                this.searchResults = false;
                this.callnumber = '';
                this.prefix = '';
                this.pageTitle = 'Catalog';
                this.$insert = ['$location', '$http', '$cookies', '$sessionStorage', '$routeParams'];
                this.links = [{ "url": "/#/library", "text": "home" }, { "url": "", "text": "catalog" }];
                var library = [];
                this.sessionStorage = $sessionStorage;
                this.version = new Application.Config.version();
                this.SubjectList();
            }
            library.prototype.OpenByCallNumberKey = function (keyEvent) {
                if (keyEvent.which === 13) {
                    this.OpenByCallNumber();
                }
            };
            library.prototype.OpenByCallNumber = function () {
                var cn = this.callnumber;
                var booknumber = cn.replace(/\D/g, '');
                var prefix = cn.replace(/[0-9]/g, '');
                var url = "/library/edit/" + prefix + "/" + booknumber;
                this.go(url);
            };
            library.prototype.SubjectList = function () {
                var s = this.version.apiServer;
            };
            library.prototype.SearchKey = function (keyEvent) {
                if (keyEvent.which === 13) {
                    this.Search();
                }
            };
            library.prototype.Search = function (searchText) {
                this.webSearch(this.searchText, this.prefix, '');
                this.setCookie("titleSearch", this.searchText);
            };
            library.prototype.ClearSearch = function () {
                this.searchText = '';
            };
            library.prototype.NewBook = function () {
                this.$location.url('library/add');
            };
            library.prototype.SubjectSearch = function (prefix) {
                var _this = this;
                this.sessionStorage.prefix = prefix;
                this.libraryService.Search(prefix, '', '')
                    .then(function (resp) {
                    _this.books = resp.data;
                    _this.sessionStorage.searchResults = _this.books;
                    _this.searchResults = true;
                });
            };
            library.prototype.webSearch = function (terms, prefix, author) {
                var _this = this;
                this.searchResults = false;
                if (terms != 'recent additions') {
                    if (!prefix)
                        prefix = '';
                    if (this.$routeParams.author)
                        author = this.$routeParams.author;
                    this.sessionStorage.searchText = terms;
                    this.libraryService.Search(prefix, author, terms)
                        .then(function (resp) {
                        _this.books = resp.data;
                        _this.sessionStorage.searchResults = _this.books;
                        _this.searchResults = true;
                        var count = _this.books.length;
                        var countText = count.toString();
                        if (count === 1000) {
                            'More than ' + countText;
                        }
                        if (count > 0) {
                            if (_this.mode === 'author') {
                                _this.pageTitle = countText + " Titles by " + _this.$routeParams.author;
                            }
                            if (_this.mode === 'subject') {
                                _this.pageTitle = countText + " Titles in " + _this.books[0].Subject;
                            }
                            if (_this.mode === 'full') {
                                _this.pageTitle = countText + " Titles found";
                            }
                            _this.searchResults = true;
                        }
                        else {
                            _this.pageTitle = 'No Titles Found for search text ("' + terms + '")';
                        }
                    });
                }
                else {
                    if (this.mode === 'recent') {
                        this.pageTitle = 'Recent Additions';
                        this.libraryService.Recent()
                            .then(function (resp) {
                            _this.books = resp.data;
                            _this.sessionStorage.searchResults = _this.books;
                            _this.searchResults = true;
                        });
                    }
                }
            };
            library.prototype.getBook = function (b) {
                var url = "/library/catalog/view/" + b.Prefix + "/" + b.BookNumber;
                this.go(url);
            };
            library.prototype.go = function (url) {
                this.$location.url(url);
            };
            library.prototype.Recent = function () {
                this.$location.url('library/recent');
            };
            library.prototype.$onInit = function () {
                var lastSearch;
                if (this.mode === 'recent') {
                    this.sessionStorage.searchText = '';
                }
                this.searchText = this.sessionStorage.searchText;
                var searchMode = "";
                console.log(this.mode);
                this.prefix = this.$routeParams.prefix;
                if (this.sessionStorage) {
                    this.searchText = this.sessionStorage.searchText;
                    searchMode = this.sessionStorage.searchMode;
                    if (searchMode = this.mode) {
                        lastSearch = this.sessionStorage.searchResults;
                    }
                }
                if (this.mode === 'recent') {
                    this.links = [{ "url": "/#/library", "text": "home" }, { "url": "/#/library/catalog", "text": "catalog" }, { "url": "", "text": 'recent additions' }];
                    this.webSearch('recent additions', '', '');
                }
                else {
                    if (this.mode === 'subject') {
                        this.webSearch('', this.$routeParams.prefix, '');
                        this.links = [{ "url": "/#/library", "text": "home" }, { "url": "/#/library/catalog", "text": "catalog" }, { "url": "", "text": this.$routeParams.prefix }];
                        this.searchResults = true;
                    }
                    if (this.mode == 'author') {
                        this.webSearch('', '', this.$routeParams.author);
                        this.links = [{ "url": "/#/library", "text": "home" }, { "url": "/#/library/author", "text": "authors" },
                            { "url": "", "text": this.$routeParams.author }];
                        this.books = lastSearch;
                        this.searchResults = true;
                    }
                    if (this.mode == 'full' && !(this.searchText === 'recent additions' || this.searchText === '')) {
                        this.books = lastSearch;
                        this.searchResults = true;
                    }
                    if (this.mode == 'full' && this.searchText === 'recent additions') {
                        this.searchResults = true;
                    }
                    this.searchResults = true;
                }
            };
            library.prototype.submitForm = function () {
            };
            library.prototype.cleanForm = function () {
                this.searchText = '';
            };
            library.prototype.setCookie = function (cookieName, obj) {
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 100);
                this.$cookies.putObject(cookieName, obj, { expires: expireDate });
            };
            library.prototype.getCookie = function (cookieName) {
                var obj = this.$cookies.getObject(cookieName);
                if (!obj) {
                    obj = {};
                }
                return obj;
            };
            return library;
        }());
        Components.library = library;
        app.component("library", {
            controller: library,
            controllerAs: "vm",
            bindings: { mode: '=' },
            templateUrl: function (templates) { return templates.library; },
        });
    })(Components = Application.Components || (Application.Components = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Components;
    (function (Components) {
        var LoginPage = (function () {
            function LoginPage() {
            }
            return LoginPage;
        }());
        app.component("loginPage", {
            controller: LoginPage,
            controllerAs: "vm",
            template: "\n        <style>\n    \n</style>\n<div class=\"container\">\n\n    <div class=\"row\">\n        <div class=\"col-md-12 login-cta\">\n        <login></login>\n        \n        </div>\n    </div>\n\n</div>\n        "
        });
    })(Components = Application.Components || (Application.Components = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Components;
    (function (Components) {
        var login = (function () {
            function login($location, $timeout, libraryService, $cookies, $sessionStorage, $window) {
                this.$location = $location;
                this.$timeout = $timeout;
                this.libraryService = libraryService;
                this.$cookies = $cookies;
                this.$sessionStorage = $sessionStorage;
                this.$window = $window;
                this.loading = false;
                this.$insert = ['$location', '$timeout', 'libraryService', '$cookies', '$sessionStorage', '$window'];
                this.password = '';
            }
            login.prototype.LoginKey = function (keyEvent) {
                if (keyEvent.which === 13) {
                    this.Login();
                }
            };
            login.prototype.Login = function () {
                var _this = this;
                if (this.password != '') {
                    this.loading = true;
                    this.libraryService.Login(this.username, this.password)
                        .then(function (resp) {
                        _this.$sessionStorage.myaccount = resp.data;
                        console.log("SUCCESSFUL LOGIN");
                        _this.refreshStatus();
                        if (!_this.redirect) {
                            _this.$location.url('/catalog');
                        }
                        else {
                            _this.$window.location.href = _this.redirect + "?redirect=true";
                        }
                    }, function (resp) {
                        _this.password = '';
                        _this.errorMessage = 'Sorry, wrong username/password.';
                        _this.loading = false;
                        _this.$timeout(function () {
                            _this.errorMessage = '';
                        }, 3200);
                    });
                }
            };
            login.prototype.$onInit = function () {
                var account = this.getCookie("account");
                if (account.Email) {
                    this.username = account.Email;
                }
            };
            login.prototype.setCookie = function (cookieName, obj) {
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 100);
                this.$cookies.putObject(cookieName, obj, { expires: expireDate });
            };
            login.prototype.getCookie = function (cookieName) {
                var obj = this.$cookies.getObject(cookieName);
                if (!obj) {
                    obj = {};
                }
                return obj;
            };
            return login;
        }());
        app.component("login", {
            controller: login,
            bindings: { refreshStatus: '&', redirect: '<' },
            controllerAs: "vm",
            templateUrl: "app/pages/login/login.html?v=" + new Date(),
        });
    })(Components = Application.Components || (Application.Components = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Components;
    (function (Components) {
        var Navbar = (function () {
            function Navbar($location, $sessionStorage, libraryService) {
                this.$location = $location;
                this.$sessionStorage = $sessionStorage;
                this.libraryService = libraryService;
                this.$insert = ['$location', '$sessionStorage', 'libraryService'];
                this.permission = {};
            }
            Navbar.prototype.$onInit = function () {
                this.GetSubjects();
                this.GetAuthors(30);
                if (this.$sessionStorage.myaccount) {
                    var a = this.$sessionStorage.myaccount;
                    this.username = a.FirstName + ' ' + a.LastName;
                    this.AccountId = a.AccountId;
                    this.permission = new Application.Context.NavigationPermissions(a.AccountType);
                }
                else {
                }
            };
            Navbar.prototype.LogOut = function () {
                this.$sessionStorage.$reset();
                this.permission = new Application.Context.NavigationPermissions('Anon');
                var url = "/";
                this.go(url);
            };
            Navbar.prototype.GetAuthors = function (bookCount) {
                var _this = this;
                this.libraryService.getAuthorsByBookCount(bookCount)
                    .then(function (resp) {
                    _this.authors = resp;
                });
            };
            Navbar.prototype.GetSubjects = function () {
                var _this = this;
                this.libraryService.getSubjects()
                    .then(function (resp) {
                    _this.subjects = resp;
                });
            };
            Navbar.prototype.OpenByCallNumberKey = function (keyEvent) {
                if (keyEvent.which === 13) {
                    this.OpenByCallNumber();
                }
            };
            Navbar.prototype.OpenByCallNumber = function () {
                var _this = this;
                var cn = this.callnumber;
                var booknumber = cn.replace(/\D/g, '');
                var prefix = cn.replace(/[0-9]/g, '');
                var url = "/library/catalog/view/" + prefix + "/" + booknumber;
                var ls = this.libraryService;
                ls.getBook(prefix, booknumber)
                    .then(function (resp) {
                    if (resp.data.CallNumber) {
                        if (resp.data.Status === 'Deleted') {
                            alert('This title was deleted.');
                        }
                        else {
                            _this.go(url);
                        }
                    }
                    else {
                        alert('No title found for call number ' + cn);
                    }
                });
            };
            Navbar.prototype.go = function (url) {
                this.$location.url(url);
            };
            return Navbar;
        }());
        Components.Navbar = Navbar;
        app.component("navbar", {
            controller: Navbar,
            bindings: { book: '<' },
            controllerAs: "vm",
            templateUrl: function (templates) { return templates.navbar; }
        });
    })(Components = Application.Components || (Application.Components = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Components;
    (function (Components) {
        var BookPreview = (function () {
            function BookPreview($location, $http) {
                this.$location = $location;
                this.$http = $http;
                this.mydocs = [];
                this.api = {};
                this.books = [];
                this.patient = {};
                this.$insert = ['$location', '$http'];
            }
            BookPreview.prototype.$onInit = function () {
                var b = {};
            };
            return BookPreview;
        }());
        Components.BookPreview = BookPreview;
        app.component("bookPreview", {
            controller: BookPreview,
            controllerAs: "vm",
            templateUrl: "app/pages/library/preview/preview.html?v=" + new Date(),
        });
    })(Components = Application.Components || (Application.Components = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Components;
    (function (Components) {
        var Book = (function () {
            function Book() {
                this._tempThumbNail = 'http://pfsa.morrisdev.com/tools/app/pages/library/book/placeholder.jpg';
                this._thumbUrl = this._tempThumbNail;
            }
            Object.defineProperty(Book.prototype, "thumbUrl", {
                get: function () {
                    var u = this._thumbUrl;
                    var ext = this.getExt(u);
                    if (ext != '') {
                        return this._thumbUrl;
                    }
                    else {
                        return this._tempThumbNail;
                    }
                },
                set: function (val) {
                    this._thumbUrl = val;
                },
                enumerable: true,
                configurable: true
            });
            Book.prototype.getExt = function (filename) {
                var ext = filename.split('.').pop();
                if (ext == filename)
                    return "";
                return ext;
            };
            return Book;
        }());
        var RecentAdditions = (function () {
            function RecentAdditions($location, $http, md5) {
                this.$location = $location;
                this.$http = $http;
                this.md5 = md5;
                this.mydocs = [];
                this.api = {};
                this.$insert = ['$location', '$http', 'md5'];
                var library = [];
            }
            RecentAdditions.prototype.search = function () {
                if (this.searchText) {
                    this.webSearch(this.searchText);
                }
            };
            RecentAdditions.prototype.webSearch = function (terms) {
                var _this = this;
                var url = 'http://pfsa.morrisdev.com/api/books/?cmd=search&terms=' + terms;
                this.$http.get(url)
                    .then(function (resp) {
                    _this.books = resp.data;
                });
            };
            RecentAdditions.prototype.getRecent = function (count) {
                var _this = this;
                this.recent = [];
                var r = this.recent;
                var url = 'http://pfsa.morrisdev.com/api/books/?cmd=recent&count=' + count;
                this.$http.get(url)
                    .then(function (resp) {
                    _this.books = resp.data;
                    var b = _this.books;
                    angular.forEach(b, function (i, k) {
                        console.log(i.thumburl);
                        var bk = new Book();
                        bk.title = i.title;
                        bk.barcode = i.barcode;
                        bk.author = i.author;
                        bk.thumbUrl = i.thumburl;
                        bk.category = i.category;
                        bk.description = i.description;
                        bk.type = i.type;
                        bk.subject = i.subject;
                        console.log(i);
                        r.push(bk);
                    });
                    console.log(r);
                });
            };
            RecentAdditions.prototype.getBook = function (b) {
                var url = "/library/edit/" + b.barcode;
                this.go(url);
            };
            RecentAdditions.prototype.go = function (url) {
                this.$location.url(url);
            };
            RecentAdditions.prototype.$onInit = function () {
                this.getRecent(5);
            };
            RecentAdditions.prototype.submitForm = function () {
            };
            RecentAdditions.prototype.cleanForm = function () {
                this.searchText = '';
            };
            return RecentAdditions;
        }());
        Components.RecentAdditions = RecentAdditions;
        app.component("recentAdditions", {
            controller: RecentAdditions,
            controllerAs: "vm",
            templateUrl: function (templates) { return templates.recentAdditions; },
        });
    })(Components = Application.Components || (Application.Components = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Components;
    (function (Components) {
        var MyRequests = (function () {
            function MyRequests($location, $sessionStorage, libraryService) {
                this.$location = $location;
                this.$sessionStorage = $sessionStorage;
                this.libraryService = libraryService;
                this.$insert = ['$location', '$sessionStorage', 'libraryService'];
            }
            MyRequests.prototype.$onInit = function () {
                console.log('MyRequests');
                this.links = [
                    { "url": "/#/library", "text": "home" },
                    { "url": "/#/library/member", "text": "my profile" },
                    { "url": "", "text": "my requests" },
                ];
            };
            MyRequests.prototype.go = function (url) {
                this.$location.url(url);
            };
            return MyRequests;
        }());
        Components.MyRequests = MyRequests;
        app.component("myRequests", {
            controller: MyRequests,
            bindings: { someVariable: '<' },
            controllerAs: "vm",
            templateUrl: function (templates) { return templates.myRequests; },
        });
    })(Components = Application.Components || (Application.Components = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Components;
    (function (Components) {
        var Requests = (function () {
            function Requests($location, $sessionStorage, $routeParams, libraryService, $mdDialog) {
                this.$location = $location;
                this.$sessionStorage = $sessionStorage;
                this.$routeParams = $routeParams;
                this.libraryService = libraryService;
                this.$mdDialog = $mdDialog;
                this.$insert = ['$location', '$sessionStorage', '$routeParams', 'libraryService', '$mdDialog'];
                this.ShipSelections = [];
                this.showAddress = false;
                this.showConfirm = false;
                this.showSearch = false;
                this.showList = false;
            }
            Requests.prototype.$onInit = function () {
                this.mode = this.$routeParams.mode;
                this.Prefix = this.$routeParams.prefix;
                this.BookNumber = this.$routeParams.booknumber;
                this.CallNumber = this.Prefix + this.BookNumber;
                if (this.mode)
                    this.mode = this.mode.toLowerCase();
                if (this.mode == 'edit' || this.mode == 'add') {
                    this.getBook(this.Prefix, this.BookNumber);
                    this.redirect = "/#/library/requests/" + this.mode + "/" + this.Prefix + "/" + this.BookNumber;
                    this.email = this.$sessionStorage.myaccount.Email;
                    this.LookupAccount('email', this.email);
                    this.links = [
                        { "url": "/#/library", "text": "home" },
                        { "url": "/#/library/catalog", "text": "catalog" },
                        { "url": "/#/library/catalog/view/" + this.Prefix + "/" + this.BookNumber, "text": this.CallNumber },
                        { "url": "", "text": "request " + this.CallNumber },
                    ];
                }
                else {
                    this.GetRequests();
                    this.links = [
                        { "url": "/#/library", "text": "home" },
                        { "url": "", "text": "requests" },
                    ];
                    this.showList = true;
                    this.redirect = "/#/library/requests/";
                }
                this.permission = this.libraryService.UpdatePermissions();
                if (this.$sessionStorage.myaccount) {
                    this.Account = this.$sessionStorage.myaccount;
                    var s = this.Account.AccountType;
                    if (this.mode === "mine") {
                        this.email = this.Account.Email;
                    }
                    if (s === "Admin" || s === "Librarian" || s === "Staff") {
                        console.log("SHOW SEARCH");
                    }
                    else {
                        this.showSearch = false;
                    }
                }
            };
            Requests.prototype.LookupAccount = function (searchType, q) {
                var _this = this;
                if (this.$sessionStorage.myaccount) {
                    var a = this.$sessionStorage.myaccount;
                    if (a.Email === q) {
                        this.Account = a;
                        this.showAddress = true;
                        this.showSearch = false;
                        this.showConfirm = false;
                        return true;
                    }
                    this.libraryService.LookupAccount(searchType, q)
                        .then(function (resp) {
                        console.log(resp);
                        if (resp.data != 'No Accounts Found') {
                            _this.Account = resp.data[0];
                            _this.showAddress = true;
                            _this.showSearch = false;
                            _this.showConfirm = false;
                        }
                        else {
                            var c = confirm("No account was found for " + q + ".  Would you like to make a new account for them?");
                            if (c) {
                                _this.showSearch = false;
                                _this.showAddress = true;
                                _this.showConfirm = false;
                                _this.Account = new Application.Models.Account();
                                _this.Account.Email = q;
                                _this.Account.Password = "";
                            }
                        }
                    });
                }
            };
            Requests.prototype.ViewRequest = function (obj) {
                var _this = this;
                var id = obj.ReservationSubId;
                this.libraryService.getRequest(id)
                    .then(function (resp) {
                    console.log(resp);
                    if (resp.data != 'No Accounts Found') {
                        var a = resp.data[0];
                        var alert = _this.$mdDialog.alert()
                            .title("Request " + id)
                            .content(a)
                            .ok('Close');
                        _this.$mdDialog
                            .show(alert)
                            .finally(function () {
                            alert = undefined;
                        });
                    }
                    else {
                        var c = confirm("No account was found");
                    }
                });
            };
            Requests.prototype.DialogCtrl = function (mdPanelRef) {
            };
            Requests.prototype.getBook = function (prefix, booknumber) {
                var _this = this;
                this.libraryService.getBook(prefix, booknumber)
                    .then(function (resp) {
                    _this.book = resp.data;
                    if (!_this.book.Url) {
                        var img = Application.Config.LibraryConfig.defaultBookImage;
                    }
                    else {
                    }
                });
            };
            Requests.prototype.AddRequest = function (callnumber) {
                var _this = this;
                this.libraryService.AddRequest(callnumber, this.email)
                    .then(function (resp) {
                    if (!resp.data.BookId) {
                        alert(resp.data);
                    }
                    else {
                        _this.GetRequests();
                    }
                });
            };
            Requests.prototype.AddRequestByAccount = function (a, callnumber) {
                var _this = this;
                this.libraryService.SaveAccount(a)
                    .then(function (resp) {
                    _this.libraryService.AddRequest(_this.CallNumber, _this.Account.Email)
                        .then(function (resp) {
                        if (!resp.data.BookId) {
                            alert(resp.data);
                        }
                        else {
                            _this.showConfirm = true;
                            _this.showAddress = false;
                            _this.GetRequests();
                        }
                    });
                });
            };
            Requests.prototype.UpdateRequest = function (type, res, status, dt) {
                var _this = this;
                var obj = {};
                obj.ReservationSubId = res.ReservationSubId;
                obj.ChangeType = type;
                obj.OnOff = status;
                obj.ChangeDate = dt;
                this.libraryService.UpdateRequest(obj)
                    .then(function (resp) {
                    console.log(resp.data);
                    _this.GetRequests();
                });
            };
            Requests.prototype.GetRequests = function () {
                var _this = this;
                if (this.$sessionStorage.myaccount) {
                    this.libraryService.getOpenRequests()
                        .then(function (resp) {
                        _this.requests = resp.data;
                    });
                }
            };
            Requests.prototype.ShipItem = function (r) {
                var found = false;
                var temp = [];
                angular.forEach(this.ShipSelections, function (i, k) {
                    if (i.ReservationSubId == r.ReservationSubId) {
                        found = true;
                    }
                    else {
                        temp.push(i);
                    }
                });
                if (!found) {
                    temp.push(r);
                }
                this.ShipSelections = temp;
            };
            Requests.prototype.go = function (url) {
                this.$location.url(url);
            };
            return Requests;
        }());
        Components.Requests = Requests;
        app.component("requests", {
            controller: Requests,
            bindings: { someVariable: '<' },
            controllerAs: "vm",
            templateUrl: function (templates) { return templates.requests; },
        });
    })(Components = Application.Components || (Application.Components = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Components;
    (function (Components) {
        var Reservation = (function () {
            function Reservation($location, $sessionStorage, libraryService) {
                this.$location = $location;
                this.$sessionStorage = $sessionStorage;
                this.libraryService = libraryService;
                this.$insert = ['$location', '$sessionStorage', 'libraryService'];
                this.ShipSelections = [];
            }
            Reservation.prototype.$onInit = function () {
                console.log('Request Book');
                this.GetRequests();
            };
            Reservation.prototype.AddRequest = function (callnumber) {
                var _this = this;
                this.libraryService.AddRequest(callnumber)
                    .then(function (resp) {
                    if (!resp.data.BookId) {
                        alert(resp.data);
                    }
                    else {
                        _this.GetRequests();
                    }
                });
            };
            Reservation.prototype.GetRequests = function () {
                var _this = this;
                this.libraryService.getOpenRequests()
                    .then(function (resp) {
                    _this.requests = resp.data;
                });
            };
            Reservation.prototype.ShipItem = function (r) {
                var found = false;
                var temp = [];
                angular.forEach(this.ShipSelections, function (i, k) {
                    if (i.ReservationSubId == r.ReservationSubId) {
                        found = true;
                    }
                    else {
                        temp.push(i);
                    }
                });
                if (!found) {
                    temp.push(r);
                }
                this.ShipSelections = temp;
            };
            Reservation.prototype.go = function (url) {
                this.$location.url(url);
            };
            return Reservation;
        }());
        Components.Reservation = Reservation;
        app.component("reservation", {
            controller: Reservation,
            bindings: { someVariable: '<' },
            controllerAs: "vm",
            templateUrl: function (templates) { return templates.reservation; },
        });
    })(Components = Application.Components || (Application.Components = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Components;
    (function (Components) {
        var SubjectsPage = (function () {
            function SubjectsPage() {
            }
            SubjectsPage.prototype.$onInit = function () {
                console.log(this.book);
            };
            return SubjectsPage;
        }());
        Components.SubjectsPage = SubjectsPage;
        app.component("subjectsPage", {
            controller: SubjectsPage,
            bindings: { book: '<' },
            controllerAs: "vm",
            template: '<navbar></navbar><subjects></subjects>'
        });
    })(Components = Application.Components || (Application.Components = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Components;
    (function (Components) {
        var Subjects = (function () {
            function Subjects($location, $http, libraryService, $sessionStorage) {
                this.$location = $location;
                this.$http = $http;
                this.libraryService = libraryService;
                this.$sessionStorage = $sessionStorage;
                this.subjects = [];
                this.sortColumn = 'Name';
                this.hidelist = false;
                this.$insert = ['$location', 'libraryService', '$sessionStorage'];
            }
            Subjects.prototype.CancelEdit = function () {
                var _this = this;
                if (this.mysubject.SubjectId > 0) {
                    this.mysubject = JSON.parse(JSON.stringify(this.tmpSubject));
                    console.log(this.mysubject);
                    angular.forEach(this.subjects, function (i, k) {
                        if (i.SubjectId == _this.mysubject.SubjectId) {
                            angular.copy(_this.mysubject, i);
                        }
                    });
                }
                this.hidelist = false;
            };
            Subjects.prototype.NewSubject = function () {
                console.log("New Subject");
                this.hidelist = true;
            };
            Subjects.prototype.Save = function (o) {
                var _this = this;
                this.tmpSubject = {};
                if (o == 1) {
                    this.libraryService.saveSubject(this.mysubject)
                        .then(function (resp) {
                        _this.hidelist = false;
                    });
                }
                if (o == 2) {
                    this.mysubject.SubjectId = null;
                    this.libraryService.saveSubject(this.mysubject)
                        .then(function (resp) {
                        _this.subjects.unshift(resp.data);
                        _this.hidelist = false;
                    });
                }
            };
            Subjects.prototype.Edit = function (subject) {
                console.log(subject);
                this.hidelist = true;
                if (subject) {
                    this.tmpSubject = JSON.parse(JSON.stringify(subject));
                    console.log(this.tmpSubject);
                    this.mysubject = subject;
                }
                else {
                    this.mysubject = { "SubjectId": 0, "Name": "", "Prefix": "", "LastId": 0, "Status": "Active" };
                }
            };
            Subjects.prototype.$onInit = function () {
                var _this = this;
                this.libraryService.getSubjects()
                    .then(function (data) {
                    _this.subjects = data;
                });
            };
            return Subjects;
        }());
        Components.Subjects = Subjects;
        app.component("subjects", {
            controller: Subjects,
            controllerAs: "vm",
            templateUrl: function (templates) { return templates.subjects; },
        });
    })(Components = Application.Components || (Application.Components = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Config;
    (function (Config) {
        var LibraryConfig = (function () {
            function LibraryConfig() {
            }
            Object.defineProperty(LibraryConfig, "imageServer", {
                get: function () { return 'https://d2rg9t5epa49og.cloudfront.net'; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LibraryConfig, "defaultBookImage", {
                get: function () { return 'assets/book.png'; },
                enumerable: true,
                configurable: true
            });
            return LibraryConfig;
        }());
        Config.LibraryConfig = LibraryConfig;
    })(Config = Application.Config || (Application.Config = {}));
})(Application || (Application = {}));
(function (Application) {
    var Services;
    (function (Services) {
        var libraryService = (function () {
            function libraryService($http, $sessionStorage, $location, $q) {
                this.$http = $http;
                this.$sessionStorage = $sessionStorage;
                this.$location = $location;
                this.$q = $q;
                this.sid = {};
                this.$insert = ["$http", "$sessionStorage", "$location", "$q"];
                var v = new Application.Config.version();
                this.server = v.apiServer;
                if (this.$sessionStorage.myaccount) {
                    this.sid = this.$sessionStorage.myaccount.SessionId;
                }
                else {
                    this.sid = 0;
                }
            }
            libraryService.prototype.checkLogin = function () {
                if (this.$sessionStorage.myaccount) {
                    this.sid = this.$sessionStorage.myaccount.SessionId;
                }
                else {
                    if (this.$location.path != '/') {
                        this.$location.url('/');
                    }
                    ;
                }
            };
            libraryService.prototype.getAccounts = function () {
                this.checkLogin();
                var deferred = this.$q.defer();
                var url = this.server + "/library/account?sid=" + this.sid;
                this.$http.get(url)
                    .then(function (resp) {
                    deferred.resolve(resp.data);
                });
                return deferred.promise;
            };
            libraryService.prototype.getAuthorsByBookCount = function (bookCount) {
                var _this = this;
                var deferred = this.$q.defer();
                var resolved = false;
                if (this.$sessionStorage.authors && bookCount === 1) {
                    var s = this.$sessionStorage.authors;
                    deferred.resolve(s);
                    resolved = true;
                }
                if (this.$sessionStorage.authors30 && bookCount === 30) {
                    var s = this.$sessionStorage.authors30;
                    deferred.resolve(s);
                    resolved = true;
                }
                if (!resolved) {
                    var url = this.server + "/api/author?bookCount=" + bookCount;
                    this.$http.get(url)
                        .then(function (resp) {
                        if (bookCount === 1) {
                            _this.$sessionStorage.authors = resp.data;
                        }
                        if (bookCount === 30) {
                            _this.$sessionStorage.authors30 = resp.data;
                        }
                        deferred.resolve(resp.data);
                    });
                }
                return deferred.promise;
            };
            libraryService.prototype.getSubjects = function () {
                var _this = this;
                var deferred;
                deferred = this.$q.defer();
                if (this.$sessionStorage.subjects) {
                    var s = this.$sessionStorage.subjects;
                    deferred.resolve(s);
                }
                else {
                    var url = this.server + "/api/subject";
                    return this.$http.get(url)
                        .then(function (resp) {
                        _this.$sessionStorage.subjects = resp.data;
                        deferred.resolve(resp.data);
                    });
                }
                return deferred.promise;
            };
            libraryService.prototype.saveSubject = function (subject) {
                this.checkLogin();
                var url = this.server + "/api/subject?" + this.sid;
                if (subject.SubjectId > 0) {
                    console.log("PUT");
                    return this.$http.put(url, subject);
                }
                else {
                    console.log("POSTED");
                    return this.$http.post(url, subject);
                }
            };
            libraryService.prototype.Login = function (email, password) {
                var creds = { "email": email, "password": password };
                var url = this.server + "/api/Account/";
                return this.$http.post(url, creds);
            };
            libraryService.prototype.uploadImage = function (fd) {
                this.checkLogin();
                var url = this.server + "/api/image/";
                return this.$http.post(url, fd, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                });
            };
            libraryService.prototype.getBook = function (Prefix, BookNumber) {
                var url = this.server + "/api/library/catalog/" + Prefix + "/" + BookNumber;
                return this.$http.get(url);
            };
            libraryService.prototype.getBookHistory = function (Prefix, BookNumber) {
                var url = this.server + "/library/catalog/" + Prefix + "/" + BookNumber + "/history";
                return this.$http.get(url);
            };
            libraryService.prototype.getAccount = function (id) {
                this.checkLogin();
                var url = this.server + "/library/account/" + id + "?sid=" + this.sid;
                return this.$http.get(url);
            };
            libraryService.prototype.AddRequest = function (callnumber, email) {
                var obj = { "CallNumber": callnumber, "RequestByEmail": email };
                var url = this.server + "/library/request?sid=" + this.sid;
                return this.$http.post(url, obj);
            };
            libraryService.prototype.getOpenRequests = function () {
                this.checkLogin();
                var url = this.server + "/library/request?sid=" + this.sid;
                return this.$http.get(url);
            };
            libraryService.prototype.getRequest = function (id) {
                var url = this.server + "/library/request/" + id + "?sid=" + this.sid;
                return this.$http.get(url);
            };
            libraryService.prototype.UpdateRequest = function (obj) {
                this.checkLogin();
                var url = this.server + "/library/request?sid=" + this.sid;
                return this.$http.put(url, obj);
            };
            libraryService.prototype.saveBook = function (book) {
                this.checkLogin();
                var url = this.server + "/api/catalog?sid=" + this.sid;
                if (book.BookId > 0) {
                    return this.$http.put(url, book);
                }
                else {
                    return this.$http.post(url, book);
                }
            };
            libraryService.prototype.Search = function (subject, author, title) {
                var url = this.server + "/api/library/search?prefix=" + subject + "&author=" + author + "&title=" + title;
                return this.$http.get(url);
            };
            libraryService.prototype.LookupAccount = function (searchType, q) {
                var deferred;
                if (this.sid) {
                    deferred = this.$q.defer();
                    var url = this.server + "/library/accounts/search/email?q=" + q + "&sid=" + this.sid;
                    this.$http.get(url)
                        .then(function (resp) {
                        deferred.resolve(resp);
                    });
                }
                return deferred.promise;
            };
            libraryService.prototype.SaveAccount = function (account) {
                var deferred;
                deferred = this.$q.defer();
                var url = this.server + "/library/account?sid=" + this.sid;
                if (account.AccountId > 0) {
                    this.$http.put(url, account)
                        .then(function (resp) {
                        deferred.resolve(resp);
                    });
                }
                else {
                    this.$http.post(url, account)
                        .then(function (resp) {
                        deferred.resolve(resp);
                    });
                }
                return deferred.promise;
            };
            libraryService.prototype.UpdateAccountPassword = function (id, password) {
                var deferred;
                deferred = this.$q.defer();
                var obj = {};
                obj.AccountId = id;
                obj.NewPassword = password;
                var url = this.server + "/library/account?sid=" + this.sid;
                this.$http.put(url, obj)
                    .then(function (resp) {
                    deferred.resolve(resp);
                });
                return deferred.promise;
            };
            libraryService.prototype.Recent = function () {
                var url = this.server + "/api/library/search";
                return this.$http.get(url);
            };
            libraryService.prototype.UpdatePermissions = function () {
                if (this.$sessionStorage.myaccount) {
                    var a = this.$sessionStorage.myaccount;
                    return new Application.Context.NavigationPermissions(a.AccountType);
                }
                else {
                    return new Application.Context.NavigationPermissions('Anon');
                }
            };
            return libraryService;
        }());
        Services.libraryService = libraryService;
        app.service('libraryService', libraryService);
    })(Services = Application.Services || (Application.Services = {}));
})(Application || (Application = {}));
//# sourceMappingURL=tsc.js.map