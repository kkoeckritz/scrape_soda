module.exports = (app) => {

    // render home view
    app.get("/", function(req, res) {
    Article.find({"in_library": false}, function(error, data) {
      var handle_view = {
        article: data
      };
      console.log(handle_view);
      res.render("home", handle_view);
    });
  });
  
  // render library view 
  app.get("/library", function(req, res) {
    Article.find({"in_library": true}).populate("notes").exec(function(error, articles) {
      var handle_view = {
        article: articles
      };
      res.render("library", handle_view);
    });
  });
};