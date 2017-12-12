const pageId = document.querySelector('.l-page').getAttribute('data-page-id');

const init = () => {
  require ('./init/common.js').default();
  switch (pageId) {
    case 'index': require ('./init/index.js').default(); break;
    case 'syncIndex': require ('./init/sync/index.js').default(); break;
    default:
  }
}
init();
