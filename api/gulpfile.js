'use strict';
//some trival change
require("./test/e2e/globals.js");
let gulp = require('gulp');
let mocha = require('gulp-mocha');
const fs = require('fs-extra');

const globby = require('globby');
let util = require('util');
const sconf = new (require('./secureConf.js'))();
const Promise = require("bluebird");

process.getArgv = function (name) {
    let argIndex = process.argv.indexOf(name);
    if (argIndex > 0) {
        return process.argv[argIndex + 1];
    }
    return null;
};
const environments = ['development', 'production'];

function configure() {
    let envIdx = process.argv.indexOf("NODE_ENV");
    if (!process.env.NODE_ENV) {
        console.log(" setting node_env to default");
        process.env.NODE_ENV = 'development';
    }
    console.log("configuring tests for: " + process.env.NODE_ENV + " environment.");
    require('./src/core/config/configuration.js');
    require('./test/bootstrap.js');
}

gulp.task('all-tests', ['unit-tests'], function () {
    configure();
    console.log('finishted');
});

gulp.task('unit-tests', function () {
    configure();
    require('./test/bootstrap.js');
    return gulp.src(['./test/unit/**/*.js'], {read: false})
        .pipe(mocha({
            reporter: 'spec',
            ui: 'bdd'
        }).once('error', (e) => {
            if (e) {
                console.log(e);
            }
            process.exit(1);
        }).once('end', () => {
            process.exit();
        }));
});

function scrubObject(value) {
    let preserve = value.preserve || [];
    let scrubbed = {};
    Object.keys(value).forEach(function (key) {
        if (key === 'preserve') {
            return;
        }
        let preserved = (preserve.indexOf(key) >= 0 || preserve.includes('all'));
        scrubbed[key] = preserved ? copyValue(value[key]) : scrubValue(value[key]);
    });
    return scrubbed;
}

function scrubArray(value) {
    let scrubbed = [];
    if (value.length > 0) {
        scrubbed.push(scrubValue(value[0]));
    }
    return scrubbed;
}

function copyValue(value) {
    if (util.isArray(value)) {
        return value.map(scrubValue);
    }
    return value;
}

function scrubValue(value) {
    if (util.isArray(value)) {
        return scrubArray(value);
    }
    if (util.isObject(value)) {
        return scrubObject(value);
    }
    return null;
}

gulp.task('generate-models', function () {
    let viewsDirs = ["./src/core/views/", "./src/retail/views/", "./src/warehouse/views/"];
    viewsDirs.forEach((viewsDir) => {
        globby(["**/default.data/*.json", "**/open.data/*.json"], {cwd: viewsDir}).then(paths => {
            if (paths) {
                paths.forEach(function (path) {
                    let filename = viewsDir + path;
                    if (path.includes("default.json") || path.includes("open.json") || path.toLowerCase().includes("rts")) {
                        console.log("generating default view model from: " + path);
                        fs.readFile(filename, function (err, data) {
                            let defaultModel = JSON.parse(data);
                            let scrubbedModel = scrubObject(defaultModel);
                            fs.writeFile(filename, JSON.stringify(scrubbedModel), function (err) {
                                if (err) {
                                    console.log(err);
                                }
                            })
                        });
                    } else {
                        console.log("deleting data file: " + filename);
                        fs.unlinkSync(filename);
                    }
                });
            }
        });
    });
});

gulp.task('server', function () {
    configure();
    let app = process.getArgv("--app");
    let serverName = "./warehouse-server.js";
    if (app) {
        serverName = `./${app}-server`
    }
    let server = require(serverName);
    console.log("Starting server: " + serverName);
    return server.run;
});

gulp.task('encrypt-configs', () => {
    return Promise.map(environments, environment => {
        return new Promise((resolve, reject) => {
            sconf.encrypt(
                `./src/config/${environment}.json`,
                `./src/config/${environment}.json.enc`,
                `${environment}-config`,
                (err) => {
                    return err ? reject(err) : resolve();
                }
            )
        })
    });
});

gulp.task('decrypt-configs', () => {
    return Promise.map(environments, environment => {
        return new Promise((resolve, reject) => {
            sconf.decrypt(
                `./src/config/${environment}.json.enc`,
                `${environment}-config`,
                (err, file, contents) => {
                    if (err) return reject();
                    fs.writeFile(`./src/config/${environment}.json`, contents, resolve);
                }
            )
        })
    });
});
