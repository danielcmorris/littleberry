module Application.Services {
    export class ToolService {
        convertToCamelCase(o: any): any {
            let mystring = JSON.stringify(o);
            mystring = this.camelCase(mystring);
            return JSON.parse(mystring);
        }

        private camelCase(json: string): string {
            json = json.replace(/-([a-z])/g, function (g) {
                return g[1].toUpperCase();
            });
            return json;
        }
    }
}
