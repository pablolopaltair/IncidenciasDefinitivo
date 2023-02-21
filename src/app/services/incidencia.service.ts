import { Injectable } from '@angular/core';

//Importación de Firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';

//Importación del modelo Incidencia
import { Incidencia } from '../modelos/incidencia.model';


@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  constructor(private angularFirestore : AngularFirestore) { }

  //CREACIÓN DE LOS MÉTODOS PARA EL CRUD DE PORTEROS


  //Getter de los porteors
  getIncidencias(){
    return this.angularFirestore
    .collection("incidencias")
    .snapshotChanges()
  }

  //Getter de incidencias por ID
  getIncidenciaById(id){
    return this.angularFirestore
    .collection("incidencias")
    .doc(id)
    .valueChanges()
  }


  //Creación de un nuevo incidencia
  createIncidencia (incidencia: Incidencia){
    return new Promise<any> ( ( resolve, reject)=>{
      this.angularFirestore
            .collection("incidencias")
            .add(incidencia)
            .then( (response)=>{
              console.log(response)
            },
            (error)=>{
              reject(error)
            })

    })
  }


  //Editar-Actualizar los datos de incidencia
  updateIncidencia (incidencia: Incidencia, id){
    return this.angularFirestore
          .collection("incidencias")
          .doc(id)
          .update({
            descripcion: incidencia.descripcion,
            estado: incidencia.estado,
            fecha: incidencia.fecha,
            lugar: incidencia.lugar,
            posible_arreglo: incidencia.posible_arreglo,
            revisada: incidencia.revisada
          });
  }

  //Revisado incidencia
  checkIncidencia (incidencia){
    return this.angularFirestore
          .collection("incidencias")
          .doc(incidencia.id)
          .update({
            revisada: incidencia.revisada == true
          });
  }


  //Eliminar incidencia
  deleteIncidencia(incidencia){
    return this.angularFirestore
    .collection("incidencias")
    .doc(incidencia.id)
    .delete();
  }

}
