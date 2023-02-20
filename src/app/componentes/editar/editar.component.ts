import { Component, OnInit } from '@angular/core';

//Importación del Router
import { Router, ActivatedRoute } from '@angular/router';

//Importación de construcción de Formularios 
import { FormBuilder, FormGroup } from '@angular/forms';

//Importación del servicio
import { IncidenciaService } from '../../servicios/incidencia.service';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  //Iniciamos con el Formulario de edición de incidencia
  public editForm: FormGroup
  incidenciaRef: any
  constructor(
    public incidenciaService: IncidenciaService,
    public formBuilder: FormBuilder,
    public activeRoute: ActivatedRoute,
    public router: Router
  ) {
    //Añadimos los campos que vayamos a rellenar, y se inicializan en blanco
    this.editForm = this.formBuilder.group({
    descripcion: [{value: '', disabled: true}],
    estado:[''],
    fecha:[{value: '', disabled: true}],
    lugar:[{value: '', disabled: true}],
    posible_arreglo:[{value: '', disabled: true}],
    revisada:[{value: '', disabled: true}]
    }) }


    //Recuerda los datos de cada campo y los introduce por defecto en el formulario
  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    this.incidenciaService.getIncidenciaById(id).subscribe(res => {
      this.incidenciaRef = res;
      this.editForm = this.formBuilder.group({
        descripcion :[this.incidenciaRef.descripcion],
        estado: [this.incidenciaRef.estado],
        fecha: [this.incidenciaRef.fecha],
        lugar: [this.incidenciaRef.lugar],
        posible_arreglo: [this.incidenciaRef.posible_arreglo],
        revisada: [this.incidenciaRef.revisada]
      })
    })
  }

  //Acción del botón de editar
  onSubmit() {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    this.incidenciaService.updateIncidencia(this.editForm.value, id)
    this.router.navigate(['show'])
  }

}