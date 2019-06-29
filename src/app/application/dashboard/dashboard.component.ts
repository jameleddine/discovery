import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import Swal from 'sweetalert2'
import { Produit } from '../entities/produit.entity';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[CrudService]
})
export class DashboardComponent implements OnInit {
// produits : any = [];
produits : Produit;
  constructor(private http:HttpClient,private route:Router,private crud:CrudService) { }

  ngOnInit() {
   this.getAll();
    // this.http.get('http://localhost:3000/produits').subscribe(res=>{
    //   this.produits = res;
    //   console.log(this.produits);
    // })

}
getAll(){
  this.crud.getAllProducts().subscribe(res=>{
    this.produits = <Produit>res;
    console.log(this.produits);
  })
}

gestion(produit){
  console.log(produit);
  this.route.navigate(['/gestion',produit])
}
delete(produit){
 
 
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this imaginary file!',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      this.crud.deleteProductById(produit).subscribe(res=>{

        this.getAll();
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      })
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })
  
  console.log(produit)
}
}
