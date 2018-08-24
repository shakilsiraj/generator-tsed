import { ExpressServer } from './../source/server';
import { bootstrap, inject } from '@tsed/testing';
import { InjectorService, ServerSettingsService, ServerSettingsProvider } from '@tsed/common';

describe("Server", () => {
    let appSettings;

    beforeAll(bootstrap(ExpressServer));

    beforeAll(inject([InjectorService], (injectorService: InjectorService) => {
        appSettings = injectorService.get<ServerSettingsProvider>(ServerSettingsService);
    }));

    <% if (httpPort) { %>
        it('should be using <%= httpPort %>', () => {
            expect(appSettings.get('httpPort')).toBe(<%= httpPort %>);
        });
    <% } %>

    <% if (httpPort) { %>
        it('should be using <%= mountPoint %> for controllers mounting', () => {
            expect(appSettings.get('mountPoint')).toBe(<%= mountPoint %>);
        });
    <% } %>

});