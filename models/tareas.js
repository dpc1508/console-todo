const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  listadoCompleto() {
    if (this.listadoArr.length <= 0) return console.log(`No hay tareas`.red);

    console.log();
    this.listadoArr.forEach((tarea, index) => {
      console.log(
        `${`${index + 1}`.green} ${tarea.desc} :: ${
          !tarea.completedAt ? "Pendiente".red : `${tarea.completedAt}`.green
        }`
      );
    });
  }

  listarPendientesOCompletadas(completadas = true) {
    if (this.listadoArr.length <= 0) return console.log(`No hay tareas`.red);

    const tareasPorListar = this.listadoArr.filter((tarea) => {
      if (completadas) return tarea.completedAt !== null;
      else return tarea.completedAt === null;
    });

    console.log();
    if (tareasPorListar.length <= 0)
      return console.log(
        `No hay tareas ${completadas ? "completadas" : "pendientes"}`.blue
      );

    tareasPorListar.forEach((tarea, index) => {
      console.log(
        `${`${index + 1}`.green} ${tarea.desc} :: ${
          !tarea.completedAt ? "Pendiente".red : `${tarea.completedAt}`.green
        }`
      );
    });
  }

  borrarTarea(id = ''){
    if(this._listado[id]){
      delete this._listado[id]
      console.log()
      console.log('Tarea borrada'.cyan)
    }
  }

  toggleCompletadas(ids = []){
    ids.forEach( id => {
      const tarea = this._listado[id];
      if(!tarea.completedAt) tarea.completedAt = new Date().toISOString()
    })

    this.listadoArr.forEach(tarea => {
      if(!ids.includes(tarea.id)) {
        this._listado[tarea.id].completedAt = null
      }
    })
  }
}

module.exports = Tareas;
