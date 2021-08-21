import * as path from 'path'
import * as fs from 'fs'
import * as url from 'url'

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

function ensureSlash(path, needsSlash)
{
	const hasSlash = path.endsWith('/')
	if (hasSlash && !needsSlash)
	{
		return path.substr(path, path.length - 1)
	}
	else if (!hasSlash && needsSlash)
	{
		return `${path}/`
	}
	else
	{
		return path
	}
}

const getPublicUrl = appPackageJson =>
	process.env.PUBLIC_URL || require(appPackageJson).homepage

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson)
{
	const publicUrl = getPublicUrl(appPackageJson)
	const servedUrl = process.env.PUBLIC_URL ||
		(publicUrl ? url.parse(publicUrl).pathname : '/')
	return ensureSlash(servedUrl, true)
}

const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath)

module.exports = {
	dotenv: () => resolveApp('.env'),
	appPath: () => resolveApp('.'),
	appBuild: () => resolveApp('dist'),
	appIndexJs: () => resolveApp('bld/index.js'),
	appIndexTs: () => resolveApp('src/index.ts'),
	appPackageJson: () => resolveApp('package.json'),
	appSrc: () => resolveApp('src'),
	appTestIndex: () => resolveApp('src/__test__/index.js'),
	appTestCoverage: () => resolveApp('src/__test__/coverage'),
	appTestE2E: () => resolveApp('src/__test__/e2e'),
	yarnLockFile: () => resolveApp('yarn.lock'),
	appNodeModules: () => resolveApp('node_modules'),
	publicUrl: () => getPublicUrl(resolveApp('package.json')),
	servedPath: () => getServedPath(resolveApp('package.json')),
	ownPath: () => resolveOwn('.'),
	ownNodeModules: () => resolveOwn('node_modules'),
	appHtml: () => resolveOwn('../public/index.html'),
	appPublic: () => resolveOwn('../public'),
	appStatic: () => resolveApp('static'),
}
