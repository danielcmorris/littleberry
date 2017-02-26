﻿
module Application.Services {

    interface IMailChimpMergeFields {
        FNAME: string
        LNAME: string
    }
    interface IMailChimp {
        email_type: string// html or plain
        status: string //subscribed
        email_address: string
        merge_fields: IMailChimpMergeFields;
        lists:IChimpLists;
        
    }


    export interface IChimpLists{
        WebSubscription?:string;
        NewsLetter?:string;
        }
    export class mailChimp {
        $insert = ["$http"]
        public lists:IChimpLists=
            {
            WebSubscription :"699a73df35",
            NewsLetter: "e6d3f77f33"
            }
            
         
        constructor(private $http: ng.IHttpService) { }
        CreateMember(data: any, list_id?:string): ng.IPromise<any> {

            if(!list_id){
                data.list_id = this.lists.NewsLetter;                 
                }else{
                data.list_id = list_id;
                }

            let key = "iub2398sd9823jkh2309sd0213joq3sd9f9890uo123jkkpodfoiojkqw"

            let url = "/wp-content/themes/aspire/custom/mail-chimp.php"
            url = "http://pfsa.morrisdev.com" + url;
            let qs = '?api=' + key;
            qs += '&fname=' + data.firstName;
            qs += '&lname=' + data.lastName;
            qs += '&email=' + data.email;
            qs += '&interest=' + data.interest;
            qs += '&phone=' + data.phone;
            qs += '&age=' + data.age;
            qs += '&gender=' + data.gender;
            qs += '&amount=' + data.amount;
            qs += '&list_id=' + data.list_id;

            return this.$http.get(url + qs)



        }
    }

    app.service("mailChimp", mailChimp);


}