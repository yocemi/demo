const router = require('../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.js');
const routerConfig = require('../../public/js/fos_js_routes.json');
router.setRoutingData(routerConfig);

exports.routing = router;
