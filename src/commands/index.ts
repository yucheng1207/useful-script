import { AppTypes, EnvTypes } from '../index';

export function build(appType: AppTypes, envType: EnvTypes, options?: object)
{
	console.log("start build", appType, envType, options)
}

export function deploy(appType: AppTypes, envType: EnvTypes, options?: object)
{
	console.log("start deploy", appType, envType, options)
}
