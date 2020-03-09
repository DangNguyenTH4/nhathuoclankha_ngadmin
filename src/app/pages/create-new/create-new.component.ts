import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MedicineDtoAdmin, MedicineDto, MedicineControllerService } from '../../../typescript-angular-client';
import { ToastrService } from '../sharedmodule/toast';

@Component({
  selector: 'ngx-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss'],
  providers: [MedicineControllerService,ToastrService]
})
export class CreateNewComponent implements OnInit {
  rfContact: FormGroup;
  constructor(private medicineBuilder: FormBuilder,
    private medicineControllerService: MedicineControllerService  ,
    private toast:ToastrService) { }

  ngOnInit() {
    this.rfContact = this.medicineBuilder.group({
      code: '',
      medicineName: '',
      unit: '',
      company: this.medicineBuilder.group({
        companyName: '',
      }),
      price: this.medicineBuilder.group({
        boughtPrice: '',
        sellForCompanyPrice: '',
        sellForFarmPrice: '',
        sellForPersonalPrice: ''
      })
    });
  }
  onSubmit() {
    // Do something awesome
    let temp: MedicineDtoAdmin = {};
    console.log(temp);
    let medicine = this.rfContact.value;
    console.log(medicine);
    console.log(this.rfContact);
    // this.rfContact.reset();
    console.log(medicine);
    console.log("Create ...");
    this.medicineControllerService.createNewOneUsingPOST(medicine).subscribe(
      result => {
        console.log(result);
        this.toast.notify(1,"Thành công","Thêm thành công");

      },
      error=>{
        console.log(error);
        console.log("Error: "+error);
        if(error.status!==200){
          this.toast.notify(4,"Không thành công",error.error.message);
        }
        else{
          this.toast.notify(1,"Thành công","Thêm thành công");
        }
      });
  }

}
