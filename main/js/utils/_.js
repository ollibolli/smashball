/**
 * Wrapped underscore to a amd module and mixin the util methods
 *
 */
define(['utils/util', 'lib/lodash'],function (util, lodash) {

  util.Mixin(util, lodash, false);
  return util;
});
