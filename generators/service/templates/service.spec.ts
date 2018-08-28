import { inject, bootstrap } from "@tsed/testing";
import { <%= serviceClassName %> } from "<%= serviceRelativePath %>";
import { <%= serverClassName %> } from "<%= serverRelativePath %>";

describe("<%= serviceClassName %>", () => {
    let instance: <%= serviceClassName %>;
    // bootstrap your Server to load all endpoints before run your test
    beforeAll(bootstrap(<%= serverClassName %>));

    beforeAll(inject([<%= serviceClassName %>], (<%= serviceClassVariableName %>: <%= serviceClassName %>) => {
        instance = <%= serviceClassVariableName %>;
    }))

    it("instance should be defined", () => {
        expect(instance).toBeDefined();
    });

    it("test method should pass", async () => {
        const result = await instance.testMethod();
        expect(result.test).toBe('done');
    });

});