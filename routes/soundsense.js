

var storage = null;

module.exports = function(router) {

  router.route('/api/v1/soundsense')

    .post(function(req, res) {
      console.log("[POST] /api/v1/soundsense");
      var data = req.body.data;
      storage = data;
    })

    // [GET] /api/v1/soundsense
    .get(function(req, res) {
      res.json({
        data: storage
      })
    });
};
