import { AppTypes, EnvTypes } from '../index';
import * as ora from 'ora'
import * as chalk from 'chalk'
import * as webpack from 'webpack'
import * as fs from "fs-extra"
import paths from '../configs/paths'

// function copyPublicFolder()
// {
// 	fs.copySync(paths.appPublic, paths.appBuild, {
// 		dereference: true,
// 		filter: file => file !== paths.appHtml,
// 	});
// }

export function build(appType: AppTypes, envType: EnvTypes, options?: object)
{
	console.log("start build", appType, envType, options)
	if (Object.values(EnvTypes).includes(envType))
	{
		process.env.NODE_ENV = envType;
		console.log(`Current app path: ${chalk.blue(paths.appPath())}`)

		// Remove all content but keep the directory so that
		// if you're in it, you don't end up in Trash
		fs.emptyDirSync(paths.appBuild);
		// Merge with the public folder
		// copyPublicFolder(); // 这里可以不拷贝，而是在webpack中使用CopyWebpackPlugin拷贝public中的文件

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
	else
	{
		console.log(chalk.red('Env type not found.\n'))
		process.exit(1)
	}
}

export function deploy(appType: AppTypes, envType: EnvTypes, options?: object)
{
	console.log("start deploy", appType, envType, options)
}
