'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const _ = require('lodash');
const utils = require('../Utils');

module.exports = class extends Generator {

  constructor(args, options) {
    super(args, options);
    this.argument('middlewareName', { type: String, required: true });
  }

  async writing() {

    const destMiddlewarePath = this.destinationPath(`source/middlewares/${this.options.middlewareName}`);
    const destMiddlewareSpecPath = this.destinationPath(`spec/middlewares/${this.options.middlewareName}`);
    const middlewareRelativePath = utils.getUnixStylePath(path.relative(destMiddlewareSpecPath, destMiddlewarePath));

    // const serverPath = this.destinationPath(this.config.get('server'));
    // const serverRelativePath = utils.getUnixStylePath(path.relative(destServiceSpecPath, serverPath));

    const middleware = this.options.middlewareName.split('/').pop();

    const values = {
      middlewareClassName: _.capitalize(middleware),
      middlewareClassPath: middlewareRelativePath
    }

    /**Copy controller template*/
    this.fs.copyTpl(
      this.templatePath('middleware.ts'),
      destMiddlewarePath + '.ts',
      values
    );


    /**Copy controller spec template*/
    this.fs.copyTpl(
      this.templatePath('middleware.spec.ts'),
      destMiddlewareSpecPath + '.spec.ts',
      values
    );

    /* Check serversettings.json and update if required */
    const serverSettingsPath = this.destinationPath("source/serversettings.json");
    const serverSettings = require(serverSettingsPath);

    let configFound = false;
    serverSettings.componentsScan.forEach(component => {
      if (component.indexOf('/middlewares/') > -1) {
        configFound = true;
      }
    });
    if (!configFound) {
      serverSettings.componentsScan.push("${rootDir}/middlewares/**/**.ts");
      this.fs.writeJSON(serverSettingsPath, serverSettings);
    }
  }

};
