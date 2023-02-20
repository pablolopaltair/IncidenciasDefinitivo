import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';



//Importación del Servicio
import { IncidenciaService } from 'src/app/servicios/incidencia.service';

//Importación del Modelo
import { Incidencia } from '../../modelos/incidencia.model';





@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css'],
  
})
export class MostrarComponent implements OnInit {

  //Array de Incidencia
  Incidencias : Incidencia[]

  constructor(private incidenciaService : IncidenciaService) { }

  //Listará los datos de Incidencias
  ngOnInit(): void {
    this.incidenciaService.getIncidencias().subscribe((res) => {
        this.Incidencias = res.map((e)=>{
          return{
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as Incidencia)
          }
        })
      }
    )
  }

  //Borrará el incidencia seleccionado (Se hace en este componente ya que no es necesario
  //crear un nuevo componente para el borrado)
  deleteRow = (incidencia) => this.incidenciaService.deleteIncidencia(incidencia);

}
