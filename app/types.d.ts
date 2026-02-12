// Global declarations
declare var app: ng.IModule;
declare var angular: ng.IAngularStatic;
declare var auth0: any;
declare function profile(): any;
declare var IIncome: any;
interface IIncome { }

// Application type definitions
declare module Application.Library.Types {
    interface IBook {
        BookId: number;
        Title: string;
        Author: string;
        Prefix: string;
        BookNumber: number;
        CallNumber: string;
        Subject: string;
        SubjectId: number;
        Status: string;
        Url: string;
        Notes: string;
        Number: any;
        bookImage: string;
        Barcode: string;
        Description: string;
        Edition: string;
        ISBN: string;
        Media: string;
        PubDate: string;
        Publisher: string;
        PubLocation: string;
    }
}
