System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "traceur",
  paths: {
    "*": "src/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  packages: {
    "/src/aurelia-grid": {
      "main": "index",
      "dependencies": {
        "aurelia-binding": "github:aurelia/binding@^0.11.0",
        "aurelia-dependency-injection": "github:aurelia/dependency-injection@^0.12.0",
        "aurelia-templating": "github:aurelia/templating@^0.17.0"
      }
    }
  },

  map: {
    "MrRio/jsPDF": "github:MrRio/jsPDF@1.2.61",
    "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.0.5",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.0-beta.1.0.2",
    "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.1.0.8",
    "core-js": "npm:core-js@1.2.6",
    "css": "github:systemjs/plugin-css@0.1.20",
    "eligrey/FileSaver.js": "github:eligrey/FileSaver.js@master",
    "eligrey/blob.js": "github:eligrey/blob.js@master",
    "font-awesome": "npm:font-awesome@4.5.0",
    "fs": "github:jspm/nodelibs-fs@0.1.2",
    "html2canvas": "npm:html2canvas@0.5.0-beta4",
    "rasterizehtml": "npm:rasterizehtml@1.2.2",
    "systemjs/plugin-css": "github:systemjs/plugin-css@0.1.20",
    "traceur": "github:jmcriffey/bower-traceur@0.0.93",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.93",
    "twbs/bootstrap": "github:twbs/bootstrap@3.3.6",
    "xlsx": "github:roman-kozubskyy/js-xlsx@0.8.8",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:twbs/bootstrap@3.3.6": {
      "jquery": "github:components/jquery@2.2.0"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:aurelia-binding@1.0.0-beta.1.0.5": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.0.1",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-bootstrapper@1.0.0-beta.1.0.2": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1",
      "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.1.0.8",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0-beta.1.0.1",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-beta.1.0.2",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0-beta.1.0.3",
      "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.0.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.0.3",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-beta.1.0.2",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-beta.1.0.4",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0-beta.1.0.5",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-dependency-injection@1.0.0-beta.1.0.1": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-event-aggregator@1.0.0-beta.1": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1"
    },
    "npm:aurelia-framework@1.0.0-beta.1.0.8": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.0.5",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.0.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.0.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.0.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.0.3",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-history-browser@1.0.0-beta.1.0.1": {
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-loader-default@1.0.0-beta.1.0.2": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.0.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2"
    },
    "npm:aurelia-loader@1.0.0-beta.1.0.1": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1"
    },
    "npm:aurelia-logging-console@1.0.0-beta.1": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2"
    },
    "npm:aurelia-metadata@1.0.0-beta.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-pal-browser@1.0.0-beta.1.0.3": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-route-recognizer@1.0.0-beta.1": {
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-router@1.0.0-beta.1.0.1": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.0.1",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.0.0-beta.1",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-task-queue@1.0.0-beta.1.0.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2"
    },
    "npm:aurelia-templating-binding@1.0.0-beta.1.0.2": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.0.5",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.0.3"
    },
    "npm:aurelia-templating-resources@1.0.0-beta.1.0.4": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.0.5",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.0.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.0.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.0.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.0.3",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:aurelia-templating-router@1.0.0-beta.1.0.5": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.0.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1",
      "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.0.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.0.3"
    },
    "npm:aurelia-templating@1.0.0-beta.1.0.3": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.0.5",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.0.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.0.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.0.2",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.0.1",
      "core-js": "npm:core-js@1.2.6"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:font-awesome@4.5.0": {
      "css": "github:systemjs/plugin-css@0.1.20"
    },
    "npm:html2canvas@0.5.0-beta4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:inlineresources@0.1.7": {
      "ayepromise": "npm:ayepromise@1.1.2",
      "css-font-face-src": "npm:css-font-face-src@0.2.2",
      "cssom": "npm:cssom@0.3.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "url": "npm:url@0.11.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:rasterizehtml@1.2.2": {
      "ayepromise": "npm:ayepromise@1.1.2",
      "css-mediaquery": "npm:css-mediaquery@0.1.2",
      "inlineresources": "npm:inlineresources@0.1.7",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "sane-domparser-error": "npm:sane-domparser-error@0.2.0",
      "url": "npm:url@0.10.3",
      "xmlserializer": "npm:xmlserializer@0.3.3"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:url@0.11.0": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:xmlserializer@0.3.3": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    }
  }
});
