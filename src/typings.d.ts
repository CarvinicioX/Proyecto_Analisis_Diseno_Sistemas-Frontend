/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module "wow.js/dist/wow.js" {
    var noTypeInfoYet: any;
    export = noTypeInfoYet;
}
