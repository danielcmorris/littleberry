module Application.Services {
    export class ToolService {
        convertToCamelCase(o: any) {
            let mystring = JSON.stringify(o);
            mystring = this.camelCase(mystring);
            return JSON.parse(mystring);
        }

        private camelCase(json: string) {
            json = json.replace(/-([a-z])/g, function (g) {
                return g[1].toUpperCase();
            });
            return json;
        }
    }


}