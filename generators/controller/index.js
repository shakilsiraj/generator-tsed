'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const _ = require('lodash');

module.exports = class extends Generator {

  constructor(args, options) {
    super(args, options);
    this.argument('controllerName', { type: String, required: true });
  }

  async writing() {

    const destControllerPath = this.destinationPath(`source/controllers/${this.options.controllerName}`);
    const destControllerSpecPath = this.destinationPath(`spec/controllers/${this.options.controllerName}`);
    const controllerRelativePath = path.relative(destControllerSpecPath, destControllerPath);

    const serverPath = this.destinationPath(this.config.get('server'));
    const serverRelativePath = path.relative(destControllerSpecPath, serverPath);

    const controller = this.options.controllerName.split('/').pop();

    const values = {
      controllerName: _.camelCase(controller),
      controllerClassName: _.capitalize(controller),
      controllerClassVariableName: _.camelCase(controller),
      serverRelativePath: serverRelativePath,
      controllerRelativePath: controllerRelativePath
    }

    /**Copy controller template*/
    this.fs.copyTpl(
      this.templatePath('controller.ts'),
      destControllerPath + '.ts',
      values
    );


    /**Copy controller spec template*/
    this.fs.copyTpl(
      this.templatePath('controller.spec.ts'),
      destControllerSpecPath + '.spec.ts',
      values
    );

  }

};
