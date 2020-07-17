let appData = require('./apps-data');

const sendErrorResponse = (res, err) => {
  return res.status(400).send(err).end();
}
const sortByRating = (apps) =>
  apps.sort((a,b) => ( a.Rating > b.Rating) ? -1 : ((b.Rating > a.Rating) ? 1 : 0))

const sortByApp = (apps) =>
  apps.sort((a,b) => ( a.App > b.App) ? 1 : ((b.App > a.App) ? -1 : 0))

const sortAppsIfNeeded = (apps, sortParam, res) => {
  if (!sortParam) return apps
  if (sortParam === 'app') return sortByApp(apps)
  if (sortParam === 'rating') return sortByRating(apps)

  sendErrorResponse(res, 'Invalid sort param value')
  throw Error('Invalid sort param value')
}

exports.getApps = (req, res) => {
  const { sort, generes } = req.query
  let apps = appData;
  apps = sortAppsIfNeeded(apps, sort, res)
  if (generes) {
    apps = apps.filter(app => app.Genres === generes)
  }
  res.json(apps);
}
