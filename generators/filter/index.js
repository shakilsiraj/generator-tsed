'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const _ = require('lodash');
const utils = require('../Utils');

module.exports = class extends Generator {

  constructor(args, options) {
    super(args, options);
    this.argument('filterName', { type: String, required: true });
  }

  async writing() {

    const destFilterPath = this.destinationPath(`source/filters/${this.options.filterName}`);
    const destFilterSpecPath = this.destinationPath(`spec/filters/${this.options.filterName}`);
    const filterRelativePath = utils.getUnixStylePath(path.relative(destFilterSpecPath, destFilterPath));

    // const serverPath = this.destinationPath(this.config.get('server'));
    // const serverRelativePath = utils.getUnixStylePath(path.relative(destServiceSpecPath, serverPath));

    const filter = this.options.filterName.split('/').pop();

    const values = {
      filterName: _.capitalize(filter),
      filterClassPath: filterRelativePath
    }

    /**Copy controller template*/
    this.fs.copyTpl(
      this.templatePath('filter.ts'),
      destFilterPath + '.ts',
      values
    );


    /**Copy controller spec template*/
    this.fs.copyTpl(
      this.templatePath('filter.spec.ts'),
      destFilterSpecPath + '.spec.ts',
      values
    );

    /* Check serversettings.json and update if required */
    const serverSettingsPath = this.destinationPath("source/serversettings.json");
    const serverSettings = require(serverSettingsPath);

    let configFound = false;
    serverSettings.componentsScan.forEach(component => {
      if (component.indexOf('/filters/') > -1) {
        configFound = true;
      }
    });
    if (!configFound) {
      serverSettings.componentsScan.push("${rootDir}/filters/**/**.ts");
      this.fs.writeJSON(serverSettingsPath, serverSettings);
    }
  }

  
};
