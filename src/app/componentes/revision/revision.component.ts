
import { Component, OnInit } from '@angular/core';

//Importación del Servicio
import { IncidenciaService } from 'src/app/servicios/incidencia.service';

//Importación del Modelo
import { Incidencia } from '../../modelos/incidencia.model';





@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.css'],
  
})
export class RevisionComponent implements OnInit {
  Incidencias : Incidencia[]
  IncidenciasFiltradas: Incidencia[];
  filtroRevisada: string = 'todos'; // Valor inicial del filtro

  constructor(private incidenciaService : IncidenciaService) { }

  

  //Listará los datos de Incidencias
  ngOnInit(): void {
    this.incidenciaService.getIncidencias().subscribe((res) => {
        this.Incidencias = res.map((e)=>{
          return{
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as Incidencia)
          };
        });
        if (this.filtroRevisada === 'todos') {
          this.IncidenciasFiltradas = this.Incidencias;
        } else if (this.filtroRevisada === 'revisada') {
          this.IncidenciasFiltradas = this.Incidencias.filter(incidencia => incidencia.revisada);
        } else if (this.filtroRevisada === 'no-revisada') {
          this.IncidenciasFiltradas = this.Incidencias.filter(incidencia => !incidencia.revisada);
        }
      });
  }

  // Método para actualizar el valor del filtro
  actualizarFiltro(): void {
    if (this.filtroRevisada === 'todos') {
      this.IncidenciasFiltradas = this.Incidencias;
    } else if (this.filtroRevisada === 'revisada') {
      this.IncidenciasFiltradas = this.Incidencias.filter(incidencia => incidencia.revisada);
    } else if (this.filtroRevisada === 'no-revisada') {
      this.IncidenciasFiltradas = this.Incidencias.filter(incidencia => !incidencia.revisada);
    }
  }
}