import { Controller, Get, PathParams } from "@tsed/common";
import { Description } from "@tsed/swagger";

@Controller("/<%= controllerName %>")
@Description("Controller endpoints for <%= controllerClassName %>")
export class <%= controllerClassName %> {
    @Get("/:id")
    async get(@PathParams("id") id: string): Promise<any> {
        return {
            id,
            name: "test"
        };
    }
}