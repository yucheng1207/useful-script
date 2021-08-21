import { AppTypes, EnvTypes } from '../index';
import * as ora from 'ora'
import * as chalk from 'chalk'
import * as webpack from 'webpack'
import paths from '../configs/paths'

export function build(appType: AppTypes, envType: EnvTypes, options?: object)
{
	console.log("start build", appType, envType, options)
	console.log(`Current app path: ${chalk.blue(paths.appPath())}`)
	const webpackConfig = require(`${paths.appPath()}/config/webpack.prod.conf`);

	const spinner = ora('building for production...')
	spinner.start()

	webpack(webpackConfig, (err, stats) =>
	{
		spinner.stop()
		if (err) throw err
		process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
			chunks: false,
			chunkModules: false
		}) + '\n\n')

		if (stats.hasErrors())
		{
			console.log(chalk.red('  Build failed with errors.\n'))
			process.exit(1)
		}

		console.log(chalk.cyan('  Build complete.\n'))
		console.log(chalk.yellow(
			'  Tip: built files are meant to be served over an HTTP server.\n' +
			'  Opening index.html over file:// won\'t work.\n'
		))
	});
}

export function deploy(appType: AppTypes, envType: EnvTypes, options?: object)
{
	console.log("start deploy", appType, envType, options)
}
