import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator, MatTable } from '@angular/material';
import { Observable } from 'rxjs';

class Bag {
  bag;
  price;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns = [ 'item'];
  bagList = new MatTableDataSource();
  coloursArray: Bag[] = [];
  brandArray: Bag[] = [];
  materialArray: Bag[] = [];
  sizeArray: Bag[] = [];
  filteredArray: any[] = [];
  @ViewChild('MatSort', { static: false }) sort: MatSort
  @ViewChild('MatPaginator', { static: false }) paginator: MatPaginator;

  constructor(public fb: FormBuilder, private http: HttpClient) { }

  elements: any = [];
  isSubmitted = false;
  ngOnInit() {
    this.getColour();
    this.getBrand();
    this.getMaterial();
    this.getSize();

  }
  loadData() {
    return this.http.get<Bag[]>('http://localhost:8083/GetAllBags').subscribe(response => {
      this.bagList = new MatTableDataSource(response);
      this.bagList.paginator = this.paginator
    }
      ,
      error => {
        console.log(error)
      });
  }

  getColour() {
    return this.http.get<Bag[]>('http://localhost:8083/GetColour').subscribe(response => {
      this.coloursArray = response;
    },
      error => {
        console.log(error)
      });
  }

  getBrand() {
    return this.http.get<Bag[]>('http://localhost:8083/GetBrand').subscribe(response => {
      this.brandArray = response;
    },
      error => {
        console.log(error)
      });
  }
  getMaterial() {
    return this.http.get<Bag[]>('http://localhost:8083/GetMaterial').subscribe(response => {
      this.materialArray = response;
    },
      error => {
        console.log(error)
      });
  }

  getSize() {
    return this.http.get<Bag[]>('http://localhost:8083/GetSize').subscribe(response => {
      this.sizeArray = response;
    },
      error => {
        console.log(error)
      });
  }
  RequestBody = {
    type: "",
    brand: "",
    material: "",
    size: "",
    bagInstance: "",
    colour: ""
  };
 
  selectedType = "";
  selectedBrand = "";
  selectedMaterial = "";
  selectedSize = "";
  selectedColour = "";


  selectType() {
    this.RequestBody.type = this.selectedType.bag;
    console.log(this.selectedType);
  }

  selectSize() {
    this.RequestBody.size = this.selectedSize.bag;
    console.log(this.selectedSize)
  }

  selectBrand() {
    this.RequestBody.brand = this.selectedBrand.bag;
    console.log(this.selectedBrand);
  }
  selectMaterial() {
    this.RequestBody.material = this.selectedMaterial.bag;
    console.log(this.selectedMaterial);
  }

  selectColour() {
    this.RequestBody.colour = this.selectedColour.bag;
    console.log(this.selectedColour);
  }

  search() {
    return this.http.post('http://localhost:8083/getFilteredBags', JSON.stringify(this.RequestBody), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe(response => {
      //this.filteredArray=response;
      console.log(response);
      if (response != null) {
        console.log(this.elements);
        this.flushMainList();
        this.populateResults(response);
        this.assignItemsToTableList();
        console.log(this.elements);
      }
    });
  }

  flushMainList() {
    this.elements.splice(0, this.elements.length);
  }

  populateResults(results) {
    let i = 1;
    results.forEach(result => {
      this.elements.push({ id: 1, item: result.object});
      i++;
    });
  }
  assignItemsToTableList() {
    this.bagList = this.elements;
  }
  onClickReset() {
    this.selectedMaterial = "";
    this.selectedBrand = "";
    this.selectedSize = "";
    this.selectedColour = "";
  }

}



