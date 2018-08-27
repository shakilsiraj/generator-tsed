import { ServerLoader, ServerSettings } from "@tsed/common";

import * as Path from "path";
import * as bodyParser from "body-parser";
import { logger } from "./logger/logger";

const serverSettings = require("./serversettings.json");
serverSettings.rootDir = Path.resolve(__dirname);

@ServerSettings(serverSettings)
export class ExpressServer extends ServerLoader {
    public $onMountingMiddlewares(): void {
        this.use(bodyParser.json());
    }

    public $onServerInitError(err) {
        logger.error(err);
    }
}
