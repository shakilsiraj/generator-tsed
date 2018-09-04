import { inject } from "@tsed/testing";
import { FilterService, ParamRegistry } from "@tsed/common";
import { <%= filterName %>Impl, <%= filterName %> } from "<%= filterClassPath %>";

describe("<%= filterName %>", () => {
    it("instance should be created", inject([FilterService], (filterService: FilterService) => {
        expect(filterService.invoke <<%= filterName %>Impl > (<%= filterName %>Impl)).toBeDefined();
    }));

    it('decorator should be using ParamRegistry', () => {
        const paramRegistrySpy = jest.spyOn(ParamRegistry, "decorate");
        <%= filterName %>("test", "type");
        expect(paramRegistrySpy).toHaveBeenCalledWith(<%= filterName %>Impl, { "expression": "test", "useType": "type" });
    });

});