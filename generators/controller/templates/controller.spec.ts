import { inject, bootstrap } from "@tsed/testing";
import { <%= controllerClassName %> } from "<%= controllerRelativePath %>";
import { ExpressServer } from "<%= serverRelativePath %>";

describe("<%= controllerClassName %>", () => {
    let instance;
    // bootstrap your Server to load all endpoints before run your test
    before(bootstrap(ExpressServer));

    before(inject([<%= controllerClassName %>], (<%= controllerClassVariableName %>: <%= controllerClassName %>) => {
        instance = <%= controllerClassVariableName %>;
    }))

    it("instance should be defined", () => {
        expect(instance).toBeDefined();
    });
});