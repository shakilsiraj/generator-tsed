'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const depsJson = require('./templates/deps.json');

module.exports = class extends Generator {

  constructor(args, options) {
    super(args, options);
    this.argument('appName', { type: String, required: true });
  }


  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the bedazzling ${chalk.red('generator-tsed')} \n ${this.user.git.name()}!`)
    );

    this.log('Let\'s get straight to business!');

    const prompts = [
      {
        type: 'input',
        name: 'userName',
        message: 'Your name for package.json',
        default: this.user.git.name(),
        store: true
      },
      {
        type: 'input',
        name: 'userEmailAddress',
        message: 'Your email address',
        default: this.user.git.email(),
        store: true
      },
      {
        type: 'input',
        name: 'projectName',
        message: 'Your project name',
        default: this.options.appName,
        required: true
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: 'A brief description about your project'
      },
      {
        type: 'input',
        name: 'projectHttpPort',
        message: 'Http port for running the server (hint: value 0 would mean random)',
        required: true
      },
      {
        type: 'input',
        name: 'projectHttpsPort',
        message: 'Https port for running the server (hint: value 0 would mean random)',
        required: true
      },
      {
        type: 'input',
        name: 'mountPoint',
        message: 'Url prefix for api mounting',
        required: true
      },
      {
        type: 'input',
        name: 'vsCodeSettings',
        message: 'Would like to have VSCode launch configuration for debugging?',
        default: true,
        required: true
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  async writing() {
    this.preWrite();
    this.writePackageJson();
    this.copyRequiredProjectFiles();
  }

  copyRequiredProjectFiles() {

    const values = {
      httpPort: this.props.projectHttpPort,
      httpsPort: this.props.projectHttpsPort,
      mountPoint: this.props.mountPoint
    };

    this.fs.copy(
      this.templatePath('tsconfig.json'),
       this.destinationPath('tsconfig.json')
    );
     this.fs.copy(
      this.templatePath('tslint.json'),
      this.destinationPath('tslint.json')
     );
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('jest.config.js'),
      this.destinationPath('jest.config.js')
    );
    this.fs.copy(
      this.templatePath('source'),
      this.destinationPath('source')
    );
    this.fs.copyTpl(
      this.templatePath('spec/server.spec.ts'),
      this.destinationPath('spec/server.spec.ts'),
      values
    );
    this.fs.copyTpl(
      this.templatePath('serversettings.json'),
      this.destinationPath('source/serversettings.json'),
      values
    );
    if (this.props.vsCodeSettings){
      this.fs.copy(
        this.templatePath('.vscode'),
        this.destinationPath('.vscode')
      );
    }

    this.config.set('server', "source/server");
    this.config.set('serverClass', "ExpressServer");
    this.config.save();
  }

  preWrite() {
    this.props.pjson = {
      keywords: depsJson.main.keywords,
      dependencies: depsJson.main.dependencies,
      devDependencies: depsJson.main.devDependencies
    };
  }

  writePackageJson() {
    let packageJson = {
      "name": this.props.projectName,
      "version": "0.1.0",
      "private": true,
      "description": this.props.projectDescription,
      "author": {
        "name": this.props.userName,
        "email": this.props.userEmailAddress,
      },
      "main": "build/index.js",
      "keywords": [
      ],
      "scripts": {
        "start": "ts-node source/Server.ts",
        "test": "jest"
      },
      "keywords": this.props.pjson.keywords,
      "dependencies": this.props.pjson.dependencies,
      "devDependencies": this.props.pjson.devDependencies,
      "engines": {
        "node": ">=6.0.0"
      }
    }
    this.fs.writeJSON(this.destinationPath('package.json'), packageJson);
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }
};
