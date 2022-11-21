const inquirer = require('inquirer')
require('colors')

const menuOpts = [
	{
		type: 'list',
		name: 'opcion',
		message: '¿Qué desea hacer?',
		choices: [
			{ value: '1', name: `${'1.'.green} Crear tarea` },
			{ value: '2', name: `${'2.'.green} Listar tareas` },
			{ value: '3', name: `${'3.'.green} Listar tareas completadas` },
			{ value: '4', name: `${'4.'.green} Listar tareas pendientes` },
			{ value: '5', name: `${'5.'.green} Completar tarea(s)` },
			{ value: '6', name: `${'6.'.green} Borrar tarea`},
			{ value: '0', name: `${'0.'.green} Salir` },
		]
	}
]

const pauseOpts = {
	type: 'input',
	name: 'continue',
	message: 'Presione ' + 'ENTER'.green + ' para continuar'
}



const inquirerMenu = async () => {
	console.log('========================='.green)
	console.log('  Seleccione una opción'.green)
	console.log('========================='.green)
	const {opcion} = await inquirer.prompt(menuOpts)
	return opcion;
}

const pausa = async() => {	
	console.log('\n')
	await inquirer.prompt(pauseOpts)
	console.clear()
}

const leerInput = async(message) => {
	const question = [
		{
			type: 'input',
			name: 'desc',
			message,
			validate(value){
				if(value.length === 0) return  'Ingrese descripción'
				return true
			}
		}
	]

	const { desc } = await inquirer.prompt(question)
	return desc
}

const listadoBorrar = async ( tareas = [] ) => {
	const choices = tareas.map((tarea, index) => {

		const idx = `${index+1}`.green

		return {
			value: tarea.id,
			name: `${idx}. ${tarea.desc}`
		}
	})

	choices.unshift({
		value: '0',
		name: `${'0'.green}. Cancelar`
	})

	const preguntas = [
		{
			type: 'list',
			name: 'id',
			message: 'Borrar',
			choices
		}
	]

	const { id } = await inquirer.prompt(preguntas);

	return id;
}

const confirmar = async ( message ) => {
	const question = [
		{
			type: 'confirm',
			name: 'ok',
			message
		}
	]

	const { ok } = await inquirer.prompt(question)
	return ok
}

const listadoChecklist = async ( tareas = [] ) => {
	const choices = tareas.map((tarea, index) => {

		const idx = `${index+1}`.green

		return {
			value: tarea.id,
			name: `${idx}. ${tarea.desc}`,
			checked: tarea.completedAt !== null
		}
	})

	const preguntas = [
		{
			type: 'checkbox',
			name: 'ids',
			message: 'Seleccione',
			choices
		}
	]

	const { ids } = await inquirer.prompt(preguntas);

	return ids;
}

module.exports = {
	inquirerMenu,
	pausa,
	leerInput,
	listadoBorrar,
	confirmar,
	listadoChecklist
}
