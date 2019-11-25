import { Component, OnInit } from '@angular/core';

import  {Sorteo} from './sorteo';
import {SorteoService  } from './sorteo.service';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sorteo',
  templateUrl: './sorteo.component.html',
  styleUrls: ['./sorteo.component.css']
})
export class SorteoComponent implements OnInit {
	sorteos: Sorteo[];
  editando:boolean;
  currentSorteo:Sorteo;

  constructor(private serviceS:SorteoService) {
        this.editando = false;
        this.currentSorteo = new Sorteo;
      }

  ngOnInit() {
    this.serviceS.getSorteos().subscribe(sorteos =>{
        this.sorteos = sorteos;
      })
  }

  onGuardarSorteo(myForm: NgForm){
    this.serviceS.addSorteo(this.currentSorteo);
    Swal.fire("Registrado correctamente!", "El sorteo se ha registrado con exito!", "success");
    this.clear();
  }


  clear(){
      this.editando = false;  
      this.currentSorteo = new Sorteo;
  }
  update(){
    this.serviceS.updateSorteo(this.currentSorteo);
    this.clear();
  }
  editSorteo(event, sorteo:Sorteo){
    this.editando = true;
    this.currentSorteo = sorteo;
  }
  delete(event,sorteo:Sorteo){
    Swal.fire({
  title: 'Estas seguro?',
  text: "El sorteo seleccionado se eliminara!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, eliminar!'
}).then((result) => {
  if (result.value) {
    this.serviceS.deleteSorteo(sorteo);
    Swal.fire(
      'Eliminado!',
      'Sorteo eliminado correctamente!',
      'success'
    )
  }
})
    
    
  }
}
