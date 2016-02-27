// function jsonapify(guide) {
//
//   var data = {};
//
//   if (guide) {
//     var attributes = {
//       title: guide.title,
//       body: guide.body,
//       created: guide.created,
//       updated: guide.updated,
//       tags: guide.tags,
//     };
//
//     data.type = "soundsense";
//     data.id = guide._id;
//     data.attributes = attributes;
//   } else {
//     data = {
//       error: {
//         attributes: {
//           title: "Something"
//         }
//       }
//     };
//   }
//
//   return data;
//
// }

module.exports = function(router) {

  router.route('/api/v1/soundsense')

    .post(function(req, res) {
      console.log("[POST] /api/v1/soundsense");
      var data = req.body.data;
      console.log({
        data: data;
      })

    })

    // [GET] /api/v1/soundsense
    .get(function(req, res) {

    });
};
