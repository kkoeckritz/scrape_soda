module.exports = (app, db) => {

    // render home view
    app.get("/", function(req, res) {
    db.Article.find({"in_library": false}, function(error, data) {
      var handle_view = {
        article: data
      };
      console.log(handle_view);
      res.render("index", handle_view);
    });
  });
  
  // render library view 
  app.get("/library", function(req, res) {
    db.Article.find({"in_library": true}).populate("notes").exec(function(error, data) {
      var handle_view = {
        article: data
      };
      res.render("library", handle_view);
    });
  });
};