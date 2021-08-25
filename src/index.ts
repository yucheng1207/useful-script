#!/usr/bin/env node
import * as chalk from 'chalk' // 用于设置终端字符串样式
import * as minimist from 'minimist' // 用于解析命令行参数
import * as inquirer from 'inquirer' // 一组通用的交互式命令行用户界面
import { Command } from 'commander' // 完整的 node.js 命令行解决方案(https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md)
import * as packageJson from '../package.json'
import { build, deploy } from './commands/index';
const program = new Command(packageJson.name)

export enum AppTypes
{
	REACT_APP = "reactapp",
};

export enum EnvTypes
{
	DEV = 'development',	// 开发环境
	TEST = 'test',			// 测试环境
	RC = 'production:rc',	// 预正式环境
	PROD = 'production',	// 正式环境
}

program.version(packageJson.version, '-v, --version')

program
	.command('build')
	.argument('app-type', `App Types available at build time：${chalk.green(Object.values(AppTypes))}.`)
	.argument('env-type', `Env Types available at build time：${chalk.green(Object.values(EnvTypes))}.`)
	// .option('-t, --test')
	.action((appType: AppTypes, envType: EnvTypes, options: object) =>
	{
		if (Object.values(AppTypes).includes(appType) && Object.values(EnvTypes).includes(envType))
		{
			build(appType, envType, options)
		} else
		{
			throw new Error(`Please enter a vaild app-type and env-type`);
		}
	});

program
	.command('deploy')
	.argument('app-type', `App Types available at deploy time：${chalk.green(Object.values(AppTypes))}.`)
	.argument('env-type', `Env Types available at deploy time：${chalk.green(Object.values(EnvTypes))}.`)
	.action((appType: AppTypes, envType: EnvTypes, options: object) =>
	{
		if (Object.values(AppTypes).includes(appType) && Object.values(EnvTypes).includes(envType))
		{
			deploy(appType, envType, options)
		} else
		{
			throw new Error(`Please enter a vaild app-type and env-type`);
		}
	});

program.parse(process.argv);
