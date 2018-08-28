import { inject, bootstrap } from "@tsed/testing";
import { <%= controllerClassName %> } from "<%= controllerRelativePath %>";
import { <%= serverClassName %> } from "<%= serverRelativePath %>";

describe("<%= controllerClassName %>", () => {
    let instance;
    // bootstrap your Server to load all endpoints before run your test
    beforeAll(bootstrap(<%= serverClassName %>));

    beforeAll(inject([<%= controllerClassName %>], (<%= controllerClassVariableName %>: <%= controllerClassName %>) => {
        instance = <%= controllerClassVariableName %>;
    }))

    it("instance should be defined", () => {
        expect(instance).toBeDefined();
    });
});