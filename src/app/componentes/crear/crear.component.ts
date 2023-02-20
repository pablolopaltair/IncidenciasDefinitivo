import { Component, OnInit } from '@angular/core';

//Importación del Router
import { Router } from '@angular/router';

//Importación del servicio de incidencia
import { IncidenciaService } from '../../servicios/incidencia.service';

//Importación de construcción de Formularios 
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})

export class CrearComponent implements OnInit { 

  //Iniciamos con el Formulario de creación de incidencia
public incidenciaForm : FormGroup

  constructor(
    public incidenciaService: IncidenciaService,
    public formbuilder: FormBuilder,
    public router: Router
  ) { 
    //Añadimos los campos que vayamos a rellenar, y se inicializan en blanco
    this.incidenciaForm = this.formbuilder.group({
    descripcion: [''],
    estado:['Sin estado'],
    fecha:[''],
    lugar:[''],
    posible_arreglo:[''],
    revisada: false //por defecto saldrá revisada falso
    })
  }

  ngOnInit(): void {
  }

  //Acción del botón de crear
  onSubmit() {
    this.incidenciaService.createIncidencia(this.incidenciaForm.value)
    this.router.navigate(['show'])
  }

 


  }

  


