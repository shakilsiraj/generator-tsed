'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const _ = require('lodash');
const utils = require('../Utils');

module.exports = class extends Generator {

  constructor(args, options) {
    super(args, options);
    this.argument('serviceName', { type: String, required: true });
  }

  async writing() {

    const destServicePath = this.destinationPath(`source/services/${this.options.serviceName}`);
    const destServiceSpecPath = this.destinationPath(`spec/services/${this.options.serviceName}`);
    const serviceRelativePath = utils.getUnixStylePath(path.relative(destServiceSpecPath, destServicePath));

    const serverPath = this.destinationPath(this.config.get('server'));
    const serverRelativePath = utils.getUnixStylePath(path.relative(destServiceSpecPath, serverPath));

    const service = this.options.serviceName.split('/').pop();

    const values = {
      serviceName: _.camelCase(service),
      serviceClassName: _.capitalize(service),
      serviceClassVariableName: _.camelCase(service),
      serverRelativePath: serverRelativePath,
      serverClassName: this.config.get('serverClass'),
      serviceRelativePath: serviceRelativePath
    }

    /**Copy controller template*/
    this.fs.copyTpl(
      this.templatePath('service.ts'),
      destServicePath + '.ts',
      values
    );


    /**Copy controller spec template*/
    this.fs.copyTpl(
      this.templatePath('service.spec.ts'),
      destServiceSpecPath + '.spec.ts',
      values
    );

  }

};
