"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meteor_import_1 = require("./meteor-import");
function meteorCallWithPromise(name) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return new Promise(function (resolve, reject) {
        meteor_import_1.Meteor.call.apply(meteor_import_1.Meteor, [name].concat(args, [function (err, result) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            }]));
    });
}
exports.default = meteorCallWithPromise;
//# sourceMappingURL=meteor-call-with-promise.js.map