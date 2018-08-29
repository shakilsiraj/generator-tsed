'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-tsed:middleware', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/middleware'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
