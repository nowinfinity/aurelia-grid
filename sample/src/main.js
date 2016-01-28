//import 'github:twbs/bootstrap@3.3.6';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-grid');

  aurelia.start().then(a => a.setRoot('app'));
}
