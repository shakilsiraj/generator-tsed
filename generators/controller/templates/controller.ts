import { Controller, Get, PathParams } from "@tsed/common";

@Controller("/<%= controllerName %>")
export class <%= controllerClassName %> {
    @Get("/:id")
    async get(@PathParams("id") id: string): Promise<any> {
        return {
            id,
            name: "test"
        };
    }
}