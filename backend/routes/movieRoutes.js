const routes = (app) => {
  // route for finding a specific movie
  app.route('/title')  // 'title/:titleID' later
    .get((req, res) =>
      res.send('GET request successful!'))
}

export default routes;