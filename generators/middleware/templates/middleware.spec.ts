import { inject } from "@tsed/testing";
import { <%= middlewareClassName %> } from "<%= middlewareClassPath %>";

describe("%= middlewareClassName %>", () => {
    it("should be created", inject([<%= middlewareClassName %>], (middleware: <%= middlewareClassName %>) => {

        expect(middleware).toBeDefined();
    }));
});