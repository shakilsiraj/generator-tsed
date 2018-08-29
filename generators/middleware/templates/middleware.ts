import { IMiddleware, Middleware, EndpointInfo, Endpoint, Request, Scope, ProviderScope } from "@tsed/common";

@Middleware()
@Scope(ProviderScope.SINGLETON)
export default class <%= middlewareClassName %> implements IMiddleware {
    public use(@Request() request, @EndpointInfo() endpoint: Endpoint) {
    }
}