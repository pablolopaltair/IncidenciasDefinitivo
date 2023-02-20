import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';



//Importación del Servicio
import { IncidenciaService } from 'src/app/servicios/incidencia.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

//Importación del Modelo
import { Incidencia } from 'src/app/modelos/incidencia.model';
import { UserInterface } from 'src/app/modelos/rol.model';







@Component({
  selector: 'app-mostrar2',
  templateUrl: './mostrar2.component.html',
  styleUrls: ['./mostrar2.component.css'],
  
})
export class Mostrar2Component implements OnInit {

  //Array de Incidencia
  Usuarios : UserInterface[]

  constructor(private usuarioService : UsuarioService) { }

  //Listará los datos de Incidencias
  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe((res) => {
        this.Usuarios = res.map((e)=>{
          return{
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as UserInterface)
          }
        })
      }
    );

    

  }




}
