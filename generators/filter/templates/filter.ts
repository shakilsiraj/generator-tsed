import { Filter, IFilter, ParamRegistry } from "@tsed/common";

@Filter()
export class <%= filterName %>Impl implements IFilter {

    constructor() {

    }

    public transform(expression: string, request, response) {    
    }
}

export function <%= filterName %>(expression?: string | any, useType?: any): Function {
    return ParamRegistry.decorate(<%= filterName %>Impl, { expression, useType });
}